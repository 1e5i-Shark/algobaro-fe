import { useEffect, useState } from 'react';

import { Spinner } from '@/components';
import { useRoomsList } from '@/hooks/Api/useRooms';
import usePageStore from '@/store/RoomsListStore/usePageStore';

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

  // 현재 페이지
  const { currentPage } = usePageStore();
  console.log('currentPage', currentPage);

  // Todo: 페이지를 클릭해서 변경하면 리렌더가 2번 일어남. 왜 그럴까?
  // isSuccess 추가?
  const { data, isLoading, refetch } = useRoomsList({
    page: currentPage,
    size: 4,
  });

  const content = data?.response.content;
  const totalPages = data?.response.totalPages;
  console.log('content', content);

  useEffect(() => {
    // 아래 코드는 get 요청으로 수정될 예정입니다.
    setRoomData(DUMMY_DATA);
  }, [currentPage]);

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* 상단 Nav */}
        <HomeNav />

        {/* // Todo: isLoading이면 페이지네이션 파트까지 같이 스피너로 처리 */}
        {isLoading ? (
          <S.HomeLoadingWrapper>
            <Spinner />
          </S.HomeLoadingWrapper>
        ) : (
          <>
            {/* 방 목록  */}
            {renderingData.length === 0 ? (
              <S.NoRoom>😢 방이 존재하지 않습니다.</S.NoRoom>
            ) : (
              <>
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

                {/* 페이지네이션 파트 */}
                <HomeFooter totalPages={totalPages || 0} />
              </>
            )}
          </>
        )}
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
