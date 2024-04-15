import { VolumeOffRounded, VolumeUpRounded } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components';

export default function Audio() {
  const audioStream = useRef<MediaStream | null>(null);
  const audioContext = new AudioContext();

  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const openMediaDevices = async () => {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  };

  const startAudio = async () => {
    try {
      const stream = await openMediaDevices();
      stream.getAudioTracks()[0].enabled = false;
      audioStream.current = stream;

      console.log('Got MediaStream:', stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleIconClick = async () => {
    if (audioStream.current === null) {
      startAudio();
    }

    if (audioStream.current === null) return;

    const track = audioStream.current.getAudioTracks()[0];
    track.enabled = !track.enabled;

    setIsActive(track.enabled);
  };

  useEffect(() => {
    if (audioStream.current === null) return;

    let intervalId: ReturnType<typeof setInterval>;
    const microphone = audioContext.createMediaStreamSource(
      audioStream.current
    );
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    microphone.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    if (isActive) {
      intervalId = setInterval(() => {
        analyser.getByteFrequencyData(data);

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i];
        }
        const average = sum / data.length;

        setIsSpeaking(average > 10);
      }, 30);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    startAudio();
  }, []);

  return (
    <div>
      {isActive ? (
        <>
          <Icon
            onClick={handleIconClick}
            color={isSpeaking ? '#ff0000' : '#fff'}
          >
            <VolumeUpRounded />
          </Icon>
        </>
      ) : (
        <>
          <Icon onClick={handleIconClick}>
            <VolumeOffRounded />
          </Icon>
        </>
      )}
    </div>
  );
}
