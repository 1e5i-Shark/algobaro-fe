import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY, ROOM_DETAIL, ROOMS_KEY } from '@/constants/queryKey';
import getRoomDetail from '@/services/Room/getRoomDetail';
import getRoomsList from '@/services/Room/getRoomsList';
import { getUuidRoom } from '@/services/Room/Room';
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
    enabled: true,
    // 1분마다 새로고침
    refetchInterval: 1000 * 60 * 1,
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

export const useGetUuidRoom = (roomShortUuid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.UUID_INFO, roomShortUuid],
    queryFn: async () => await getUuidRoom(`/${roomShortUuid}`),
    enabled: !!roomShortUuid,
    refetchInterval: 2000,
  });
};

export const useGetRoomMembers = (roomShortUuid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.UUID_INFO, roomShortUuid],
    queryFn: () => getUuidRoom(`/${roomShortUuid}`),
    enabled: !!roomShortUuid,
    select: data => data?.response?.roomMembers,
  });
};
