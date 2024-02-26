import * as S from '@/pages/RoomPage/RoomPage.style';
import { UpdateRoomType } from '@/types/room';

import { RoomHeaderButtons, RoomHeaderInfo } from '.';

interface RoomProps {
  data: UpdateRoomType;
}

export default function RoomHeader({ data }: RoomProps) {
  return (
    <S.HeaderContainer>
      <RoomHeaderInfo
        className="roomInfo"
        data={data}
      />
      <RoomHeaderButtons className="roomButtons" />
    </S.HeaderContainer>
  );
}
