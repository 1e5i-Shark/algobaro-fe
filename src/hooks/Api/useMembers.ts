import { useQuery } from '@tanstack/react-query';

import { MY_INFO_KEY } from '@/constants/queryKey';
import { myInfo } from '@/services/Member';

export const useMyInfo = () => {
  return useQuery({
    queryKey: [MY_INFO_KEY],
    queryFn: myInfo,
    enabled: false,
    retry: 0,
  });
};
