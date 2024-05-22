import { useEffect, useState } from 'react';

import useAudioStore from '@/store/AudioStore';

import Audio from './Audio';

interface MemberAudioProps {
  memberId: number;
}

export default function MemberAudio({ memberId }: MemberAudioProps) {
  const key = memberId.toString();

  const { audioStreamList } = useAudioStore();
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // audioStreamList에서 key에 해당하는 audioStream이 있다면 연결 완료된 것
  useEffect(() => {
    const currentAudioStream = audioStreamList.get(key) ?? null;
    setAudioStream(currentAudioStream);
  }, [audioStreamList]);

  return (
    <Audio
      audioStream={audioStream}
      isActive={audioStream != null}
    />
  );
}
