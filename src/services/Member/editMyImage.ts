import { EDIT_MY_IMAGE } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

const editMyImage = async (formData: FormData) => {
  return await axiosAuthInstance.patch(`${EDIT_MY_IMAGE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default editMyImage;
