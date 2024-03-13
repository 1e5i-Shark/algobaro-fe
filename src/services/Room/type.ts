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
