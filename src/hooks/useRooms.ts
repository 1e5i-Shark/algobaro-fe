import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/queryKey';
import { createRoom } from '@/services/Room/createRoom';
import { getUuidRoom } from '@/services/Room/Room';

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: createRoom,
  });
};

export const useGetUuidRoom = (roomShortUuid: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.UUID_INFO, roomShortUuid],
    queryFn: async () => await getUuidRoom(`/${roomShortUuid}`),
  });
};
