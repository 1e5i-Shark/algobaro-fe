import { ROOMS_CODES_URL, ROOMS_HOST_URL, ROOMS_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

export const ROOM_STATUS = {
  RECRUITING: 'RECRUITING',
  RUNNING: 'RUNNING',
};

export const ROOM_ACCESS = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const ROOM_ROLE = {
  HOST: 'HOST',
  MEMBER: 'MEMBER',
};

// 개별 방 정보 조회
export const getUuidRoom = async (endPoint: string) => {
  return await axiosAuthInstance.get(`${ROOMS_URL}/${endPoint}`);
};

// 방 수정
export const editRoom = async (
  endPoint: number,
  params: Record<string, string | number>
) => {
  return await axiosAuthInstance.patch(`${ROOMS_URL}/${endPoint}`, params);
};

// 문제 풀이 시작
export const startTest = async (endPoint: string) => {
  return await axiosAuthInstance.post(`${ROOMS_CODES_URL}/${endPoint}`);
};

// 방장 자동 변경
export const changeHostAuto = async (endPoint: string) => {
  return await axiosAuthInstance.get(`${ROOMS_HOST_URL}/${endPoint}`);
};

// 방장 수동 변경
export const changeHost = async (endPoint: {
  hostId: number;
  organizerId: number;
}) => {
  const { hostId, organizerId } = endPoint;
  return await axiosAuthInstance.get(
    `${ROOMS_HOST_URL}/${hostId}/${organizerId}`
  );
};
