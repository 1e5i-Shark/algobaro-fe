import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { SOCKET_TYPE } from '@/constants/socket';
import { API_ENDPOINT } from '@/services/apiEndpoint';
import { sendMessageService } from '@/services/Message/sendMessageService';
import { ChatValueUnion, RoomValueUnion } from '@/types/chat';
import { ukToKoreaTime } from '@/utils/convertDate';

import { MessageStoreState, MessageStoreValue } from './type';

const initialValue: MessageStoreValue = {
  listeners: new Set<Function>(),
  userId: '',
  client: new Stomp.Client(),
  connected: false,
  currentRoomId: '',
  messageEntered: '',
  messageLogs: [],
  receiveLogs: [],
  subscription: null,
  testEndTime: '',
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
            // console.log('stompClient debug string : ', debugMessage);
          },
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
          },
        });

        // console.log('socket connect');

        stompClient.onConnect = () => {
          const { subscribeMessageBroker, publish, connected } = get();

          if (connected) return;

          // console.log('socket onConnect');

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

        // console.log('socket MessageBroker');

        const subscription = client.subscribe(
          `${API_ENDPOINT.SOCKET.SUBSCRIPTION}/chat/room/${roomShortUuid}`,
          messageReceived => {
            // console.log('messageReceived', messageReceived);
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
        if (!client || !subscription) return;

        sendMessage(SOCKET_TYPE.ROOM.UNREADY);
        sendMessage(SOCKET_TYPE.CHAT.QUIT);

        subscription.unsubscribe();
        client.deactivate();
        // 연결이 해제 되면 listeners, client를 null로 설정하여 null 값을 통한 예외처리를 할 수 있게 한다.
        get().reset();

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

        if (!client) return;

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
        console.log('messageReceived');
        const { formatMessage, publish } = get();
        const message = JSON.parse(messageReceived.body);
        const formatData = formatMessage(message);
        const type = formatData.type;

        console.log(formatData);

        // 방에 들어오고 나간 경우 listeners를 업데이트
        // 내부 Type이 function이어서 임시로 빈 함수를 할당

        // 방에 들어온 경우 size를 늘리기 위해 배열 업데이트
        if (type === SOCKET_TYPE.CHAT.ENTER) {
          set(state => ({
            listeners: new Set(
              state.listeners ? [...state.listeners, () => {}] : [() => {}]
            ),
          }));
        }

        // 방에서 나간 경우 size 1 감소
        if (type === SOCKET_TYPE.CHAT.QUIT) {
          set(state => ({
            listeners: new Set(
              state.listeners ? [...state.listeners].slice(0, 1) : []
            ),
          }));
        }

        if (type === SOCKET_TYPE.ROOM.START_CODING && formatData.value) {
          set({
            testEndTime: formatData.value,
          });
        }

        const receiveLogsType = [
          SOCKET_TYPE.ROOM.CHANGE_HOST,
          SOCKET_TYPE.ROOM.READY,
          SOCKET_TYPE.ROOM.UNREADY,
          SOCKET_TYPE.ROOM.START_CODING,
          SOCKET_TYPE.ROOM.END_CODING,
        ];

        // Todo: quit은 message가 오지 않는지 백엔드 확인
        const messageLogsType = [
          SOCKET_TYPE.CHAT.ENTER,
          SOCKET_TYPE.CHAT.MESSAGE,
          SOCKET_TYPE.CHAT.QUIT,
        ];

        if (messageLogsType.includes(formatData.type as ChatValueUnion)) {
          set(state => ({
            messageLogs: [...state.messageLogs, formatData],
          }));
        }

        if (receiveLogsType.includes(formatData.type as RoomValueUnion)) {
          set(state => ({
            receiveLogs: [
              ...state.receiveLogs,
              formatData.type as RoomValueUnion,
            ],
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
              value: value && `${value}님이 입장하였습니다`,
              timestamp: formattedTime,
            };
          case SOCKET_TYPE.CHAT.QUIT:
            return {
              memberId,
              type,
              value: value && `${value}님이 퇴장하였습니다.`,
              timestamp: formattedTime,
            };
          case SOCKET_TYPE.CHAT.MESSAGE:
            return {
              memberId,
              type,
              value: value && `${value}`,
              timestamp: formattedTime,
            };
          case SOCKET_TYPE.ROOM.START_CODING:
            return {
              memberId,
              type,
              value: value && `${ukToKoreaTime(value)}`,
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
          listeners: new Set(
            state.listeners ? [...state.listeners, listener] : [listener]
          ),
        }));
      },
      unsubscribe: listener => {
        set(state => ({
          listeners: new Set(
            state.listeners
              ? [...state.listeners].filter(li => li !== listener)
              : []
          ),
        }));
      },
      publish() {
        const { listeners } = get();

        if (!listeners) return;

        listeners.forEach(listener => listener());
      },
      setMessageValue: (newValue: Partial<MessageStoreValue>) =>
        set(state => ({
          ...state,
          ...newValue,
        })),
      reset: () => {
        set({ ...initialValue });
      },
    }),
    { store: 'MessageStore' }
  )
);
export default useMessageStore;
