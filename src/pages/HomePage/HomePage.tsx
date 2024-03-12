import { useEffect, useState } from 'react';

import { useRoomsList } from '@/hooks/Api/useRooms';

import { DUMMY_DATA, RoomDataProps } from './DummyData';
import HomeFooter from './HomeFooter/HomeFooter';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';
import useFilteredRoomData from './useFilterRoomData';

export default function HomePage() {
  const [roomData, setRoomData] = useState<RoomDataProps[]>([]);
  const filteredRoomData = useFilteredRoomData(roomData);
  const renderingData = filteredRoomData || roomData;

  const { data, isLoading, refetch } = useRoomsList({
    // api에 맞춰, 1페이지의 경우 0으로 호출해야 합니다.
    page: 0,
    size: 4,
  });

  console.log('get 요청 보낸 data : ', data);

  useEffect(() => {
    // 아래 코드는 get 요청으로 수정될 예정입니다.
    setRoomData(DUMMY_DATA);
  }, []);

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* 상단 Nav */}
        <HomeNav />

        {/* 방 목록  */}
        {renderingData.length === 0 ? (
          <S.NoRoom>검색하신 방이 존재하지 않습니다.</S.NoRoom>
        ) : (
          <S.HomeSectionContainer>
            {renderingData.map(data => {
              return (
                <HomeSection
                  key={data.id}
                  {...data}
                />
              );
            })}
          </S.HomeSectionContainer>
        )}

        {/* 페이지네이션 파트 */}
        <HomeFooter />
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
