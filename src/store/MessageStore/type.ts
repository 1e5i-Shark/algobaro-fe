import * as Stomp from '@stomp/stompjs';

import { ChatValueUnion, RoomValueUnion } from '@/types/chat';
import { RoomType } from '@/types/room';

export interface Message {
  memberId: number;
  type: ChatValueUnion | RoomValueUnion;
  value: string | null;
  timestamp: string;
}

export interface MessageStoreValue {
  listeners: Set<Function> | null;
  userId: string;
  client: Stomp.Client | null;
  roomIndices: RoomType[];
  connected: boolean;
  currentRoomId: string;
  messageEntered: string;
  messageLogs: Message[];
  receiveLogs: RoomValueUnion[];
  subscription: Stomp.StompSubscription | null;
  testEndTime: string;
}
export interface MessageStoreState extends MessageStoreValue {
  connect: (roomShortUuid: string) => void;
  subscribeMessageBroker: (roomShortUuid: string) => void;
  disconnect: () => void;
  changeInput: (value: string) => void;
  sendMessage: (type: ChatValueUnion | RoomValueUnion) => void;
  subscribe: (listener: Function) => void;
  unsubscribe: (listener: Function) => void;
  receiveMessage: (messageReceived: { body: string }) => void;
  formatMessage: (message: Message) => Message;
  publish: () => void;
  setMessageValue: (newValue: Partial<MessageStoreValue>) => void;
}
