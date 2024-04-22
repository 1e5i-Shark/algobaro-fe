import {
  KeyboardArrowDownRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

import { Icon, Menu, Tooltip } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import { MenuListProps } from '../Menu/MenuText';

export default function Audio() {
  const { theme } = useCustomTheme();

  const audioStream = useRef<MediaStream | null>(null);
  const audioContext = new AudioContext();

  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [selectedMicrophone, setSelectedMicrophone] =
    useState<MediaDeviceInfo>();
  const [microphoneMenuList, setMicrophoneMenuList] =
    useState<MenuListProps[]>();

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

  // 마이크 선택 기능
  // const handleSelectMicrophone = async (selectedDevice: MediaDeviceInfo) => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: { deviceId: { exact: selectedDevice.deviceId } },
  //   });

  //   setSelectedMicrophone(selectedDevice);
  // };

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const microphones = devices.filter(device => device.kind === 'audioinput');

    const filteredMicrophones = microphones.find(
      microphone => microphone.deviceId === 'default'
    );

    setSelectedMicrophone(filteredMicrophones);
  };

  useEffect(() => {
    startAudio();
    getDevices();

    return () => {
      if (audioStream.current != null) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      {selectedMicrophone && (
        // Todo : 나한테만 툴팁 보여주기
        <Tooltip text={selectedMicrophone.label}>
          <div>
            {isActive ? (
              <Icon
                onClick={handleIconClick}
                color={isSpeaking ? '#08c324' : theme.color.white_primary}
              >
                <VolumeUpRounded />
              </Icon>
            ) : (
              <Icon onClick={handleIconClick}>
                <VolumeOffRounded />
              </Icon>
            )}
          </div>
        </Tooltip>
      )}
      {microphoneMenuList && (
        <Menu
          menuList={microphoneMenuList}
          className="menu_audio"
        >
          <Icon>
            <KeyboardArrowDownRounded />
          </Icon>
        </Menu>
      )}
    </>
  );
}
