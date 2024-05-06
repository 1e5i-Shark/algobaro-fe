import * as Stomp from '@stomp/stompjs';

export interface Message {
  memberId: number;
  type: string;
  value: string | null;
  timestamp: string;
}

export interface AudioStoreValue {
  client: Stomp.Client | null;
  listeners: Set<Function> | null;
  audioStream: MediaStream | null;
  pcListMap: Map<string, RTCPeerConnection>;
  otherKeyList: string[];
  camKey: string;
  connected: boolean;
  roomShortUuid: string;
}
export interface AudioStoreState extends AudioStoreValue {
  connect: (
    camKey: string,
    audioStream: MediaStream,
    roomShortUuid: string
  ) => void;
  subscribeAudioBroker: (roomShortUuid: string) => void;
  createPeerConnection: (otherKey: string) => void;
  sendOffer: (pc: RTCPeerConnection | undefined, otherKey: string) => void;
  sendMessage: (type: string) => void;
  subscribe: (listener: Function) => void;
}
