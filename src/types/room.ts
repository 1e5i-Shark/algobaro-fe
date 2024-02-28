// 개별 방 정보 조회
export interface RoomType {
  roomId: number;
  roomStatus: string;
  title: string;
  introduce: string;
  roomAccessType: string;
  problemPlatform: string;
  problemName: string;
  password: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
  roomUUID: string;
  // Todo: 백엔드 요청 보류
  languages: string[];
  users: User[];
  problemLink: string;
}

export interface OmitRoomType
  extends Omit<RoomType, 'languages' | 'users' | 'problemLink'> {}

export interface RoomResponse {
  success: boolean;
  response: OmitRoomType;
}

// 방 수정 API
export interface UpdateRoom {
  title: string;
  introduce: string;
  startAt: string;
  roomAccessType: string;
  problemLink: string;
  problemPlatform: string;
  problemName: string;
  password: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
}

export interface ChangeHostResponse {
  id: number;
  roomId: number;
}

export interface User {
  username: string;
  status: string;
  image: string;
}
