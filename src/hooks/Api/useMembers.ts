import { useMutation, useQuery } from '@tanstack/react-query';

import { MY_INFO_KEY } from '@/constants/queryKey';
import { myInfo } from '@/services/Member';
import editMyInfo from '@/services/Member/editMyInfo';

export const useMyInfo = () => {
  return useQuery({
    queryKey: [MY_INFO_KEY],
    queryFn: myInfo,
    enabled: false,
    retry: 0,
  });
};

export const useEditMyInfo = () => {
  const { refetch } = useMyInfo();

  return useMutation({
    mutationFn: editMyInfo,
    onSuccess: () => {
      refetch();
    },
  });
};
