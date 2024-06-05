import { useEffect, useState } from 'react';

import useRTCStore from '@/store/RTCStore';

import Audio from './Audio';

interface MemberAudioProps {
  memberId: number;
}

export default function MemberAudio({ memberId }: MemberAudioProps) {
  const key = memberId.toString();

  const { audioStreamList, memberLeave } = useRTCStore();
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // audioStreamList에서 key에 해당하는 audioStream이 있다면 연결 완료된 것
  useEffect(() => {
    console.log('audioStreamList', audioStreamList);
    const currentAudioStream =
      audioStreamList.find(stream => stream.key === key)?.stream ?? null;
    setAudioStream(currentAudioStream);
  }, [audioStreamList]);

  useEffect(() => {
    return () => {
      console.log(key, '번 유저 나감');
      memberLeave(key);
    };
  }, []);

  return (
    <Audio
      audioStream={audioStream}
      isActive
    />
  );
}
