import { SIGNIN_URL } from '../apiEndpoint';
import { axiosInstance } from '../axiosInstance';

interface SignInResponse {
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

  const res: SignInResponse = await axiosInstance.post(
    `${SIGNIN_URL}`,
    reqBody
  );

  return res;
};

export default signIn;
