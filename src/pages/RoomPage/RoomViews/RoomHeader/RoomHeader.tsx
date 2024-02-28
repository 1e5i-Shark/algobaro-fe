import * as S from '@/pages/RoomPage/RoomPage.style';
import { RoomType } from '@/types/room';

import { RoomHeaderButtons, RoomHeaderInfo } from '.';

interface RoomProps {
  data: RoomType;
}

export default function RoomHeader({ data }: RoomProps) {
  return (
    <S.HeaderContainer>
      <RoomHeaderInfo
        className="roomInfo"
        data={data}
      />
      <RoomHeaderButtons
        className="roomButtons"
        data={data}
      />
    </S.HeaderContainer>
  );
}
