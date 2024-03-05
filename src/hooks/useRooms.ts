import { useMutation } from '@tanstack/react-query';

import { createRoom } from '@/services/Room/createRoom';

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: createRoom,
  });
};
