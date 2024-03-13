import { Spinner } from '@/components';
import { useRoomsList } from '@/hooks/Api/useRooms';
import useFilterStore from '@/store/RoomsListStore/useFilterStore';
import usePageStore from '@/store/RoomsListStore/usePageStore';
import { LanguagesType } from '@/types/room';

import HomeFooter from './HomeFooter/HomeFooter';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';

export default function HomePage() {
  // 현재 페이지
  const { currentPage } = usePageStore();
  // 필터 데이터
  const { searchTitle, selectedLanguage, selectedAccess, selectedStatus } =
    useFilterStore();

  const convertLanguageValueToKey = (value: string[]) => {
    const languageKey: { [key: string]: LanguagesType } = {
      Java: 'JAVA',
      파이썬: 'PYTHON',
      자바스크립트: 'JAVASCRIPT',
      'C++': 'C++',
    };

    return value.map(v => languageKey[v]);
  };

  // Todo: 언어 제대로 필터 안되는 현상 수정
  const languages = convertLanguageValueToKey(selectedLanguage).join(', ');
  const roomAccessType = selectedAccess === 'PRIVATE' ? 'PRIVATE' : undefined;
  const roomStatus = selectedStatus === 'RECRUITING' ? 'RECRUITING' : undefined;

  // Todo: 페이지를 클릭해서 변경하면 리렌더가 2번 일어남. 왜 그럴까?
  const { data, isLoading, refetch } = useRoomsList({
    page: currentPage,
    size: 4,
    searchTitle,
    languages,
    roomAccessType,
    roomStatus,
  });

  const content = data?.response.content;
  const totalPages = data?.response.totalPages;

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* // Todo: refetch 함수 넘기는 방법 */}
        {/* 상단 Nav */}
        <HomeNav refetch={refetch} />

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
