import 'aos/dist/aos.css';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AOS from 'aos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Button, Image, Spinner, ThemeModeToggleButton } from '@/components';
import LoginForm from '@/components/LoginForm/LoginForm';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import * as S from './WelcomePage.style';

export default function WelcomePage() {
  const { theme } = useCustomTheme();
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
  const moreDetailItems = [
    {
      imageUrl: '/assets/moreDetail/HomePage.webp',
      title: '선호하는 언어로 \n 함께 문제를 풀어보세요',
      description: [
        '맞춤형 방을 찾아 사람들과 함께 문제를 풀어보세요.',
        '검색 또는 필터링 기능을 통해 찾고 싶은 방을 \n쉽게 찾을 수 있어요.',
      ],
    },
    {
      imageUrl: '/assets/moreDetail/RoomPage.webp',
      title: '채팅을 통해 소통하고 \n함께 문제를 풀어보세요',
      description: [
        '동료들과 문제 풀이를 시작해 보세요.',
        '풀이할 문제와 제한 시간을 팀원들과 상의하고 \n방장이 정보를 수정해요.',
      ],
    },
    {
      imageUrl: '/assets/moreDetail/SolvePage.webp',
      title: '실제 시험 환경에서 \n 문제를 해결해 보세요.',
      description: [
        '실전 코딩 테스트와 유사한 환경에서 연습할 수 있어요!',
        '백준 문제 링크를 입력하면 문제가 표시되고 \n 테스트 케이스를 직접 입력하여 실행을 할 수 있어요.',
      ],
    },
    {
      imageUrl: '/assets/moreDetail/SharePage.webp',
      title: '코드를 공유하고 \n 새로운 해결 방법들을 \n 배워보세요',
      description: [
        '지식 공유는 발전의 원동력입니다. \n다른 참가자들의 풀이에서 영감을 얻어보세요.',
        '문제 해결 방법을 다른 참가자들과 공유하고 \n다양한 해결 방법을 배울 수 있습니다.',
      ],
    },
  ];
  // 홈으로 가기 버튼 동작에 대한 함수
  const goHome = () => {
    navigate(PATH.HOME);
  };

  // AccessToken이 있으면서 myInfo 데이터가 없으면 refetch
  if (accessToken && !myInfo) {
    refetch();
  }

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <S.WelcomePageWrapper>
      <S.MainContainer>
        <S.MainLeftContainer>
          <S.MainTitleContainer>
            <Image
              src="/assets/logo.png"
              alt="logo"
              height="6rem"
              priority={true}
            />
            <Image
              src={`/assets/logo-text-${theme.mode}.png`}
              alt="logo-text"
              height="3.5rem"
              priority={true}
            />
          </S.MainTitleContainer>
          <S.MainSubTitleText>바로바로 함께 푸는 알고리즘</S.MainSubTitleText>
          <S.MainSubList>
            {mainSubItems.map(item => {
              return <S.MainSubListItem key={v4()}>{item}</S.MainSubListItem>;
            })}
          </S.MainSubList>
        </S.MainLeftContainer>
        <S.MainRightContainer>
          {accessToken && (
            <>
              <S.UserNameContainer>
                {myNickName ? (
                  <>
                    <S.UserNickName>{myNickName}</S.UserNickName> 님
                  </>
                ) : (
                  <Spinner size="XXS" />
                )}
              </S.UserNameContainer>
              <Button onClick={goHome}>
                홈으로
                <ArrowForwardIosRoundedIcon />
              </Button>
            </>
          )}
        </S.MainRightContainer>
        <LoginForm width="25%" />
      </S.MainContainer>
      <S.MoreDetailContainer>
        <S.MoreDetailList>
          {/* ⭣ ⇩ ⬇ ⇣ ⇊ ⇂ ↡ ⤵ */}
          <S.MoreDetailTitle>
            AlgoBaro가 궁금하신가요?{'   '}
            <span
              style={{
                position: 'absolute',
                top: '2px',
                transform: 'translateX(10px)',
              }}
            >
              ⬇
            </span>
          </S.MoreDetailTitle>
          {moreDetailItems.map((item, index) => {
            return (
              <S.DetailItem
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                key={v4()}
              >
                <img src={item.imageUrl} />
                <S.DetailContents>
                  <S.DetailTitle>{item.title}</S.DetailTitle>
                  <S.DetailDescriptionList>
                    {item.description.map(description => {
                      return (
                        <S.DetailDescriptionItem key={v4()}>
                          {description}
                        </S.DetailDescriptionItem>
                      );
                    })}
                  </S.DetailDescriptionList>
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
