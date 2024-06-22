import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import { MicOffRounded, MicRounded } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

interface AudioProps {
  memberId?: string;
  isMyAudio?: boolean;
  audioStream?: MediaStream | null;
  isActive?: boolean;
  onIconClick?: () => void;
  connectSocket?: (stream: MediaStream) => void;
  createOtherPeerConnection?: () => void;
}

export default function Audio({
  isMyAudio = false,
  audioStream,
  isActive,
  onIconClick,
}: AudioProps) {
  const { theme } = useCustomTheme();

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContext = new AudioContext();

  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopAudio = () => {
    // audioStream?.getTracks().forEach(track => track.stop());
  };

  useEffect(() => {
    if (audioStream == null) return;

    if (audioRef.current != null) {
      if (!isMyAudio) {
        audioRef.current.srcObject = audioStream;
      }
    }

    // 현재 볼륨 정보를 계산하여 말하고 있는지 판단
    const microphone = audioContext.createMediaStreamSource(audioStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    microphone.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    const intervalId = setInterval(() => {
      analyser.getByteFrequencyData(data);

      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }
      const average = sum / data.length;

      setIsSpeaking(average > 5);
    }, 50);

    return () => {
      clearInterval(intervalId);
      stopAudio();
    };
  }, [audioStream]);

  // 상대 오디오가 연결되지 않은 경우 null 반환
  if (!isMyAudio && !audioStream) return null;

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
      />
      {isActive ? (
        <Icon
          onClick={onIconClick}
          color={
            isSpeaking
              ? theme.color.green
              : audioStream
                ? theme.color.gray_30
                : theme.color.red
          }
        >
          {isMyAudio ? <MicRounded /> : <VolumeUpRounded />}
        </Icon>
      ) : (
        <Icon onClick={onIconClick}>
          {isMyAudio ? <MicOffRounded /> : <VolumeOffRounded />}
        </Icon>
      )}
    </>
  );
}
