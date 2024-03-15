import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { RoomDetailResponse } from './type';

const getRoomDetail = async (roomShortUuid: string) => {
  return await axiosAuthInstance.get<RoomDetailResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}/${roomShortUuid}`
  );
};

export default getRoomDetail;
