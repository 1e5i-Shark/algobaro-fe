import { MY_INFO_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

interface MyInfoResponse {
  response: {
    id: number;
    bojId: string;
    email: string;
    nickname: string;
    profileImage?: string;
  };
  success: boolean;
}

const myInfo = async () => {
  const res: MyInfoResponse = await axiosAuthInstance.get(`${MY_INFO_URL}`);

  return res;
};
export default myInfo;
