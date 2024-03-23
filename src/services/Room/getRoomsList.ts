import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { RoomsListResponse, RoomsRequestQuery } from './type';

const getRoomsList = async ({
  page,
  size = 4,
  searchTitle,
  roomStatus,
  roomAccessType,
  languages,
}: RoomsRequestQuery) => {
  return await axiosAuthInstance.get<RoomsListResponse>(
    `${API_ENDPOINT.ROOM.ROOMS}`,
    {
      params: {
        page,
        size,
        searchTitle,
        roomStatus,
        roomAccessType,
        languages,
      },
    }
  );
};

export default getRoomsList;
