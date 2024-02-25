import { UpdateRoomType } from '@/types/room';

interface RoomProps {
  data: UpdateRoomType;
}

export default function RoomHeader({ data }: RoomProps) {
  return (
    <div>
      <h1>RoomHeader</h1>
    </div>
  );
}
