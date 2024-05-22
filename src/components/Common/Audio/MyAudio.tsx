import { useEffect, useState } from 'react';

import useAudioStore from '@/store/AudioStore';
import useRoomStore from '@/store/RoomStore';

import Tooltip from '../Tooltip/Tooltip';
import Audio from './Audio';

interface MyAudioProps {
  memberId: number;
}

export default function MyAudio({ memberId }: MyAudioProps) {
  const key = memberId.toString();

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const { connect, disconnect, connected, otherKeyList, sendOffer } =
    useAudioStore();

  const {
    roomData: { roomShortUuid },
  } = useRoomStore();

  const openMediaDevices = async () => {
    console.log('socket flow: 1. getUserMedia 나는', memberId, '번 유저');
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  };

  // 마이크 권한 설정 및 socket 연결
  const startAudio = async () => {
    try {
      const stream = await openMediaDevices();
      // 진입 시 음소거 설정
      stream.getAudioTracks()[0].enabled = false;
      setAudioStream(stream);

      connect(key, stream, roomShortUuid);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  // 마이크 버튼 클릭 시 음소거 설정 및 해제
  const handleIconClick = () => {
    if (audioStream === null) {
      startAudio();
    }

    if (audioStream === null) return;

    const track = audioStream.getAudioTracks()[0];
    track.enabled = !track.enabled;

    setIsActive(track.enabled);
  };

  useEffect(() => {
    startAudio();

    return () => {
      disconnect();
    };
  }, []);

  // 다른 유저가 접속했을 때 offer 보내기
  useEffect(() => {
    if (connected && otherKeyList.length > 0) {
      sendOffer(key);
    }
  }, [connected, otherKeyList]);

  return (
    <Tooltip
      text={audioStream?.getTracks()[0].label ?? '선택된 마이크가 없습니다'}
    >
      <div>
        <Audio
          isMyAudio
          audioStream={audioStream}
          isActive={isActive}
          onIconClick={handleIconClick}
        />
      </div>
    </Tooltip>
  );
}
