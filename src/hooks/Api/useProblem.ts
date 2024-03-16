import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import getProblemInfo from '@/services/Problem/getProblemInfo';

export const useProblemInfo = (problemLink: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.PROBLEM.PROBLEM_INFO, problemLink],
    queryFn: () => getProblemInfo(problemLink),
    enabled: false,
  });
};
