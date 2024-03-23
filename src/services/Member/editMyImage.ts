import { API_ENDPOINT } from '../apiEndpoint';
import { axiosAuthInstance } from '../axiosInstance';

const editMyImage = async (formData: FormData) => {
  return await axiosAuthInstance.patch(
    `${API_ENDPOINT.MEMBER.EDIT_MY_IMAGE}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export default editMyImage;
