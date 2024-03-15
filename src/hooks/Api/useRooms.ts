import { useQuery } from '@tanstack/react-query';

import { ROOM_DETAIL, ROOMS_KEY } from '@/constants/queryKey';
import getRoomDetail from '@/services/Room/getRoomDetail';
import getRoomsList from '@/services/Room/getRoomsList';
import { RoomsRequestQuery } from '@/services/Room/type';

// 방 전체 리스트를 가져오는 hook
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
    keepPreviousData: true,
  });
};

// 방 상세 정보를 가져오는 hook
export const useRoomDetail = (roomShortUuid: string) => {
  return useQuery({
    queryKey: [ROOM_DETAIL, roomShortUuid],
    queryFn: () => getRoomDetail(roomShortUuid),
  });
};
