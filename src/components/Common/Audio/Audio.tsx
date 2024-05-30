import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useAudioStore from '@/store/AudioStore';
import useRoomStore from '@/store/RoomStore';

interface AudioProps {
  memberId?: string;
  isMyAudio?: boolean;
  audioStream?: MediaStream | null;
  isActive?: boolean;
  onIconClick?: () => void;
}

export default function Audio({
  memberId,
  isMyAudio = false,
  audioStream,
  isActive,
  onIconClick,
}: AudioProps) {
  const { theme } = useCustomTheme();

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContext = new AudioContext();

  const { connected, connect, createOtherConnection } = useAudioStore();
  const {
    roomData: { roomShortUuid },
  } = useRoomStore();

  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopAudio = () => {
    audioStream?.getTracks().forEach(track => track.stop());
  };

  useEffect(() => {
    if (!isMyAudio) {
      console.log('---2. createOtherConnection ---');
      if (connected) {
        createOtherConnection();
      }
    }
  }, [isMyAudio, connected]);

  useEffect(() => {
    if (audioStream == null) return;

    if (audioRef.current != null) {
      if (!isMyAudio) {
        audioRef.current.srcObject = audioStream;
      } else {
        console.log('---1. connect ---');
        if (memberId) {
          connect(memberId, audioStream, roomShortUuid);
        }
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

  if (!audioStream) return null;

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
      />
      {isActive ? (
        <Icon
          onClick={onIconClick}
          color={isSpeaking ? theme.color.green : ''}
        >
          <VolumeUpRounded />
        </Icon>
      ) : (
        <Icon onClick={onIconClick}>
          <VolumeOffRounded />
        </Icon>
      )}
    </>
  );
}
