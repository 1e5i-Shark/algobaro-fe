import { useQuery } from '@tanstack/react-query';

import { ROOMS_KEY } from '@/constants/queryKey';
import getRoomsList from '@/services/Room/getRoomsList';
import { RoomsRequestQuery } from '@/services/Room/type';

export const useRoomsList = ({
  page,
  size = 4,
  searchTitle,
  roomStatus,
  roomAccessType,
  languages,
}: RoomsRequestQuery) => {
  // params로 받은 props만을 객체에 담아서 get 요청을 보내기 위함.
  const reqParams = {
    page,
    size,
    ...(searchTitle && { searchTitle }),
    ...(roomStatus && { roomStatus }),
    ...(roomAccessType && { roomAccessType }),
    ...(languages && { languages }),
  };

  return useQuery({
    queryKey: [ROOMS_KEY, reqParams],
    queryFn: () => getRoomsList(reqParams),
    enabled: false,
    // 1분마다 새로고침
    // refetchInterval: 1000 * 60 * 1,
    keepPreviousData: true,
  });
};
