import { API_ENDPOINT } from '@/services/apiEndpoint';
import { axiosAuthInstance } from '@/services/axiosInstance';
import * as T from '@/types/room';

// 개별 방 정보 조회
export const getUuidRoom = async (path: string) => {
  return await axiosAuthInstance.get<T.RoomResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}${path}`
  );
};

// 방 정보 수정
export const updateRoom = async ({ path, requestBody }: T.UpdateRoomProps) => {
  return await axiosAuthInstance.patch<T.UpdateRoomResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}${path}`,
    requestBody
  );
};

// 문제 풀이 시작
export const startTest = async (path: string) => {
  return await axiosAuthInstance.post<T.RoomResponse>(
    `${API_ENDPOINT.ROOM.CODES}${path}`
  );
};
