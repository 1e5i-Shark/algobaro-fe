import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { SolvedDetailResponse } from './type';

const getSolvedDetail = async (solveId: number) => {
  return await axiosAuthInstance.get<SolvedDetailResponse>(
    `${API_ENDPOINT.SOLVE.SOVLED_HISTORY_DETAIL}${solveId}`
  );
};

export default getSolvedDetail;
