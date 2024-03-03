import { Pagination, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { DUMMY_DATA, RoomDataProps } from './DummyData';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';
import useFilteredRoomData from './useFilterRoomData';

export default function HomePage() {
  const [roomData, setRoomData] = useState<RoomDataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 한 페이지당 표시할 항목의 수
  const roomPerPage = 4;
  // 필터링된 방 데이터
  const filteredRoomData = useFilteredRoomData(roomData);
  const renderingData = filteredRoomData || roomData;
  console.log(renderingData);
  const lastItem = currentPage * roomPerPage;
  const firstItem = lastItem - roomPerPage;
  const currentItems = renderingData.slice(firstItem, lastItem);
  // 전체 페이지 수 계산
  const pageCount =
    renderingData.length % roomPerPage === 0
      ? renderingData.length / roomPerPage
      : Math.floor(renderingData.length / roomPerPage) + 1;

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
        {currentItems.length === 0 ? (
          <S.NoRoom>검색하신 방이 존재하지 않습니다.</S.NoRoom>
        ) : (
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
        )}

        {/* <HomeFooter /> */}
        <S.FooterContainer>
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              size="large"
              color="primary"
            />
          </Stack>
        </S.FooterContainer>
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
