import * as Stomp from '@stomp/stompjs';

import { ChatValueUnion } from '@/types/chat';

export interface Message {
  id: number;
  userId: string;
  type: string;
  value: string;
  timestamp: string;
}

export interface MessageStoreValue {
  listeners: Set<Function>;
  userId: string;
  client: Stomp.Client;
  roomIndices: number[];
  connected: boolean;
  currentRoomId: number;
  messageEntered: string;
  messageLogs: Pick<Message, 'id' | 'value' | 'userId'>[];
  subscription: Stomp.StompSubscription | null;
}
export interface MessageStoreState extends MessageStoreValue {
  connect: (roomId: number) => void;
  subscribeMessageBroker: (roomId: number) => void;
  disconnect: () => void;
  changeInput: (value: string) => void;
  sendMessage: (type: ChatValueUnion) => void;
  subscribe: (listener: Function) => void;
  unSubscribe: (listener: Function) => void;
  receiveMessage: (messageReceived: { body: string }) => void;
  formatMessage: (message: Message) => Pick<Message, 'id' | 'value' | 'userId'>;
  publish: () => void;
  setUserID: (userId: string) => void;
}
