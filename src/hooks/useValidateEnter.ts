import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/routes/path';
import { validateEnter } from '@/services/Room/validateEnter';

interface responseData {
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
}

export interface ValidateEnterErrorProps {
  code: string;
  config: unknown;
  message: string;
  name: string;
  request: unknown;
  response: {
    data: responseData;
    config: unknown;
    headers: unknown;
    request: unknown;
    status: number;
    statusText: string;
  };
}

export const useValidateEnter = (roomShortUuid: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: validateEnter,
    onSuccess: () => {
      navigate(`${PATH.ROOM}/${roomShortUuid}`);
    },
    onError: (error: ValidateEnterErrorProps) => {
      const { errorCode, message } = error.response.data.error;

      switch (errorCode) {
        case 'E03301':
        case 'E05102':
        case 'E05103':
        case 'E05104':
          alert(message);
          break;
        default:
          alert('알수없는 오류가 발생했습니다.');
          break;
      }
    },
  });
};
