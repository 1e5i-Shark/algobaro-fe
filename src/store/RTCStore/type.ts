interface AudioStream {
  key: string;
  stream: MediaStream;
}

export interface RTCStoreValue {
  audioStreamList: AudioStream[];
  otherKeyList: string[];
}

export interface RTCStoreState extends RTCStoreValue {
  addAudioStream: (audioStream: AudioStream) => void;
  addOtherKeyList: (otherKey: string) => void;
  memberLeave: (camKey: string) => void;
  reset: () => void;
}
