import { ROOMS_URL } from '../apiEndpoint';
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
  return await axiosAuthInstance.get<RoomsListResponse>(`${ROOMS_URL}`, {
    params: {
      page,
      size,
      searchTitle,
      roomStatus,
      roomAccessType,
      languages,
    },
  });
};

export default getRoomsList;
