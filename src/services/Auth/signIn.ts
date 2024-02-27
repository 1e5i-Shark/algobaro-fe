import { SIGNIN_URL } from '@/components/LoginForm/loginConstants';

import { axiosInstance } from '../axiosInstance';

const signIn = async (email: string, password: string) => {
  const reqBody = {
    email,
    password,
  };

  try {
    const res = await axiosInstance.post(`${SIGNIN_URL}`, reqBody);

    console.log('응답:', res);
  } catch (e) {
    console.error(e);
  }
};

export default signIn;
