import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY, SOLVED_HISTORIES } from '@/constants/queryKey';
import { getSolvedHistoryList, getSolvedResult } from '@/services/Solve';
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
    keepPreviousData: true,
  });
};

export const useSolvedResult = (roomShortUuid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SOLVE.RESULT],
    queryFn: () => getSolvedResult(roomShortUuid),
    select: data => data?.response.solveResults,
    enabled: !!roomShortUuid,
  });
};
