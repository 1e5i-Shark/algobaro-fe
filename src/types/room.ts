export type RoomStatusType = 'RECRUITING' | 'RUNNING';
export type AccessType = 'PUBLIC' | 'PRIVATE';
export type RoleType = 'HOST' | 'MEMBER';

export interface RoomType {
  roomId: number;
  introduce: string; // 삭제 예정
  roomStatus: RoomStatusType;
  title: string;
  roomAccessType: AccessType;
  problemPlatform: 'BOJ';
  problemName: string;
  problemLink: string;
  password?: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
  roomUUID: string;
  startAt?: string;
  languages: string[];
  members: MemberType[];
}

export interface OmitRoomType
  extends Omit<RoomType, 'languages' | 'members' | 'problemLink' | 'startAt'> {}

export interface RoomResponse {
  success: boolean;
  response: OmitRoomType;
}

export interface UpdateRoomType
  extends Pick<
    RoomType,
    | 'title'
    | 'startAt'
    | 'roomAccessType'
    | 'problemLink'
    | 'problemPlatform'
    | 'problemName'
    | 'password'
    | 'roomLimit'
    | 'tags'
    | 'timeLimit'
  > {}

export interface EditRoomProps {
  endPoint: string;
  requestBody: Pick<
    RoomType,
    'roomAccessType' | 'problemLink' | 'timeLimit' | 'password'
  >;
}

export interface ChangeHostProps {
  hostId: number;
  organizerId: number;
}

export interface ChangeHostResponse {
  success: boolean;
  organizerId?: number;
}

export interface MemberType {
  id: number;
  nickname: string;
  bojId: string;
  profileImage: string;
  role: RoleType;
  ready: boolean;
}
