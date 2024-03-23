import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { GetSolvedHistoryListParams, SolvedHistoryListResponse } from './type';

const getSolvedHistoryList = async ({
  page,
  size,
}: GetSolvedHistoryListParams) => {
  return await axiosAuthInstance.get<SolvedHistoryListResponse>(
    `${API_ENDPOINT.SOLVE.SOLVED_HISTORY_LIST}`,
    {
      params: {
        page,
        size,
      },
    }
  );
};

export default getSolvedHistoryList;
