import { Spinner } from '@/components';
import { useRoomsList } from '@/hooks/Api/useRooms';
import usePageStore from '@/store/RoomsListStore/usePageStore';

import HomeFooter from './HomeFooter/HomeFooter';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';
// import useFilteredRoomData from './useFilterRoomData';

export default function HomePage() {
  // const filteredRoomData = useFilteredRoomData(roomData);

  // 현재 페이지
  const { currentPage } = usePageStore();
  // 필터 데이터

  // Todo: 페이지를 클릭해서 변경하면 리렌더가 2번 일어남. 왜 그럴까?
  const { data, isLoading } = useRoomsList({
    page: currentPage,
    size: 4,
  });

  const content = data?.response.content;
  const totalPages = data?.response.totalPages;
  // console.log('content', content);

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* // Todo: 필터 기능 손보기 */}
        {/* 상단 Nav */}
        <HomeNav />

        {isLoading ? (
          <S.HomeLoadingWrapper>
            <Spinner />
          </S.HomeLoadingWrapper>
        ) : (
          <>
            {/* 방 목록  */}
            {totalPages === 0 ? (
              <S.NoRoom>😢 방이 존재하지 않습니다.</S.NoRoom>
            ) : (
              <>
                <S.HomeSectionContainer>
                  {content?.map(data => {
                    return (
                      <HomeSection
                        key={data.roomId}
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
