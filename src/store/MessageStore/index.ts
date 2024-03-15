import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { SOCKET_TYPE } from '@/constants/socket';
import { API_ENDPOINT } from '@/services/apiEndpoint';
import { sendMessageService } from '@/services/Message/sendMessageService';
import { ukToKoreaTime } from '@/utils/convertDate';

import { MessageStoreState, MessageStoreValue } from './type';

const initialValue: MessageStoreValue = {
  listeners: new Set<Function>(),
  userId: '',
  client: new Stomp.Client(),
  connected: false,
  roomIndices: [],
  currentRoomId: '',
  messageEntered: '',
  messageLogs: [],
  subscription: null,
};

const useMessageStore = create<MessageStoreState>()(
  devtools(
    (set, get) => ({
      ...initialValue,
      connect: roomShortUuid => {
        const BASE_SOCKET_URL = import.meta.env.VITE_BASE_SOCKET_URL;
        const socket = new SockJS(BASE_SOCKET_URL);
        const stompClient = new Stomp.Client({
          webSocketFactory: () => socket,
          debug: debugMessage => {
            console.log('stompClient debug string : ', debugMessage);
          },
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
          },
        });

        stompClient.onConnect = () => {
          const { subscribeMessageBroker, publish, connected } = get();

          if (connected) return;

          set({ client: stompClient, currentRoomId: roomShortUuid });
          subscribeMessageBroker(roomShortUuid);
          set({ connected: true });
          publish();
        };

        stompClient.activate();
      },
      subscribeMessageBroker: roomShortUuid => {
        const { client, receiveMessage, sendMessage } = get();
        if (!client) return;

        const subscription = client.subscribe(
          `${API_ENDPOINT.SOCKET.SUBSCRIPTION}/chat/room/${roomShortUuid}`,
          messageReceived => {
            receiveMessage(messageReceived);
          },
          {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
          }
        );

        set({ subscription });
        sendMessage(SOCKET_TYPE.CHAT.ENTER);
      },
      disconnect: () => {
        const { client, subscription, sendMessage, publish } = get();

        sendMessage(SOCKET_TYPE.CHAT.QUIT);

        subscription?.unsubscribe();
        client.deactivate();

        set({
          connected: false,
          currentRoomId: '',
          messageEntered: '',
          messageLogs: [],
        });

        publish();
      },
      changeInput: value => {
        set({ messageEntered: value });
        get().publish();
      },
      sendMessage: type => {
        const {
          client,
          currentRoomId,
          messageEntered,
          userId,
          publish,
          setMessageValue,
        } = get();

        let message = '';
        switch (type) {
          case SOCKET_TYPE.CHAT.MESSAGE:
            message = messageEntered || '';
            break;
          case SOCKET_TYPE.ROOM.CHANGE_HOST:
            message = userId;
            break;
          default:
            break;
        }

        sendMessageService({
          client,
          type,
          messageToSend: {
            roomShortUuid: currentRoomId,
            message,
          },
        });

        setMessageValue({ messageEntered: '' });
        publish();
      },
      receiveMessage: messageReceived => {
        const { formatMessage, publish } = get();
        const message = JSON.parse(messageReceived.body);
        const formatData = formatMessage(message);
        // Todo: quit은 message가 오지 않는지 백엔드 확인
        const messageLogsType = [
          SOCKET_TYPE.CHAT.ENTER,
          SOCKET_TYPE.CHAT.MESSAGE,
          SOCKET_TYPE.CHAT.QUIT,
        ];

        if (messageLogsType.includes(formatData.type)) {
          set(state => ({
            messageLogs: [...state.messageLogs, formatData],
          }));
        }
        publish();
      },
      formatMessage: message => {
        const { type, memberId, value, timestamp } = message;
        const formattedTime = ukToKoreaTime(timestamp);

        switch (type) {
          case SOCKET_TYPE.CHAT.ENTER:
            return {
              memberId,
              type,
              value: value || `${memberId}님이 입장하였습니다`,
              timestamp: formattedTime,
            };
          case SOCKET_TYPE.CHAT.QUIT:
            return {
              memberId,
              type,
              value: value || `${memberId}님이 퇴장하였습니다.`,
              timestamp: formattedTime,
            };
          case SOCKET_TYPE.CHAT.MESSAGE:
            return {
              memberId,
              type,
              value: value && `${value}`,
              timestamp: formattedTime,
            };
          default:
            return {
              memberId,
              type,
              value: value && 'Unknown Type Message',
              timestamp: formattedTime,
            };
        }
      },
      subscribe: listener => {
        set(state => ({
          listeners: new Set([...state.listeners, listener]),
        }));
      },
      unsubscribe: listener => {
        set(state => ({
          listeners: new Set(
            [...state.listeners].filter(li => li !== listener)
          ),
        }));
      },
      publish() {
        get().listeners.forEach(listener => listener());
      },
      setMessageValue: (newValue: Partial<MessageStoreValue>) =>
        set(state => ({
          ...state,
          ...newValue,
        })),
    }),
    { store: 'MessageStore' }
  )
);
export default useMessageStore;
