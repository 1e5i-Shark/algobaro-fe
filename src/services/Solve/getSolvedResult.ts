import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { SolvedResultResponse } from './type';

const getSolvedResult = async (roomShortUuid: string) => {
  return await axiosAuthInstance.get<SolvedResultResponse>(
    `${API_ENDPOINT.SOVLE.RESULT}/${roomShortUuid}`
  );
};

export default getSolvedResult;
