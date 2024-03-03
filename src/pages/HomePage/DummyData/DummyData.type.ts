export interface RoomDataProps {
  id: number;
  title: string;
  roomAccess: boolean;
  currentRoomMember: number;
  roomMemberLimit: number;
  tags: string[];
  language: string[];
  roomStatus: string;
}
