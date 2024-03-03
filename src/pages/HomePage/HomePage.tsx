import { ChangeEvent, useEffect, useState } from 'react';

import { DUMMY_DATA, RoomDataProps } from './DummyData';
import HomeFooter from './HomeFooter/HomeFooter';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';
import useFilteredRoomData from './useFilterRoomData';

export default function HomePage() {
  const [roomData, setRoomData] = useState<RoomDataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 한 페이지당 표시할 항목의 수
  const ROOM_PER_PAGE = 4;

  // 필터링된 방 데이터
  const filteredData = useFilteredRoomData(roomData);
  const lastItem = currentPage * ROOM_PER_PAGE;
  const firstItem = lastItem - ROOM_PER_PAGE;
  const currentItems = filteredData.slice(firstItem, lastItem);
  // 전체 페이지 수 계산
  const pageCount =
    filteredData.length % ROOM_PER_PAGE === 0
      ? filteredData.length / ROOM_PER_PAGE
      : Math.floor(filteredData.length / ROOM_PER_PAGE) + 1;

  useEffect(() => {
    // 아래 코드는 get 요청으로 수정될 예정입니다.
    setRoomData(DUMMY_DATA);
  }, []);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* 상단 Nav */}
        <HomeNav />

        {/* 방 목록  */}
        {/* react-query 사용하여 isLoading으로 로딩 상태 표시 함으로써, 첫 화면 진입때 NoRoom 화면이 잠깐 보이는 것을 방지하게끔 화면을 수정.  */}
        {/* 혹은 useEffect를 useLayoutEffect로 수정하는 것도 고려 중 */}
        {currentItems.length ? (
          <S.HomeSectionContainer>
            {currentItems.map(data => {
              return (
                <HomeSection
                  key={data.id}
                  {...data}
                />
              );
            })}
          </S.HomeSectionContainer>
        ) : (
          <S.NoRoom>검색하신 방이 존재하지 않습니다.</S.NoRoom>
        )}

        {/* 하단 페이지 */}
        <HomeFooter
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
