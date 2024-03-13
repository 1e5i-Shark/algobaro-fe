import { SOLVED_HISTORY_LIST } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { GetSolvedHistoryListParams, SolvedHistoryListResponse } from './type';

const getSolvedHistoryList = async ({
  page,
  size,
}: GetSolvedHistoryListParams) => {
  return await axiosAuthInstance.get<SolvedHistoryListResponse>(
    `${SOLVED_HISTORY_LIST}`,
    {
      params: {
        page,
        size,
      },
    }
  );
};

export default getSolvedHistoryList;
