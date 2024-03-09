import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { v4 } from 'uuid';

import { MemberCard } from '@/components';
import { MENU_TEXT } from '@/components/Common/Menu/MenuText';
import { CardWrapper } from '@/components/MemberCard/MemberCard.style';
import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { changeHostManual } from '@/services/Room/Room';
import useRoomStore from '@/store/Room';
import {
  ChangeHostManualResponse,
  RoleType,
  RoomMemberType,
} from '@/types/room';

interface MemberListProps {
  className: string;
  myRole: RoleType;
}

const MAX_MEMBERS = 6;

export default function MemberList({ className, myRole }: MemberListProps) {
  const { roomData, setRoomData } = useRoomStore();
  const { roomId, roomMembers } = roomData;

  const [host] = roomMembers.filter(member => member.role === ROOM_ROLE.HOST);

  const { mutate: changeHostMutate } = useMutation({
    mutationFn: changeHostManual,
    onSuccess: (data: ChangeHostManualResponse) => {
      if (!data.response) return;

      const { previousHostId, newHostId } = data.response;
      // Todo: API 테스트
      const updatedMembers: RoomMemberType[] = roomMembers.map(member => {
        // Todo: 백엔드 요청: member.id와 newHostId, previousHostId 일치 필요
        if (member.id === newHostId) {
          return { ...member, role: ROOM_ROLE.HOST };
        }

        if (member.id === previousHostId) {
          return { ...member, role: ROOM_ROLE.MEMBER };
        }

        return member;
      });

      setRoomData({ roomMembers: updatedMembers });
    },
  });

  const handleMenu = async (menu: string, memberId: number) => {
    switch (menu) {
      case MENU_TEXT.TRANSFER_HOST:
        // 테스트용 삭제 예정 코드입니다
        const updatedMembers = roomMembers.map(member => {
          if (member.id === host.id) {
            return { ...member, role: ROOM_ROLE.MEMBER };
          }

          if (member.id === memberId) {
            return { ...member, role: ROOM_ROLE.HOST };
          }

          return member;
        });

        setRoomData({ roomMembers: updatedMembers });
        // Todo: 방장 수동 변경 API 테스트
        await changeHostMutate({
          roomId,
          hostId: host.id,
          organizerId: memberId,
        });
        break;
      case MENU_TEXT.KICKOUT:
        const answer = confirm('정말 강제 퇴장하시겠습니까?');

        if (answer) {
          const newMembers = roomMembers.filter(
            member => member.id !== memberId
          );
          setRoomData({ roomMembers: newMembers });
        }
        break;
      default:
        break;
    }
  };

  const memberCards = useMemo(() => {
    const cardList = roomMembers.map(member => (
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

    const emptyCount = MAX_MEMBERS - roomMembers.length;

    for (let i = 0; i < emptyCount; i++) {
      cardList.push(
        <CardWrapper
          key={v4()}
          $isEmpty={true}
        />
      );
    }

    return cardList;
  }, [roomMembers]);

  return (
    <S.MembersContainer className={className}>{memberCards}</S.MembersContainer>
  );
}
