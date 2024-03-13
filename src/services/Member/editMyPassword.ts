import { EDIT_MY_PASSWORD } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';
import { EditMyPasswordProps } from './type';

const editMyPassword = async ({
  currentPassword,
  newPassword,
}: EditMyPasswordProps) => {
  const reqBody = {
    currentPassword,
    newPassword,
  };
  return await axiosAuthInstance.patch(`${EDIT_MY_PASSWORD}`, reqBody);
};

export default editMyPassword;
