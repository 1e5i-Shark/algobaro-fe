import { AxiosError } from 'axios';

import { ErrorDataType } from '@/types/api';

const handleAxiosError = (error: AxiosError<ErrorDataType>) => {
  const errorData = error.response?.data;

  if (errorData) {
    const { error } = errorData;
    const errorCode = error.errorCode;

    switch (errorCode) {
      case 'E00202':
        console.log('비밀번호가 일치하지 않습니다.');
        break;
      case 'E01302':
        console.log('가입되지 않은 이메일입니다.');
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export default handleAxiosError;
