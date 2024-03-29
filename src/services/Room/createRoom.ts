import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

export interface CreateRoomRequest {
  roomStatus: string; // [RECRUTING, RUNNING]
  title: string;
  roomAccessType: string; // [PRIVATE, PUBLIC]
  roomLimit: number;
  startAt: string; // ($date-time) 2024-02-27T13:36:49.089Z
  problemLink: string;
  problemPlatform: string;
  password?: string;
  tags?: string[];
  timeLimit?: number;
}

export interface CreateRoomData extends CreateRoomRequest {
  roomId: number;
  roomShortUuid: string;
  roomMembers: string[];
}

export interface CreateRoomResponse {
  success: boolean;
  response: CreateRoomData;
}

export const createRoom = (request: CreateRoomRequest) => {
  return axiosAuthInstance.post<CreateRoomResponse>(
    API_ENDPOINT.ROOM.ROOMS,
    request
  );
};
