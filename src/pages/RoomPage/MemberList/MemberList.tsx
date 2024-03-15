import { useMemo } from 'react';
import { v4 } from 'uuid';

import { MemberCard } from '@/components';
import { MENU_TEXT } from '@/components/Common/Menu/MenuText';
import { CardWrapper } from '@/components/MemberCard/MemberCard.style';
import { SOCKET_TYPE } from '@/constants/socket';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

interface MemberListProps {
  className: string;
}

const MAX_MEMBERS = 6;

export default function MemberList({ className }: MemberListProps) {
  const {
    roomData,
    myRoomData: { role: myRole },
  } = useRoomStore();
  const { roomMembers } = roomData;

  const { sendMessage, setMessageValue } = useMessageStore();

  const handleMenu = async (menu: string, id: number) => {
    switch (menu) {
      case MENU_TEXT.TRANSFER_HOST:
        alert('방장 수동 변경!');

        setMessageValue({ userId: id.toString() });
        sendMessage(SOCKET_TYPE.ROOM.CHANGE_HOST);
        break;
      // 소켓 미구현으로 보류
      // case MENU_TEXT.KICKOUT:
      //   const answer = confirm('정말 강제 퇴장하시겠습니까?');

      //   if (answer) {
      //     const newMembers = roomMembers.filter(
      //       member => member.memberId !== id
      //     );
      //     setRoomData({ roomMembers: newMembers });
      //   }
      //   break;
      default:
        break;
    }
  };

  const memberCards = useMemo(() => {
    const cardList = roomMembers.map(member => (
      <MemberCard
        key={member.memberId}
        myRole={myRole}
        memberId={member.memberId}
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
