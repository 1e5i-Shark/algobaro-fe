import { EDIT_MY_INFO_URL } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { EditMyInfoProps } from './type';

const editMyInfo = async ({ nickname, bojId }: EditMyInfoProps) => {
  const reqBody = {
    nickname,
    bojId,
  };
  return await axiosAuthInstance.patch(`${EDIT_MY_INFO_URL}`, reqBody);
};

export default editMyInfo;
