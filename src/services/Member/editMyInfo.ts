import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { EditMyInfoProps } from './type';

const editMyInfo = async ({ nickname, bojId }: EditMyInfoProps) => {
  const reqBody = {
    nickname,
    bojId,
  };
  return await axiosAuthInstance.patch(
    `${API_ENDPOINT.MEMBER.EDIT_MY_INFO_URL}`,
    reqBody
  );
};

export default editMyInfo;
