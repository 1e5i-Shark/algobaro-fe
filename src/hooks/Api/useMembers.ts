import { useMutation, useQuery } from '@tanstack/react-query';

import { MY_INFO_KEY } from '@/constants/queryKey';
import {
  editMyImage,
  editMyInfo,
  editMyPassword,
  myInfo,
} from '@/services/Member';

/**
 * 내 정보를 불러오는 GET myInfo 함수 useQuery 훅이다.
 * @returns useQuery 객체를 반환한다.
 */
export const useMyInfo = () => {
  return useQuery({
    queryKey: [MY_INFO_KEY],
    queryFn: myInfo,
    enabled: false,
    retry: 0,
  });
};

/**
 * 내 기본 정보를 변경하는 PATCH editMyInfo 함수 useMutation 훅이다.
 * @returns useMutation 객체를 반환한다.
 */
export const useEditMyInfo = () => {
  const { refetch } = useMyInfo();

  return useMutation({
    mutationFn: editMyInfo,
    onSuccess: () => {
      refetch();
    },
  });
};

/**
 * 내 기본 정보를 변경하는 PATCH editMyPassword 함수 useMutation 훅이다.
 * @returns useMutation 객체를 반환한다.
 */
export const useEditMyPassword = () => {
  const { refetch } = useMyInfo();

  return useMutation({
    mutationFn: editMyPassword,
    onSuccess: () => {
      refetch();
    },
  });
};

/**
 * 내 기본 정보를 변경하는 PATCH editMyImage 함수 useMutation 훅이다.
 * @returns useMutation 객체를 반환한다.
 */
export const useEditMyImage = () => {
  const { refetch } = useMyInfo();

  return useMutation({
    mutationFn: editMyImage,
    onSuccess: () => {
      refetch();
    },
  });
};
