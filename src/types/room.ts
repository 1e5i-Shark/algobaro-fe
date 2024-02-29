// 개별 방 정보 조회
export type StatusType = 'RECRUITING' | 'RUNNING';
export type AccessType = 'PUBLIC' | 'PRIVATE';

export interface RoomType {
  roomId: number;
  introduce: string; // 삭제 예정
  roomStatus: StatusType;
  title: string;
  roomAccessType: AccessType;
  problemPlatform: '백준';
  problemName: string;
  problemLink: string;
  password?: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
  roomUUID: string;
  startAt: string;
  languages: string[];
  members: Member[];
}

export interface OmitRoomType
  extends Omit<RoomType, 'languages' | 'members' | 'problemLink'> {}

export interface RoomResponse {
  success: boolean;
  response: OmitRoomType;
}

// 방 수정 API
export interface UpdateRoom
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

export interface ChangeHostResponse {
  id: number;
  roomId: number;
}

export interface Member {
  username: string;
  status: string;
  image: string;
}
