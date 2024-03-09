import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

import { MemberCard } from '@/components';
import { MENU_TEXT } from '@/components/Common/Menu/MenuText';
import { CardWrapper } from '@/components/MemberCard/MemberCard.style';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { changeHost } from '@/services/Room/Room';
import useRoomStore from '@/store/Room';
import { MemberType, RoleType } from '@/types/room';

interface MemberListProps {
  className: string;
  myRole: RoleType;
}

const MAX_MEMBERS = 6;

export default function MemberList({ className, myRole }: MemberListProps) {
  const { roomData, setRoomData } = useRoomStore();
  const { members } = roomData;

  const [host] = members.filter(member => member.role === ROOM_ROLE.HOST);

  const mutation = useMutation({
    mutationFn: changeHost,
    onSuccess: response => {
      const { id: organizerId } = response;
      // Todo: API 테스트
      const updatedMembers: MemberType[] = members.map(member => {
        if (member.id === organizerId) {
          return { ...member, role: ROOM_ROLE.HOST };
        }

        if (member.role === ROOM_ROLE.HOST) {
          return { ...member, role: ROOM_ROLE.MEMBER };
        }

        return member;
      });

      setRoomData({ members: updatedMembers });
    },
  });

  const handleMenu = async (menu: string, memberId: number) => {
    switch (menu) {
      case MENU_TEXT.TRANSFER_HOST:
        // 테스트용 삭제 예정 코드입니다
        const updatedMembers = members.map(member => {
          if (member.id === host.id) {
            return { ...member, role: ROOM_ROLE.MEMBER };
          }

          if (member.id === memberId) {
            return { ...member, role: ROOM_ROLE.HOST };
          }

          return member;
        });

        setRoomData({ members: updatedMembers });
        // Todo: 방장 수동 변경 API 테스트
        // await mutation.mutate({ hostId: host.id, organizerId: memberId });
        break;
      case MENU_TEXT.KICKOUT:
        const answer = confirm('정말 강제 퇴장하시겠습니까?');

        if (answer) {
          const newMembers = members.filter(member => member.id !== memberId);
          setRoomData({ members: newMembers });
        }
        break;
      default:
        break;
    }
  };

  const renderCards = useMemo(() => {
    const renderedMembers = members.map(member => (
      <MemberCard
        key={member.id}
        myRole={myRole}
        memberId={member.id}
        nickname={member.nickname}
        role={member.role}
        profileImage={member.profileImage}
        ready={member.ready}
        onMenuClick={handleMenu}
      />
    ));

    const emptyCount = MAX_MEMBERS - members.length;

    for (let i = 0; i < emptyCount; i++) {
      renderedMembers.push(
        <CardWrapper
          key={Date.now() + i}
          $isEmpty={true}
        />
      );
    }

    return renderedMembers;
  }, [members]);

  return (
    <S.MembersContainer className={className}>{renderCards}</S.MembersContainer>
  );
}
