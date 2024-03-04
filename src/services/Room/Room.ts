import {
  AccessType,
  ChangeHostProps,
  ChangeHostResponse,
  RoleType,
  RoomResponse,
  RoomStatusType,
} from '@/types/room';

import { ROOMS_CODES_URL, ROOMS_HOST_URL, ROOMS_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

export const ROOM_STATUS: { [key: string]: RoomStatusType } = {
  RECRUITING: 'RECRUITING',
  RUNNING: 'RUNNING',
};

export const ROOM_ACCESS: { [key: string]: AccessType } = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const ROOM_ROLE: { [key: string]: RoleType } = {
  HOST: 'HOST',
  MEMBER: 'MEMBER',
};

// 개별 방 정보 조회
export const getUuidRoom = async (endPoint: string) => {
  const response: RoomResponse = await axiosAuthInstance.get(
    `${ROOMS_URL}${endPoint}`
  );
  return response;
};

// 방 수정
export const editRoom = async (
  endPoint: number,
  params: Record<string, string | number>
) => {
  const response = await axiosAuthInstance.patch(
    `${ROOMS_URL}${endPoint}`,
    params
  );
  return response;
};

// 문제 풀이 시작
export const startTest = async (endPoint: string) => {
  return await axiosAuthInstance.post(`${ROOMS_CODES_URL}${endPoint}`);
};

// 방장 자동 변경
export const changeHostAuto = async () => {
  const response = await axiosAuthInstance.get(`${ROOMS_HOST_URL}`);
  return response;
};

// 방장 수동 변경
export const changeHost = async ({ hostId, organizerId }: ChangeHostProps) => {
  const response: ChangeHostResponse = await axiosAuthInstance.get(
    `${ROOMS_HOST_URL}/${hostId}/${organizerId}`
  );

  if (response.success) {
    return { response, organizerId };
  }

  return response;
};
