import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Avatar, Button, Image, ThemeModeToggleButton } from '@/components';
import LoginForm from '@/components/LoginForm/LoginForm';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import * as S from './WelcomePage.style';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { data: myInfo, refetch, isStale } = useMyInfo();
  const [accessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);
  // 유저 닉네임 쿼리 호출 업데이트
  const myNickName = myInfo?.response.nickname;

  // Todo: 아이콘 정하기
  const mainSubItems = [
    '⏲ 시간 및 공간 비용 최소화',
    '⌨️ 실전 대비를 위한 모의 코딩테스트',
    '💬 코드 풀이 공유 스터디',
  ];
  const moreDetailItems = [
    {
      imageUrl: '',
      title: '설명 1',
      description: '설명 1 부가 설명',
    },
    {
      imageUrl: '',
      title: '설명 2',
      description: '설명 2 부가 설명',
    },
    {
      imageUrl: '',
      title: '설명 3',
      description: '설명 3 부가 설명',
    },
  ];
  // 홈으로 가기 버튼 동작에 대한 함수
  const goHome = () => {
    navigate(PATH.HOME);
  };

  // 수현 의견: App.tsx에서 요 코드를 선언해서 진입 초기에 1번은 refetch를 하고 전역 상태에 저장하기
  // 커피챗에서 첫 마운트 시에만 useQuery를 실행하기 위해서는 어떻게 해야 할까 여쭤보기
  // 로그인했을 경우 사용자의 닉네임을 가져온다.
  // Todo: 수영님 useMeStore에 데이터 연동하기

  // isStale : 캐시된 데이터가 유효한지 refetch가 필요한지 여부를 확인
  // 액세스 토큰이 있는데 캐시된 데이터의 업데이트가 필요하다면 retech한다.
  if (accessToken && isStale) {
    refetch();
  }

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
        <S.MainRightContainer style={{ width: `${myNickName ? '25%' : ''}` }}>
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
        <S.MoreDetailList>
          {moreDetailItems.map(item => {
            return (
              <S.DetailItem key={v4()}>
                <Image
                  width="30rem"
                  height="100%"
                  src={item.imageUrl}
                />
                <S.DetailContents>
                  <S.DetailTitle>{item.title}</S.DetailTitle>
                  <S.DetailDescription>{item.description}</S.DetailDescription>
                </S.DetailContents>
              </S.DetailItem>
            );
          })}
        </S.MoreDetailList>
      </S.MoreDetailContainer>
      <S.DarkModeButtonContainer>
        <ThemeModeToggleButton></ThemeModeToggleButton>
      </S.DarkModeButtonContainer>
    </S.WelcomePageWrapper>
  );
}
