import { useMemo } from 'react';

import { MemberCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

interface MemberListProps {
  className: string;
}

const MAX_MEMBERS = 6;

export default function MemberList({ className }: MemberListProps) {
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
      renderedMembers.push(
        <MemberCard
          key={Date.now() + i}
          isEmpty={true}
        />
      );
    }

    return renderedMembers;
  }, [members]);

  return (
    <S.MembersContainer className={className}>{renderCards}</S.MembersContainer>
  );
}
