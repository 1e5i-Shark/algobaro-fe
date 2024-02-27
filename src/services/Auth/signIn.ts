import { SIGNIN_URL } from '@/components/LoginForm/loginConstants';

import { axiosInstance } from '../axiosInstance';

interface signInResponse {
  success: boolean;
  response: {
    accessToken: string;
  };
}

const signIn = async (email: string, password: string) => {
  const reqBody = {
    email,
    password,
  };

  const res: signInResponse = await axiosInstance.post(
    `${SIGNIN_URL}`,
    reqBody
  );

  return res;
};

export default signIn;
