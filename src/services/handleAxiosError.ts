import { AxiosError } from 'axios';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { ErrorDataType } from '@/types/api';
import { toastify } from '@/utils/toastify';

const handleAxiosError = (errorAxios: AxiosError<ErrorDataType>) => {
  const errorData = errorAxios.response?.data;

  if (errorData) {
    const { error } = errorData;
    const errorCode = error.errorCode;

    switch (errorCode) {
      // 에러코드 별로 추가할 수 있다.
      // Todo: 객체 형태로 키 밸류 형태로 리팩토링한다.
      case 'E00202': // 비밀번호가 일치하지 않습니다.
        toastify.error('로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.');
        break;
      case 'E01302': // 가입되지 않은 이메일입니다.
        toastify.error('가입되지 않은 이메일입니다. 다시 로그인해주세요.');
        break;
      case 'E00201': // 401 에러와 같이 인증 관련 접근 제한 에러
        localStorage.removeItem(LOCAL_ACCESSTOKEN);
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export default handleAxiosError;
