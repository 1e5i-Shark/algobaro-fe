import { ParticipantsCard } from '@/components';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { UserType } from '@/types/room';

interface ParticipantsProps {
  data: UserType[];
}

export default function Participants({ data }: ParticipantsProps) {
  return (
    <S.ParticipantsContainer>
      {data.map((user, index) => {
        return (
          <ParticipantsCard
            key={user.username + index}
            username={user.username}
            status={user.status}
            image={user.image}
          />
        );
      })}
    </S.ParticipantsContainer>
  );
}
