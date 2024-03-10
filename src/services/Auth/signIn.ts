import { SignInProps, SignInResponse } from '@/services/Auth/type';

import { SIGNIN_URL } from '../apiEndpoint';
import { axiosInstance } from '../axiosInstance';

const signIn = async ({ email, password }: SignInProps) => {
  const reqBody = {
    email,
    password,
  };

  const res: SignInResponse = await axiosInstance.post(
    `${SIGNIN_URL}`,
    reqBody
  );

  return res;
};

export default signIn;
