import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import { getSolvedHistoryList } from '@/services/Solve';
import getSolvedDetail from '@/services/Solve/getSolvedDetail';
import { GetSolvedHistoryListParams } from '@/services/Solve/type';

export const useSolvedHistoryList = ({
  page,
  size,
}: GetSolvedHistoryListParams) => {
  const reqParams = { page, size };
  return useQuery({
    queryKey: [QUERY_KEY.SOLVE.SOLVED_HISTORIES, reqParams],
    queryFn: () => getSolvedHistoryList(reqParams),
    enabled: false,
    keepPreviousData: true,
  });
};

export const useGetSolvedDetail = (solveId: number) => {
  return useQuery({
    queryFn: () => getSolvedDetail(solveId),
    queryKey: [QUERY_KEY.SOLVE.SOLVED_DETAIL, solveId],
    enabled: solveId !== 0,
    retry: 0,
  });
};

export const useSolvedResult = (roomShortUuid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SOLVE.RESULT, roomShortUuid],
    queryFn: () => getSolvedResult(roomShortUuid),
    select: data => data?.response.solveResults,
    enabled: !!roomShortUuid,
  });
};
