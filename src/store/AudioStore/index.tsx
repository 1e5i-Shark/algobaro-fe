import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';

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
        console.log('3. 소켓 연결', camKey, audioStream);

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
            subscribeAudioBroker,
            connected,
            sendMessage,
            createPeerConnection,
            pcListMap,
            sendOffer,
            sendAnswer,
            otherKeyList,
          } = get();

          if (connected) return;

          set({ client: stompClient, camKey, audioStream, roomShortUuid });
          // subscribe 이벤트 등록
          subscribeAudioBroker(roomShortUuid);

          // call key 호출
          sendMessage('camKey');

          // peerConnection 생성 후 sendOffer
          const pc = createPeerConnection(camKey);

          pcListMap.set(camKey, pc);
          sendOffer(pc, camKey);

          // offer subscribe
          stompClient.subscribe(
            `/peer/offer/${camKey}/${roomShortUuid}`,
            offer => {
              console.log(offer, 'offer');
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
            {
              Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
            }
          );

          // iceCandidate subscribe
          stompClient.subscribe(
            `/peer/iceCandidate/${camKey}/${roomShortUuid}`,
            candidate => {
              console.log(candidate, 'candidate');
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
            {
              Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
            }
          );

          // answer subscribe
          stompClient.subscribe(
            `/peer/answer/${camKey}/${roomShortUuid}`,
            answer => {
              console.log(answer, 'answer');
              const key = JSON.parse(answer.body).key;
              const message = JSON.parse(answer.body).body;

              pcListMap
                .get(key)
                ?.setRemoteDescription(new RTCSessionDescription(message));
            },
            {
              Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
            }
          );

          // call key subscribe
          stompClient.subscribe(
            '/call/key',
            message => {
              console.log('call key', message);
              stompClient.publish({
                destination: '/send/key',
                body: JSON.stringify({
                  key: camKey,
                  body: {},
                }),
              });
            },
            {
              Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
            }
          );

          // send key subscribe
          stompClient.subscribe(
            '/send/key',
            message => {
              console.log(message, 'send key');
              const key = JSON.parse(message.body);

              //만약 중복되는 키가 ohterKeyList에 있는지 확인하고 없다면 추가해준다.
              if (
                camKey !== key &&
                otherKeyList.find(mapKey => mapKey === camKey) === null
              ) {
                otherKeyList.push(key);
              }
            },
            {
              Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
            }
          );

          set({ connected: true });
        };

        stompClient.activate();
      },
      createPeerConnection: otherKey => {
        const { client, audioStream, roomShortUuid } = get();
        const pc = new RTCPeerConnection();

        try {
          // onIceCandidate
          pc.addEventListener('icecandidate', event => {
            if (event.candidate) {
              console.log('icecandidate event', event);

              client?.publish({
                destination: `/peer/iceCandidate/${otherKey}/${roomShortUuid}`,
                body: JSON.stringify({
                  key: otherKey,
                  body: event.candidate,
                }),
              });
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
      subscribeAudioBroker: roomShortUuid => {
        const { client } = get();
        if (!client) return;

        console.log('audio broker', roomShortUuid);
      },
      sendOffer: (pc, otherKey) => {
        const { client, roomShortUuid } = get();

        if (!client) return;

        pc?.createOffer().then(offer => {
          pc.setLocalDescription(offer);
          client.publish({
            destination: `/peer/offer/${otherKey}/${roomShortUuid}`,
            body: JSON.stringify({
              key: otherKey,
              body: offer,
            }),
          });
          console.log('sendOffer!', offer, pc);
        });
      },
      sendAnswer: (pc, otherKey) => {
        const { client, roomShortUuid } = get();

        if (!client) return;

        pc?.createAnswer().then(answer => {
          pc.setLocalDescription(answer);
          client.publish({
            destination: `/peer/answer/${otherKey}/${roomShortUuid}`,
            body: JSON.stringify({
              key: otherKey,
              body: answer,
            }),
          });
          console.log('sendAnswer!', answer, pc);
        });
      },
      sendMessage: type => {
        const { client, otherKeyList, createPeerConnection } = get();

        if (!client) return;

        console.log('sendMessage type', type);

        client.publish({
          destination: `/call/key`,
          body: JSON.stringify({
            key: {},
            body: {},
          }),
        });

        setTimeout(() => {
          const { pcListMap } = get();
          console.log('sendmessage', pcListMap);
          otherKeyList.map(key => {
            if (!pcListMap.has(key)) {
              createPeerConnection(key);
            }
          });
        }, 1000);
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
