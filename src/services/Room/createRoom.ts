import { ROOMS_URL } from '../apiEndpoint';
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
  roomShortUuid: string;
  roomMembers: string[];
}

export interface CreateRoomResponse {
  success: boolean;
  response: CreateRoomData;
}

export const createRoom = (request: CreateRoomRequest) => {
  return axiosAuthInstance.post<CreateRoomResponse>(ROOMS_URL, request);
};
