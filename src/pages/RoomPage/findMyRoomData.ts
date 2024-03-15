import { RoomMemberType } from '@/types/room';

export const findMyRoomData = (
  roomMembers: RoomMemberType[],
  email: string
) => {
  return roomMembers.find(member => member.email === email);
};
