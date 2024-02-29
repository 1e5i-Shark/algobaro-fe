import { useMemo } from 'react';

import { MemberCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

const MAX_MEMBERS = 6;

export default function Members() {
  const { roomData } = useRoomStore();
  const { members } = roomData;

  const renderCards = useMemo(() => {
    const renderedMembers = members.map(member => (
      <MemberCard
        key={member.id}
        nickname={member.nickname}
        role={member.role}
        profileImage={member.profileImage}
      />
    ));

    const emptyCount = MAX_MEMBERS - members.length;

    for (let i = 0; i < emptyCount; i++) {
      renderedMembers.push(<MemberCard isEmpty={true} />);
    }

    return renderedMembers;
  }, [members]);

  return <S.MembersContainer>{renderCards}</S.MembersContainer>;
}
