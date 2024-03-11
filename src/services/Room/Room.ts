import { API_ENDPOINT } from '@/services/apiEndpoint';
import { axiosAuthInstance } from '@/services/axiosInstance';
import * as T from '@/types/room';

// 방 API
// 개별 방 정보 조회
// roomShortUuid
export const getUuidRoom = async (path: string) => {
  return await axiosAuthInstance.get<T.RoomResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}${path}`
  );
};

// 방 정보 수정
// roomId
export const updateRoom = async ({ path, requestBody }: T.UpdateRoomProps) => {
  return await axiosAuthInstance.patch<T.UpdateRoomResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}${path}`,
    requestBody
  );
};

// 문제 풀이 시작
// roomShortUuid
export const startTest = async (path: string) => {
  return await axiosAuthInstance.post<T.RoomResponse>(
    `${API_ENDPOINT.ROOM.CODES}${path}`
  );
};

// 방-회원 관련 API
// shortUuid
export const validateEnter = async ({
  path,
  requestBody,
}: T.ValidateEnterProps) => {
  return await axiosAuthInstance.post<T.RoomResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}${path}/validate-enter`,
    requestBody
  );
};

// 삭제 예정 - 소켓 연결
// 방-회원 API
// 준비 상태 변경
export const toggleReady = async (path: string) => {
  return await axiosAuthInstance.post<T.ToggleReadyResponse>(
    `${API_ENDPOINT.ROOM.READY}${path}`
  );
};

// 방장 자동 변경
export const changeHostAuto = async (requestBody: T.ChangeHostAutoProps) => {
  return await axiosAuthInstance.post<T.ChangeHostAutoResponse>(
    `${API_ENDPOINT.ROOM.CHANGE_HOST_AUTO}`,
    requestBody
  );
};

// 방장 수동 변경
export const changeHostManual = async (
  requestBody: T.ChangeHostManualProps
) => {
  return await axiosAuthInstance.post<T.ChangeHostManualResponse>(
    `${API_ENDPOINT.ROOM.CHANGE_HOST_MANUAL}`,
    requestBody
  );
};
