import { ParticipantsCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

export default function Participants() {
  const { roomData } = useRoomStore();
  const { members } = roomData;
  return (
    <S.ParticipantsContainer>
      {members &&
        members.map((member, index) => {
          return (
            <ParticipantsCard
              key={member.username + index}
              username={member.username}
              status={member.status}
              image={member.image}
            />
          );
        })}
    </S.ParticipantsContainer>
  );
}
