import { v4 } from 'uuid';

import { Avatar, ThemeModeToggleButton } from '@/components';
import LoginForm from '@/components/LoginForm/LoginForm';

import * as S from './WelcomePage.style';

export default function WelcomePage() {
  // Todo: 아이콘 정하기
  const mainSubItems = [
    '⏲ 시간 및 공간 비용 최소화',
    '⌨️ 실전 대비를 위한 모의 코딩테스트',
    '💬 코드 풀이 공유 스터디',
  ];

  return (
    <S.WelcomePageWrapper>
      <S.MainContainer>
        <S.MainLeftContainer>
          {/* 메인 컨테이너 로고 + 알고바로 */}
          <S.MainTitleContainer>
            {/* Todo: 로고 아이콘 넣기 */}
            <Avatar size="L" />
            <S.MainTitleText>AlgoBaro</S.MainTitleText>
          </S.MainTitleContainer>
          <S.MainSubTitleText>바로바로 함께 푸는 알고리즘</S.MainSubTitleText>
          <S.MainSubList>
            {mainSubItems.map(item => {
              return <S.MainSubListItem key={v4()}>{item}</S.MainSubListItem>;
            })}
          </S.MainSubList>
        </S.MainLeftContainer>
        <LoginForm width="25%" />
      </S.MainContainer>
      <S.MoreDetailContainer>
        <S.MoreDetailTitle>AlgoBaro가 궁금하신가요?</S.MoreDetailTitle>
      </S.MoreDetailContainer>
      <S.DarkModeButtonContainer>
        <ThemeModeToggleButton></ThemeModeToggleButton>
      </S.DarkModeButtonContainer>
    </S.WelcomePageWrapper>
  );
}
