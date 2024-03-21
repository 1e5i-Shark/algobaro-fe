import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { RoomMember } from './type';

export interface ValidateEnterResponse {
  success: boolean;
  response: {
    roomMembers: RoomMember[];
  };
}

export interface ValidateEnterRequest {
  roomShortUuid: string;
  password: string;
}

export const validateEnter = (request: ValidateEnterRequest) => {
  return axiosAuthInstance.post<ValidateEnterResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}/${request.roomShortUuid}/validate-enter`,
    request
  );
};
