import { useEffect } from 'react';

import useRTCStore from '@/store/RTCStore';

import MemberAudio from './MemberAudio';
import MyAudio from './MyAudio';

interface AudioContainerProps {
  isMyAudio: boolean;
  memberId: number;
}

export default function AudioContainer({
  isMyAudio,
  memberId,
}: AudioContainerProps) {
  const { addOtherKeyList } = useRTCStore();

  useEffect(() => {
    console.log('memberId', memberId);
    if (isMyAudio) return;
    const key = memberId.toString();
    addOtherKeyList(key);
  }, [memberId]);

  return (
    <div>
      {isMyAudio ? (
        <MyAudio memberId={memberId} />
      ) : (
        <MemberAudio memberId={memberId} />
      )}
    </div>
  );
}
