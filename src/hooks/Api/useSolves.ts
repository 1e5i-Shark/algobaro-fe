import { useQuery } from '@tanstack/react-query';

import { SOLVED_HISTORIES } from '@/constants/queryKey';
import { getSolvedHistoryList } from '@/services/Solve';
import { GetSolvedHistoryListParams } from '@/services/Solve/type';

export const useSolvedHistoryList = ({
  page,
  size,
}: GetSolvedHistoryListParams) => {
  const reqParams = { page, size };
  return useQuery({
    queryKey: [SOLVED_HISTORIES, reqParams],
    queryFn: () => getSolvedHistoryList(reqParams),
    enabled: false,
  });
};
