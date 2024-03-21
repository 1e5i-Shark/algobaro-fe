import { AxiosError } from 'axios';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { ErrorDataType } from '@/types/api';

const handleAxiosError = (errorAxios: AxiosError<ErrorDataType>) => {
  const errorData = errorAxios.response?.data;

  if (errorData) {
    const { error } = errorData;
    const errorCode = error.errorCode;

    switch (errorCode) {
      // 에러코드 별로 추가할 수 있다.
      case 'E00202': // 비밀번호가 일치하지 않습니다.
        alert('로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.');
        break;
      case 'E01302': // 가입되지 않은 이메일입니다.
        alert('가입되지 않은 이메일입니다. 다시 로그인해주세요.');
        break;
      case 'E00201': // 401 에러와 같이 인증 관련 접근 제한 에러
        localStorage.removeItem(LOCAL_ACCESSTOKEN);
        break;
      case 'E00101': // 회원가입에서 이미 존재하는 이메일 입력 시
        alert('이미 존재하는 이메일입니다.');
        break;
      case 'E00102': // 회원가입에서 이미 존재하는 닉네임 입력 시
        alert('이미 존재하는 닉네임입니다.');
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export default handleAxiosError;
