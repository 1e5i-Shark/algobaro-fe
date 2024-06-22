import { useEffect, useState } from 'react';

import { useAudioSocket } from '@/hooks/Audio/useAudioSocket';
import useRoomStore from '@/store/RoomStore';

import Tooltip from '../Tooltip/Tooltip';
import Audio from './Audio';

interface MyAudioProps {
  memberId: number;
}

export default function MyAudio({ memberId }: MyAudioProps) {
  const key = memberId.toString();

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(true);

  const {
    roomData: { roomShortUuid },
  } = useRoomStore();

  const { client, connectSocket, disconnectSocket } = useAudioSocket({
    myKey: key,
    roomShortUuid,
  });

  // 마이크 권한 설정
  const openMediaDevices = async () => {
    console.log('socket flow: 1. getUserMedia 나는', memberId, '번 유저');
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  };

  // 마이크 권한 설정 및 socket 연결
  const startAudio = async () => {
    try {
      const stream = await openMediaDevices();
      // 진입 시 음소거 설정
      stream.getAudioTracks()[0].enabled = true;
      setAudioStream(stream);
      // socket 연결
      console.log('---1. connect ---', stream);
      connectSocket(stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
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
      }
    };
  };

  // 마이크 버튼 클릭 시 음소거 설정 및 해제
  const handleIconClick = () => {
    if (audioStream === null) {
      checkPermission();
    }

    if (audioStream === null) return;

    const track = audioStream.getAudioTracks()[0];
    track.enabled = !track.enabled;

    setIsActive(track.enabled);
  };

  useEffect(() => {
    checkPermission();

    return () => {
      if (client !== null) return;
      console.log('unmount client', client);
      disconnectSocket();
    };
  }, []);

  return (
    <Tooltip
      text={audioStream?.getTracks()[0].label ?? '선택된 마이크가 없습니다'}
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
  );
}
