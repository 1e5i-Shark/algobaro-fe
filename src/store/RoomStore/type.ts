import { RoomType } from '@/types/room';

export interface RoomStateProps {
  roomData: RoomType;
  setRoomData: (state: Partial<RoomType>) => void;
}
