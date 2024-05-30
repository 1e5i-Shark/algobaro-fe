import * as Stomp from '@stomp/stompjs';

export interface Message {
  memberId: number;
  type: string;
  value: string | null;
  timestamp: string;
}

interface AudioStream {
  key: string;
  stream: MediaStream;
}

interface pcList {
  key: string;
  pc: RTCPeerConnection;
}

export interface AudioStoreValue {
  client: Stomp.Client | null;
  audioStream: MediaStream | null;
  audioStreamList: AudioStream[];
  pcListMap: pcList[];
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
  sendOffer: (camKey: string) => void;
  memberLeave: (camKey: string) => void;
  disconnect: () => void;
  reset: () => void;
}
