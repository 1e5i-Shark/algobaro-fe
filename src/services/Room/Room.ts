import {
  ROOMS_CODES_URL,
  ROOMS_HOST_URL,
  ROOMS_URL,
} from '@/services/apiEndpoint';
import { axiosAuthInstance } from '@/services/axiosInstance';
import * as T from '@/types/room';

// 개별 방 정보 조회
export const getUuidRoom = async (endPoint: string) => {
  const response: T.RoomResponse = await axiosAuthInstance.get(
    `${ROOMS_URL}${endPoint}`
  );
  return response;
};

// 방 수정
export const editRoom = async ({ endPoint, requestBody }: T.EditRoomProps) => {
  const response: T.OmitRoomType = await axiosAuthInstance.patch(
    `${ROOMS_URL}${endPoint}`,
    requestBody
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
export const changeHost = async ({
  hostId,
  organizerId,
}: T.ChangeHostProps) => {
  const response: T.ChangeHostResponse = await axiosAuthInstance.get(
    `${ROOMS_HOST_URL}/${hostId}/${organizerId}`
  );

  if (response.success) {
    return { response, organizerId };
  }

  return response;
};
