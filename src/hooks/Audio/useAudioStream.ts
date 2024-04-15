import { useEffect, useState } from 'react';

export const useAudioStream = () => {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioContext, setAudioContext] = useState(new AudioContext());
  const [dataArray, setDataArray] = useState<Uint8Array>();

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;

  useEffect(() => {
    if (audioStream === null) return;

    const microphone = audioContext.createMediaStreamSource(audioStream);
    microphone.connect(analyser);

    setDataArray(new Uint8Array(bufferLength));
  }, [audioStream]);

  return { audioStream, setAudioStream, analyser, bufferLength, dataArray };
};
