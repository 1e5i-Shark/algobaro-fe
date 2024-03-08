import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { PATH } from '@/routes/path';
import { signIn, signUp } from '@/services/Auth';

import { useLocalStorage } from '../useLocalStorage';

/**
 * 로그인 signIn API 통신 함수를 사용하는 useMutation를 반환하는 훅이다.
 * - 로그인 성공 시 액세스 토큰을 로컬 스토리지에 저장한다.
 * - 저장 후 메인 페이지(홈)으로 다이렉팅한다.
 */
export const useSignIn = () => {
  const navigate = useNavigate();
  const [, setAccessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ response }) => {
      setAccessToken(response.accessToken);
      navigate(PATH.HOME);
    },
  });
};

/**
 * 회원가입 signUp API 함수를 사용하는 useMutation 커스텀 훅이다.
 * - 회원가입 성공 시 동시에 해당 인증 정보로 로그인도 진행한다.
 * @returns 회원가입 성공 시 서버 내 유저 고유 id를 반환한다.
 */
export const useSignUp = () => {
  const { mutate: signInMutate } = useSignIn();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data, signUpReqBody) => {
      const { email, password } = signUpReqBody;

      signInMutate({ email, password });
      return data;
    },
  });
};
