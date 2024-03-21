import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Button, Image, ThemeModeToggleButton } from '@/components';
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
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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
  // isStale을 사용해보려고 했으나 main.tsx에서 전역적으로 1분 staleTime이 있어 다시 원복
  // Todo: 수영님 useMeStore에 데이터 연동하기.
  if (accessToken && !myInfo) {
    refetch();
  }

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('invisible');
      } else {
        entry.target.classList.add('invisible');
        entry.target.classList.remove('visible');
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });

    // 모든 ref에 대해 observer를 연결
    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
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
              src="/assets/logo-text.png"
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
        {accessToken && myNickName && (
          <S.MainRightContainer style={{ width: `${myNickName ? '25%' : ''}` }}>
            <>
              <S.UserNameContainer>
                <S.UserNickName>{myNickName}</S.UserNickName> 님
              </S.UserNameContainer>
              <Button onClick={goHome}>
                홈으로
                <ArrowForwardIosRoundedIcon />
              </Button>
            </>
          </S.MainRightContainer>
        )}
        <LoginForm width="25%" />
      </S.MainContainer>
      <S.MoreDetailContainer>
        <S.MoreDetailTitle>AlgoBaro가 궁금하신가요?</S.MoreDetailTitle>
        <S.MoreDetailList>
          {moreDetailItems.map((item, index) => {
            return (
              <S.DetailItem
                key={v4()}
                ref={el => (itemRefs.current[index] = el)}
              >
                <Image
                  width="54rem"
                  height="36rem"
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
