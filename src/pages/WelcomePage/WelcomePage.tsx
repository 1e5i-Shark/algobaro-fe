import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Avatar, Button, ThemeModeToggleButton } from '@/components';
import LoginForm from '@/components/LoginForm/LoginForm';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import * as S from './WelcomePage.style';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { data: myInfo, refetch } = useMyInfo();
  const [accessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);
  // 유저 닉네임 쿼리 호출 업데이트
  const myNickName = myInfo?.response.nickname;

  // Todo: 아이콘 정하기
  const mainSubItems = [
    '⏲ 시간 및 공간 비용 최소화',
    '⌨️ 실전 대비를 위한 모의 코딩테스트',
    '💬 코드 풀이 공유 스터디',
  ];
  // 홈으로 가기 버튼 동작에 대한 함수
  const goHome = () => {
    navigate(PATH.HOME);
  };

  useEffect(() => {
    // 로그인했을 경우 사용자의 닉네임을 가져온다.
    accessToken && refetch();
  }, []);

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
        <S.MainRightContainer>
          {myNickName ? (
            <>
              <S.UserNameContainer>
                <S.UserNickName>{myNickName}</S.UserNickName> 님
              </S.UserNameContainer>
              <Button onClick={goHome}>
                홈으로
                <ArrowForwardIosRoundedIcon />
              </Button>
            </>
          ) : null}
        </S.MainRightContainer>
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
