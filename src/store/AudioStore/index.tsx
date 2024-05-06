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
          } = get();

          if (connected) return;

          set({ client: stompClient, camKey, audioStream, roomShortUuid });
          // subscribe 이벤트 등록
          subscribeAudioBroker(roomShortUuid);

          // call key 호출
          sendMessage('camKey');

          // peerConnection 생성 후 sendOffer
          createPeerConnection(camKey);
          set({ connected: true });
        };

        stompClient.activate();
      },
      createPeerConnection: (otherKey: string) => {
        const { client, audioStream, pcListMap, roomShortUuid, sendOffer } =
          get();
        const pc = new RTCPeerConnection();

        try {
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
          pc.addEventListener('track', event => {
            console.log('track event', event);
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
        }

        pcListMap.set(otherKey, pc);
        sendOffer(pc, otherKey);
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

      sendMessage: type => {
        const { client, otherKeyList, createPeerConnection } = get();

        if (!client) return;

        console.log('sendMessage type', type);

        setTimeout(() => {
          const { pcListMap } = get();
          otherKeyList.map(key => {
            if (!pcListMap.has(key)) {
              createPeerConnection(key);
            }
          });
        }, 1000);
      },

      subscribe: listener => {
        set(state => ({
          listeners: new Set(
            state.listeners ? [...state.listeners, listener] : [listener]
          ),
        }));
      },
    }),
    { store: 'AudioStore' }
  )
);
export default useAudioStore;
