import { MemberCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

export default function Members() {
  const { roomData } = useRoomStore();
  const { members } = roomData;

  return (
    <S.MembersContainer>
      {members &&
        members.map(member => {
          return (
            <MemberCard
              key={member.id}
              nickname={member.nickname}
              role={member.role}
              profileImage={member.profileImage}
            />
          );
        })}
    </S.MembersContainer>
  );
}
