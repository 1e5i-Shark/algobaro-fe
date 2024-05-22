import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { sendMessageService } from '@/services/Audio/sendMessageService';
import { subscribeMessage } from '@/services/Audio/subscribeMessage';

import { AudioStoreState, AudioStoreValue } from './type';

const initialValue: AudioStoreValue = {
  client: new Stomp.Client(),
  listeners: new Set<Function>(),
  audioStream: null,
  pcListMap: new Map(),
  otherKeyList: [],
  camKey: '',
  connected: false,
  roomShortUuid: '',
};

const useAudioStore = create<AudioStoreState>()(
  devtools(
    (set, get) => ({
      ...initialValue,
      connect: (camKey, audioStream, roomShortUuid) => {
        const BASE_SOCKET_URL = import.meta.env.VITE_BASE_SOCKET_URL;

        const socket = new SockJS(BASE_SOCKET_URL);
        const stompClient = new Stomp.Client({
          webSocketFactory: () => socket,
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
          },
          reconnectDelay: 3000,
        });

        stompClient.onConnect = () => {
          console.log('음성채팅 connect!');
          const {
            connected,
            createPeerConnection,
            pcListMap,
            sendAnswer,
            otherKeyList,
          } = get();

          if (connected) return;

          set({
            client: stompClient,
            camKey,
            audioStream,
            roomShortUuid,
            connected: true,
          });

          // offer subscribe

          subscribeMessage({
            client: stompClient,
            destination: `/peer/offer/${camKey}/${roomShortUuid}`,
            callback: offer => {
              const key = JSON.parse(offer.body).key;
              const message = JSON.parse(offer.body).body;

              pcListMap.set(key, createPeerConnection(key));

              console.log(
                'socket flow: 5. setRemoteDescription',
                key,
                '번 유저'
              );

              pcListMap.get(key)?.setRemoteDescription(
                new RTCSessionDescription({
                  type: message.type,
                  sdp: message.sdp,
                })
              );
              sendAnswer(pcListMap.get(key), key);
            },
          });

          // iceCandidate subscribe

          subscribeMessage({
            client: stompClient,
            destination: `/peer/iceCandidate/${camKey}/${roomShortUuid}`,
            callback: candidate => {
              const key = JSON.parse(candidate.body).key;
              const message = JSON.parse(candidate.body).body;

              console.log('socket flow: receive candidate', key, '번 유저');

              pcListMap.get(key)?.addIceCandidate(
                new RTCIceCandidate({
                  candidate: message.candidate,
                  sdpMLineIndex: message.sdpMLineIndex,
                  sdpMid: message.sdpMid,
                })
              );
            },
          });

          // answer subscribe

          subscribeMessage({
            client: stompClient,
            destination: `/peer/answer/${camKey}/${roomShortUuid}`,
            callback: answer => {
              const key = JSON.parse(answer.body).key;
              const message = JSON.parse(answer.body).body;

              console.log(
                'socket flow: 8. getAnswer setRemoteDescription',
                key,
                '번 유저'
              );

              pcListMap.get(key)?.setRemoteDescription(
                new RTCSessionDescription({
                  type: message.type,
                  sdp: message.sdp,
                })
              );
            },
          });

          // call key subscribe
          subscribeMessage({
            client: stompClient,
            destination: '/call/key',
            callback: () => {
              console.log('SUBSCRIBE: call key');

              sendMessageService({
                client: stompClient,
                destination: '/send/key',
                body: {
                  key: camKey,
                  body: {},
                },
              });
            },
          });

          // send key subscribe

          subscribeMessage({
            client: stompClient,
            destination: '/send/key',
            callback: message => {
              console.log('SUBSCRIBE: send key');

              const { key } = JSON.parse(message.body);
              if (key == null) return;

              //만약 중복되는 키가 ohterKeyList에 있는지 확인하고 없다면 추가해준다.
              if (
                camKey !== key &&
                otherKeyList.find(mapKey => mapKey === camKey) == null
              ) {
                set({ otherKeyList: [...otherKeyList, key] });
              }
            },
          });
        };

        stompClient.activate();
      },

      createOtherConnection: () => {
        const { client, createPeerConnection, sendOffer } = get();

        if (client === null) return;

        console.log('PUBLISH: call key', camKey, '번 유저');

        sendMessageService({
          client,
          destination: '/call/key',
          body: {},
        });

        setTimeout(() => {
          const { pcListMap, otherKeyList } = get();
          console.log('Socket 연결된 유저: ', pcListMap);

          otherKeyList.map(key => {
            if (!pcListMap.has(key)) {
              pcListMap.set(key, createPeerConnection(key));
              console.log('otherKeyList', key, pcListMap.get(key));
              sendOffer(pcListMap.get(key), key);
            }
          });
        }, 1000);
      },

      createPeerConnection: otherKey => {
        const { client, audioStream, roomShortUuid } = get();
        const pc = new RTCPeerConnection();

        try {
          // onIceCandidate
          pc.addEventListener('icecandidate', event => {
            if (event.candidate) {
              if (client !== null) {
                console.log('socket flow: send candidate', otherKey, '번 유저');

                sendMessageService({
                  client,
                  destination: `/peer/iceCandidate/${otherKey}/${roomShortUuid}`,
                  body: {
                    key: otherKey,
                    body: event.candidate,
                  },
                });
              }
            }
          });

          // onTrack
          pc.addEventListener('track', event => {
            console.log('track event', event);
            if (document.getElementById(`${otherKey}`) === null) {
              const video = document.createElement('video');

              video.autoplay = true;
              video.controls = true;
              video.id = otherKey;
              video.srcObject = event.streams[0];

              document.getElementById('remoteStreamDiv')?.appendChild(video);
            }
          });

          if (audioStream !== null) {
            audioStream.getTracks().forEach(track => {
              console.log(
                `socket flow: 2. addTrack ${otherKey}번 유저: `,
                track
              );
              pc.addTrack(track, audioStream);
            });
          }
        } catch (error) {
          console.error('PeerConnection failed: ', error);
        } finally {
          return pc;
        }
      },

      sendOffer: (pc, otherKey) => {
        const { client, roomShortUuid } = get();

        if (!client) return;

        pc?.createOffer().then(offer => {
          console.log(
            'socket flow: 3. createOffer 후 setLocalDescription:',
            key,
            '번 유저'
          );

          pc.setLocalDescription(offer);

          sendMessageService({
            client,
            destination: `/peer/offer/${otherKey}/${roomShortUuid}`,
            body: {
              key: otherKey,
              body: offer,
            },
          });
        });
      },

      sendAnswer: (pc, otherKey) => {
        const { client, roomShortUuid } = get();

        if (!client) return;

        pc?.createAnswer().then(answer => {
          console.log(
            'socket flow: 6. createAnswer 후 setLocalDescription',
            otherKey,
            '번 유저'
          );

          pc.setLocalDescription(answer);

          sendMessageService({
            client,
            destination: `/peer/answer/${otherKey}/${roomShortUuid}`,
            body: {
              key: otherKey,
              body: answer,
            },
          });

          console.log('socket flow: 7. sendAnswer', otherKey, '번 유저');
        });
      },
      disconnect: () => {
        const { client, reset } = get();

        if (!client) return;

        client?.deactivate();
        reset();
      },

      reset: () => {
        set({ ...initialValue });
      },
    }),
    { store: 'AudioStore' }
  )
);
export default useAudioStore;
