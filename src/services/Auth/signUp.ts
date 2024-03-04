import { SignUpProps, SignUpResponse } from '@/hooks/Api/type';

import { SIGNUP_URL } from '../apiEndpoint';
import { axiosInstance } from '../axiosInstance';

const signUp = async ({ email, nickname, bojId, password }: SignUpProps) => {
  const reqBody = {
    email,
    nickname,
    bojId,
    password,
  };

  const res: SignUpResponse = await axiosInstance.post(
    `${SIGNUP_URL}`,
    reqBody
  );

  return res;
};

export default signUp;
