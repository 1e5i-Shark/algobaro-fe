import { RoomMemberType, RoomType } from '@/types/room';

export interface RoomStateProps {
  roomData: RoomType;
  myRoomData: RoomMemberType;
  setRoomData: (state: Partial<RoomType>) => void;
  setMyRoomData: (state: Partial<RoomMemberType>) => void;
  addRoomMembers: (newMembers: RoomMemberType[]) => void;
  reset: () => void;
}
