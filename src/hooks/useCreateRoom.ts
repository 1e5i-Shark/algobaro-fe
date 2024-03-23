import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/routes/path';
import { createRoom } from '@/services/Room/createRoom';

export const useCreateRoom = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: result => {
      if (result.response) {
        const { roomShortUuid } = result.response;
        navigate(`${PATH.ROOM}/${roomShortUuid}`, { replace: true });
      }
    },
  });
};
