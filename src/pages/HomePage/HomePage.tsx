import { DUMMY_DATA } from './DummyData';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';

export default function HomePage() {
  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* 상단 Nav */}
        <HomeNav />

        {/* 방 목록  */}
        <S.HomeSectionContainer>
          {DUMMY_DATA.map(data => {
            return (
              <HomeSection
                key={data.id}
                {...data}
              />
            );
          })}
        </S.HomeSectionContainer>

        {/* 페이지네이션 파트 */}
        <S.HomeFooter>푸터</S.HomeFooter>
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
