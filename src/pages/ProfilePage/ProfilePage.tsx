import { Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Tag } from '@/components';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import { problemHistory } from './problemHistory';
import * as S from './ProfilePage.style';

export default function ProfilePage() {
  const { theme } = useCustomTheme();
  // 로그아웃 버튼 기능을 위한 로컬스토리지 AccessToken set 함수를 가져온다.
  const [, setAccessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);
  // 로그아웃 후 시작 페이지 이동을 위한 네비게이터 훅이다.
  const navigate = useNavigate();
  // 페이지네이션 상태 관리 함수이다.
  const [pageNum, setPageNum] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // 내 정보 가져오는 쿼리를 호출한다.
  const { data: myInfoData } = useMyInfo();
  const myInfo = myInfoData?.response;

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    if (event) setPageNum(value);
  };
  // 로그아웃 버튼 클릭 이벤트 핸들러 함수이다.
  const handleClickLogOut = () => {
    setAccessToken('');
    navigate(PATH.ROOT);
  };

  const handleClickEditBtn = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <S.ProfilePageWrapper>
      {/* 유저 정보 컨테이너 */}
      <S.UserInfoContainer>
        <S.UserAvatarContainer>
          <Avatar
            size="L"
            isEdit
          />
        </S.UserAvatarContainer>
        <S.UserInfoTextContainer>
          <S.UserName>{myInfo ? myInfo.nickname : ''}</S.UserName>
          <S.UserEmail>{myInfo ? myInfo.email : ''}</S.UserEmail>
        </S.UserInfoTextContainer>
        <S.UserInfoButtonContainer>
          <Button
            onClick={handleClickEditBtn}
            backgroundColor={theme.color.gray_20}
          >
            수정
          </Button>
          <Button onClick={handleClickLogOut}>로그아웃</Button>
        </S.UserInfoButtonContainer>
      </S.UserInfoContainer>
      {/* 내가 푼 문제 */}
      <S.MySolveTextContainer>
        <p>내가 푼 문제</p>
        <p>11</p>
      </S.MySolveTextContainer>
      {/* 풀이 히스토리 컨테이너 */}
      <div>
        <p>풀이 히스토리</p>
        <ul>
          {problemHistory.map(problem => {
            return (
              <li key={problem.id}>
                <p>{problem.title}</p>
                <Tag
                  mode="normal"
                  tagId={problem.languageId}
                  backgroundColor={theme.color.gray_20}
                >
                  {problem.language}
                </Tag>
              </li>
            );
          })}
        </ul>
        <Pagination
          count={10} // 표시할 페이지네이션 페이지 수
          page={pageNum} // 현재 페이지 위치
          siblingCount={1} // 현재 페이지 기준 양쪽 몇 개 표시
          boundaryCount={0}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          size="large" //
          color="secondary" //
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme.color.text_primary_color,
              fontSize: theme.size.M,

              '& .MuiSvgIcon-root': {
                fontSize: theme.size.L,
              },
              '&.Mui-selected': {
                backgroundColor: theme.color.secondary_color,
                color: theme.color.background_primary,
              },
            },
          }}
        />
      </div>
      <S.EditModal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        width="60%"
        height="60%"
      />
    </S.ProfilePageWrapper>
  );
}
