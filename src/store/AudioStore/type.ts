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
  createOtherConnection: () => void;
  createPeerConnection: (otherKey: string) => RTCPeerConnection;
  sendOffer: (pc: RTCPeerConnection | undefined, otherKey: string) => void;
  sendAnswer: (pc: RTCPeerConnection | undefined, otherKey: string) => void;
  disconnect: () => void;
  reset: () => void;
}
