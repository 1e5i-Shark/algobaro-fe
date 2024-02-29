import { MemberCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

export default function Members() {
  const { roomData } = useRoomStore();
  const { members } = roomData;
  return (
    <S.MembersContainer>
      {members &&
        members.map((member, index) => {
          return (
            <MemberCard
              key={member.username + index}
              username={member.username}
              status={member.status}
              image={member.image}
            />
          );
        })}
    </S.MembersContainer>
  );
}
