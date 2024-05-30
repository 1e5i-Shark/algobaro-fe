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
  audioStream: null,
  audioStreamList: [],
  pcListMap: [],
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
          const { connected, createPeerConnection, otherKeyList } = get();

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
            callback: async offer => {
              const { pcListMap } = get();
              const key = JSON.parse(offer.body).key;
              const message = JSON.parse(offer.body).body;

              if (key === camKey) return;

              let currentPc = pcListMap.find(item => item.key === key)?.pc;
              if (!currentPc) {
                currentPc = createPeerConnection(key);
              }

              console.log(
                'socket flow: 5. setRemoteDescription from',
                key,
                '번 유저',
                pcListMap,
                currentPc,
                message
              );

              currentPc.setRemoteDescription(message);

              // sendAnswer 코드

              const answer = await currentPc.createAnswer();
              currentPc.setLocalDescription(answer);

              console.log(
                'socket flow: 6. createAnswer 후 setLocalDescription',
                key,
                '번 유저',
                currentPc
              );

              sendMessageService({
                client: stompClient,
                destination: `/peer/answer/${key}/${roomShortUuid}`,
                body: {
                  key: camKey,
                  body: answer,
                },
              });

              const filteredPcList = pcListMap.filter(item => item.key !== key);

              set({
                pcListMap: [...filteredPcList, { key, pc: currentPc }],
              });
            },
          });

          // iceCandidate subscribe

          subscribeMessage({
            client: stompClient,
            destination: `/peer/iceCandidate/${camKey}/${roomShortUuid}`,
            callback: candidate => {
              console.log(
                JSON.parse(candidate.body),
                'subscribe icecandidate에서 candiate'
              );
              const { pcListMap } = get();
              const key = JSON.parse(candidate.body).key;
              const message = JSON.parse(candidate.body).body;

              if (key === camKey) return;

              const currentPc = pcListMap.find(item => item.key === camKey)?.pc;

              console.log(
                'socket flow: receive candidate from',
                key,
                '번 유저',
                pcListMap,
                currentPc
              );
              currentPc?.addIceCandidate(message);
            },
          });

          // answer subscribe

          subscribeMessage({
            client: stompClient,
            destination: `/peer/answer/${camKey}/${roomShortUuid}`,
            callback: answer => {
              const { pcListMap } = get();
              const key = JSON.parse(answer.body).key;
              const message = JSON.parse(answer.body).body;

              if (key === camKey) return;

              const currentPc = pcListMap.find(item => item.key === camKey)?.pc;

              currentPc?.setRemoteDescription(message);

              console.log(
                'socket flow: 8. getAnswer setRemoteDescription from',
                key,
                '번 유저',
                pcListMap,
                currentPc
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
        const { client, camKey } = get();

        if (client === null) return;

        console.log('PUBLISH: call key', camKey, '번 유저');

        sendMessageService({
          client,
          destination: '/call/key',
          body: {},
        });
      },

      createPeerConnection: otherKey => {
        const { client, audioStream, roomShortUuid, camKey } = get();

        const configuration = {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
              ],
            },
          ],
          // iceCandidatePoolSize: 10,
        };

        const pc = new RTCPeerConnection(configuration);
        console.log('createPeerConnection', otherKey, pc);

        try {
          // onIceCandidate
          pc.addEventListener('iceconnectionstatechange', event => {
            const currentTarget = event.currentTarget as RTCPeerConnection;
            console.log(
              'iceconnectionstatechange 이벤트! ',
              otherKey + '번 유저 ',
              currentTarget.iceConnectionState
            );
          });

          pc.addEventListener('icecandidate', event => {
            console.log(
              'icecandidate',
              otherKey,
              '번 유저',
              pc,
              event.candidate
            );

            if (event.candidate) {
              if (client !== null) {
                setTimeout(() => {
                  console.log(
                    'socket flow: send candidate',
                    otherKey,
                    '번 유저'
                  );

                  sendMessageService({
                    client,
                    destination: `/peer/iceCandidate/${otherKey}/${roomShortUuid}`,
                    body: {
                      key: camKey,
                      body: event.candidate,
                    },
                  });
                }, 3000);
              }
            }
          });

          // onTrack
          pc.addEventListener('track', event => {
            const { audioStreamList } = get();

            const filteredStreamList = audioStreamList.filter(
              stream => stream.key !== otherKey
            );

            console.log(
              'socket flow: onTrack',
              otherKey,
              '번 유저',
              event.streams[0]
            );

            set({
              audioStreamList: [
                ...filteredStreamList,
                { key: otherKey, stream: event.streams[0] },
              ],
            });
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

          // 순서 맞추는게 필요하다면 여기에 otherKeyList 추가하는게 필요
        } catch (error) {
          console.error('PeerConnection failed: ', error);
        } finally {
          return pc;
        }
      },

      sendOffer: key => {
        const {
          client,
          roomShortUuid,
          pcListMap,
          otherKeyList,
          createPeerConnection,
        } = get();

        if (!client) return;

        // 내 offer 상대한테 보내기
        console.log(`---3. ${key}번 offer 상대방에게 보내기---`);
        otherKeyList.forEach(async otherKey => {
          let pc = pcListMap.find(item => item.key === key)?.pc;
          if (!pc) {
            pc = createPeerConnection(key);
          }

          const offer = await pc.createOffer();
          // pc.setLocalDescription(new RTCSessionDescription(offer));
          pc.setLocalDescription(offer);

          const filteredPcList = pcListMap.filter(item => item.key !== key);
          set({ pcListMap: [...filteredPcList, { key, pc }] });

          console.log(
            'socket flow: 3. createOffer 후 setLocalDescription:',
            key,
            '번 유저',
            pc,
            offer
          );

          console.log('socket flow: 4. sendOffer to', otherKey, '번 유저');

          sendMessageService({
            client,
            destination: `/peer/offer/${otherKey}/${roomShortUuid}`,
            body: {
              key: key,
              body: offer,
            },
          });
        });
      },
      memberLeave: (camKey: string) => {
        const { client, pcListMap, audioStreamList, otherKeyList } = get();

        if (!client) return;

        set({
          otherKeyList: otherKeyList.filter(key => key !== camKey),
          audioStreamList: audioStreamList.filter(
            stream => stream.key !== camKey
          ),
          pcListMap: pcListMap.filter(item => item.key !== camKey),
        });
      },

      disconnect: () => {
        const { client, reset, audioStream } = get();

        if (!client) return;

        audioStream?.getTracks().forEach(track => {
          track.stop();
        });

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
