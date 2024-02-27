import { AxiosError } from 'axios';

import { errorData } from '@/types/api';

const handleAxiosError = (error: AxiosError<errorData>) => {
  const errorData = error.response?.data;

  if (errorData) {
    const { error } = errorData;
    const errorCode = error.errorCode;

    switch (errorCode) {
      case 'E00202':
        console.error('비밀번호가 일치하지 않습니다.');
        break;
      case 'E01301':
        console.error('가입되지 않은 이메일입니다.');
    }
  }
};

export default handleAxiosError;
