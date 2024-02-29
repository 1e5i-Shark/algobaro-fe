import * as S from '@/pages/RoomPage/RoomPage.style';

import { RoomHeaderButtons, RoomHeaderInfo } from '.';

export default function RoomHeader() {
  return (
    <S.HeaderContainer>
      <RoomHeaderInfo className="roomInfo" />
      <RoomHeaderButtons className="roomButtons" />
    </S.HeaderContainer>
  );
}
