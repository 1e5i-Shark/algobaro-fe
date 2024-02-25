import { UpdateRoomType } from '@/types/room';

import { HeaderContainer } from '../../RoomPage.style';
import RoomHeaderButtons from './RoomHeaderButtons';
import RoomHeaderInfo from './RoomHeaderInfo';

interface RoomProps {
  data: UpdateRoomType;
}

export default function RoomHeader({ data }: RoomProps) {
  return (
    <HeaderContainer>
      <RoomHeaderInfo
        className="roomInfo"
        data={data}
      />
      <RoomHeaderButtons className="roomButtons" />
    </HeaderContainer>
  );
}
