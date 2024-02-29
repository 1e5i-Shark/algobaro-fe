export type DummyLanguageType = 'python' | 'javascript' | 'cPlusPlus' | 'java';

export interface RoomDataProps {
  id: number;
  title: string;
  roomAccess: boolean;
  currentRoomMember: number;
  roomMemberLimit: number;
  tags: string[];
  language: DummyLanguageType[];
  roomStatus: string;
}
