import { AccessType, RoomsListType, RoomStatusType } from '@/types/room';

export interface RoomsRequestQuery {
  page: number;
  size: number;
  searchTitle?: string;
  roomStatus?: RoomStatusType;
  roomAccessType?: AccessType;
  languages?: string;
}

export interface RoomsListResponse {
  success: boolean;
  response: {
    content: RoomsListType[];
    totalPages: number;
    totalElements: number;
  };
}

export interface RoomResponse {
  roomId: number;
  roomStatus: RoomStatusType;
  title: string;
  languages: string[];
  roomAccessType: AccessType;
  problemPlatform: string;
  password: string;
  roomLimit: number;
  tags: string[];
  timeLimit: number;
  roomShortUuid: string;
  roomMembers: RoomMember[];
}
export interface RoomMember {
  memberId: number;
  email: string;
  nickname: string;
  profileImage: string;
  role: string;
  joinTime: string;
  ready: boolean;
}
export interface RoomDetailResponse {
  success: boolean;
  response: RoomResponse;
}
