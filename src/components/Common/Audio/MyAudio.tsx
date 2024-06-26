import { useEffect, useState } from 'react';

import { Tooltip } from '@/components';
import { useAudioSocket } from '@/hooks/Audio/useAudioSocket';
import useRoomStore from '@/store/RoomStore';
import { toastify } from '@/utils/toastify';

import Audio from './Audio';
import AudioMenu from './AudioMenu';
import { MyAudioWrapper } from './MyAudio.style';

interface MyAudioProps {
  memberId: number;
}

export default function MyAudio({ memberId }: MyAudioProps) {
  const key = memberId.toString();

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[] | null>(
    null
  );
  const [isActive, setIsActive] = useState(false);

  const {
    roomData: { roomShortUuid },
  } = useRoomStore();

  const { client, connectSocket, disconnectSocket, replaceTrack } =
    useAudioSocket({
      myKey: key,
      roomShortUuid,
    });

  const getAvailableDevices = async () => {
    return await navigator.mediaDevices.enumerateDevices();
  };

  const openMediaDevices = async (deviceId?: string) => {
    console.log('socket flow: 1. getUserMedia 나는', memberId, '번 유저');
    return await navigator.mediaDevices.getUserMedia({
      audio: deviceId
        ? {
            deviceId: {
              exact: deviceId,
            },
          }
        : true,
    });
  };

  // 마이크 권한 설정 및 socket 연결
  const startAudio = async () => {
    try {
      const stream = await openMediaDevices();
      // 진입 시 음소거 설정
      stream.getAudioTracks()[0].enabled = false;
      setAudioStream(stream);

      const devices = await getAvailableDevices();
      const audioList = devices.filter(
        device =>
          device.kind === 'audioinput' && device.deviceId !== 'communications'
      );

      setAudioDevices(audioList);

      // socket 연결
      console.log('---1. connect ---', stream);
      connectSocket(stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
      toastify.error('마이크 권한을 허용해 주세요');
    }
  };

  const endAudio = () => {
    disconnectSocket();
    setAudioStream(null);
  };

  // 마이크 권한 확인
  const checkPermission = async () => {
    const permission = await navigator.permissions.query({
      name: 'microphone' as PermissionName,
    });

    // 진입 시 무조건 startAudio 호출
    // 마이크 권한이 없는 경우 getUserMedia을 호출해야 권한 설정 아이콘이 활성화됨
    startAudio();

    // 웹 상에서 권한 변경시 이벤트 발생
    permission.onchange = () => {
      switch (permission.state) {
        case 'granted': {
          if (audioStream === null) {
            startAudio();
          }
          break;
        }
        case 'denied': {
          endAudio();
          toastify.error('마이크 권한을 허용해 주세요');
        }
      }
    };
  };

  // 마이크 버튼 클릭 시 음소거 설정 및 해제
  const handleIconClick = () => {
    if (audioStream === null) {
      checkPermission();
    }

    if (audioStream === null) return;

    // 음소거 해제 여부를 audioStream에 적용
    audioStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;

      setIsActive(track.enabled);
    });

    // webRTC track에 변경된 audioStream 적용
    replaceTrack(audioStream);
    setAudioStream(audioStream);
  };

  useEffect(() => {
    checkPermission();

    return () => {
      if (client !== null) return;
      console.log('unmount client', client);
      endAudio();
    };
  }, []);

  const handleChangeDevice = async (deviceId: string) => {
    try {
      const stream = await openMediaDevices(deviceId);
      replaceTrack(stream);
    } catch (error) {
      console.error('media 변경에 실패했습니다.', error);
    }
  };

  return (
    <MyAudioWrapper>
      <Tooltip
        text={
          audioStream?.getTracks()[0].label ? '' : '선택된 마이크가 없습니다'
        }
      >
        <div>
          <Audio
            memberId={key}
            isMyAudio
            audioStream={audioStream}
            isActive={isActive}
            onIconClick={handleIconClick}
            connectSocket={connectSocket}
          />
        </div>
      </Tooltip>
      {audioDevices && audioStream && (
        <AudioMenu
          audioStream={audioStream}
          audioDevices={audioDevices}
          onChange={handleChangeDevice}
        />
      )}
    </MyAudioWrapper>
  );
}
