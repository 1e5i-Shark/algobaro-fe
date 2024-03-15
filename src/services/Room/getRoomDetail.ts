import { ROOMS_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { RoomDetailResponse } from './type';

const getRoomDetail = async (roomShortUuid: string) => {
  return await axiosAuthInstance.get<RoomDetailResponse>(
    `${ROOMS_URL}/${roomShortUuid}`
  );
};

export default getRoomDetail;
