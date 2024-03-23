export type RoomStatusType = 'RECRUITING' | 'RUNNING';
export type AccessType = 'PUBLIC' | 'PRIVATE';
export type RoleType = 'HOST' | 'PARTICIPANT';
export type LanguagesType = 'JAVA' | 'PYTHON' | 'JAVASCRIPT' | 'C++';

export interface RoomType {
  roomId: number;
  roomStatus: RoomStatusType;
  title: string;
  languages: LanguagesType[];
  roomAccessType: AccessType;
  problemPlatform: string;
  password?: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
  roomShortUuid: string;
  roomMembers: RoomMemberType[];

  currentMemberCount: number;
  problemLink: string;
  endTime: string;
  roomUUID?: string;
  startAt?: string;
}

export interface ResponseType {
  success: boolean;
  error?: {
    errorCode: string;
    message: string;
  };
}

export interface OmitRoomType
  extends Omit<
    RoomType,
    | 'currentMemberCount'
    | 'problemName'
    | 'problemLink'
    | 'roomUUID'
    | 'startAt'
  > {}

export interface RoomResponse extends ResponseType {
  response?: OmitRoomType;
}

export interface UpdateRoom
  extends Required<Pick<RoomType, 'timeLimit' | 'roomLimit'>>,
    Partial<
      Pick<
        RoomType,
        | 'title'
        | 'startAt'
        | 'languages'
        | 'roomAccessType'
        | 'problemLink'
        | 'problemPlatform'
        | 'password'
        | 'tags'
      >
    > {}

export interface UpdateRoomProps {
  path: string;
  requestBody: UpdateRoom;
}

export interface UpdateRoomResponse extends ResponseType {
  response?: Pick<
    RoomType,
    | 'roomId'
    | 'roomStatus'
    | 'title'
    | 'languages'
    | 'roomAccessType'
    | 'problemPlatform'
    | 'roomLimit'
    | 'tags'
    | 'roomShortUuid'
    | 'currentMemberCount'
  >;
}

export interface ValidateEnterParams {
  password: string;
}

export interface ValidateEnterProps {
  path: string;
  requestBody: ValidateEnterParams;
}

export interface ValidateEnterResponse extends ResponseType {}

export interface ToggleReadyResponse extends ResponseType {
  response?: RoomMemberType[];
}

export interface ChangeHostAutoProps {
  roomId: number;
}

export interface ChangeHostAutoResponse extends ResponseType {
  response?: {
    roomId: number;
    newHostId: number;
    newHostNickname: string;
  };
}

export interface ChangeHostManualProps {
  roomId: number;
  hostId: number;
  organizerId: number; // 호스트로 바뀔 멤버
}

export interface ChangeHostManualResponse extends ResponseType {
  response?: {
    roomId: number;
    previousHostId: number;
    previousHostNickname: string;
    newHostId: number;
    newHostNickname: string;
  };
}

export interface RoomMemberType {
  memberId: number; // pk키
  email: string;
  nickname: string;
  profileImage: string | null;
  role: RoleType;
  joinTime: string;
  ready: boolean;
}

// 아래는 건호의 v1/rooms 에서 사용하는 타입입니다.
export interface RoomsListType {
  roomId: number;
  roomStatus: RoomStatusType;
  title: string;
  languages: LanguagesType[];
  roomAccessType: AccessType;
  problemPlatform: string;
  roomLimit: number;
  tags: string[];
  roomShortUuid: string;
  currentMemberCount: number;
}
