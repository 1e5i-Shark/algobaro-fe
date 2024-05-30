import { useEffect, useState } from 'react';

import useAudioStore from '@/store/AudioStore';

import Audio from './Audio';

interface MemberAudioProps {
  memberId: number;
}

export default function MemberAudio({ memberId }: MemberAudioProps) {
  const key = memberId.toString();

  const { audioStreamList, memberLeave } = useAudioStore();
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // audioStreamList에서 key에 해당하는 audioStream이 있다면 연결 완료된 것
  useEffect(() => {
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
