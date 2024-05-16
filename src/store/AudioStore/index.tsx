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
        console.log('local key', localStorage.getItem(LOCAL_ACCESSTOKEN));
        const BASE_SOCKET_URL = import.meta.env.VITE_BASE_SOCKET_URL;
        console.log('1. 소켓 연결 camKey', camKey);

        const socket = new SockJS(BASE_SOCKET_URL);
        const stompClient = new Stomp.Client({
          webSocketFactory: () => socket,
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
          },
          reconnectDelay: 3000,
        });

        stompClient.onConnect = () => {
          console.log('2. 음성채팅 connect!');
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
              console.log('SUBSCRIBE: offer', offer);
              const key = JSON.parse(offer.body).key;
              const message = JSON.parse(offer.body).body;

              pcListMap.set(key, createPeerConnection(key));
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
              console.log('SUBSCRIBE: candidate', candidate);
              const key = JSON.parse(candidate.body).key;
              const message = JSON.parse(candidate.body).body;

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
              console.log('SUBSCRIBE: answer', answer);
              const key = JSON.parse(answer.body).key;
              const message = JSON.parse(answer.body).body;

              console.log('MY CAMKEY:', camKey);
              console.log(
                'SUBSCRIBE: answer pcListMap',
                key,
                pcListMap,
                message
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
            callback: message => {
              console.log('SUBSCRIBE: call key', message);

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
              console.log('SUBSCRIBE: send key', message);

              const { key } = JSON.parse(message.body);
              if (key == null) return;

              //만약 중복되는 키가 ohterKeyList에 있는지 확인하고 없다면 추가해준다.
              if (
                camKey !== key &&
                otherKeyList.find(mapKey => mapKey === camKey) == null
              ) {
                console.log('-----다른 유저 camKey 등록-----', key);
                otherKeyList.push(key);
              }
            },
          });
        };

        stompClient.activate();
      },

      createOtherConnection: () => {
        const { client, createPeerConnection, sendOffer } = get();

        if (client === null) return;

        console.log('PUBLISH: call key');

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
              console.log('PUBLISH: icecandidate event', event);

              if (client !== null) {
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
              console.log('track', track);
              pc.addTrack(track, audioStream);
            });
          }

          console.log('PeerConnection created otherKey', otherKey, pc);
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
          console.log('PUBLISH: sendOffer event', offer, pc);

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
          console.log('PUBLISH: sendAnswer event', answer, pc);

          pc.setLocalDescription(answer);

          sendMessageService({
            client,
            destination: `/peer/answer/${otherKey}/${roomShortUuid}`,
            body: {
              key: otherKey,
              body: answer,
            },
          });
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
