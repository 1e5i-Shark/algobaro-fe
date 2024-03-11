import { Pagination } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Tag } from '@/components';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useEditMyImage, useMyInfo } from '@/hooks/Api/useMembers';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import { problemHistoryResponse } from './problemHistoryResponse';
import * as S from './ProfilePage.style';

export default function ProfilePage() {
  const { theme } = useCustomTheme();

  const fileInput = useRef<HTMLInputElement>(null);
  const [avatarImage, setAvatarImage] = useState('');

  const { mutate: editMyImageMutate } = useEditMyImage();

  // 로그아웃 버튼 기능을 위한 로컬스토리지 AccessToken set 함수를 가져온다.
  const [, setAccessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);
  // 로그아웃 후 시작 페이지 이동을 위한 네비게이터 훅이다.
  const navigate = useNavigate();
  // 페이지네이션 상태 관리 함수이다.
  const [pageNum, setPageNum] = useState(0);
  const [isOpenEditInfoModal, setIsOpenEditInfoModal] = useState(false);
  const [isOpenEditPWModal, setIsOpenEditPWModal] = useState(false);
  // 내 정보 가져오는 쿼리를 호출한다.
  const { data: myInfoData } = useMyInfo();
  const myInfo = myInfoData?.response;

  const totalPageNum = problemHistoryResponse[0].totalPages;
  const totalHistoryNum = problemHistoryResponse[0].totalElements;

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    if (event) setPageNum(value - 1);
  };

  // 프로필 아바타를 클릭할 때 수정 input 이벤트를 동작시킨다.
  const handleClickAvatar = () => {
    fileInput.current?.click();
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const fileData = e.target.files?.[0];
    const fileUrl = fileData ? URL.createObjectURL(fileData) : '';

    // 파일 데이터가 있을 때만 요청하도록 가드를 설정한다.
    if (fileData) {
      formData.append('image', fileData);
      editMyImageMutate(formData);
      setAvatarImage(fileUrl);
    }
  };

  // 로그아웃 버튼 클릭 이벤트 핸들러 함수
  const handleClickLogOut = () => {
    setAccessToken('');
    navigate(PATH.ROOT);
  };

  // 정보 수정 버튼 클릭 이벤트 핸들러 함수
  const handleClickEditInfoBtn = () => {
    setIsOpenEditInfoModal(true);
  };
  const handleCloseEditInfoModal = () => {
    setIsOpenEditInfoModal(false);
  };
  // 암호 변경 버튼 클릭 이벤트 핸들러 함수
  const handleClickEditPWBtn = () => {
    setIsOpenEditPWModal(true);
  };
  const handleCloseEditPWModal = () => {
    setIsOpenEditPWModal(false);
  };

  return (
    <S.ProfilePageWrapper>
      {/* 유저 정보 컨테이너 */}
      <S.UserInfoContainer>
        <S.UserAvatarContainer>
          <S.AvatarInput
            name="avatarImage"
            type="file"
            id="avatarImage"
            ref={fileInput}
            onChange={handleChangeAvatar}
            accept="image/png, image/jpg, image/jpeg"
          />
          <Avatar
            size="L"
            isEdit
            onClick={handleClickAvatar}
            src={myInfo?.profileImage || avatarImage}
          />
        </S.UserAvatarContainer>
        <S.UserInfoTextContainer>
          <S.UserName>{myInfo ? myInfo.nickname : ''}</S.UserName>
          <S.UserEmail>{myInfo ? myInfo.email : ''}</S.UserEmail>
        </S.UserInfoTextContainer>
        <S.UserInfoButtonContainer>
          <Button
            onClick={handleClickEditInfoBtn}
            backgroundColor={theme.color.gray_20}
          >
            정보 수정
          </Button>
          <Button
            onClick={handleClickEditPWBtn}
            backgroundColor={theme.color.gray_20}
          >
            암호 변경
          </Button>
          <Button onClick={handleClickLogOut}>로그아웃</Button>
        </S.UserInfoButtonContainer>
      </S.UserInfoContainer>
      {/* 내가 푼 문제 */}
      <S.MySolveTextContainer>
        <p>내가 푼 문제</p>
        <p>{totalHistoryNum}</p>
      </S.MySolveTextContainer>
      {/* 풀이 히스토리 컨테이너 */}
      {/* TODO: 히스토리 하나도 없는 빈 히스토리 컨테이너 추가 */}
      <div>
        <p>풀이 히스토리</p>
        <ul>
          {problemHistoryResponse[pageNum].content.map(problem => {
            return (
              <li key={problem.id}>
                {/* TODO: 응답에 문제 링크 추가되면 변경 */}
                <p>{problem.roomUuid}</p>
                <Tag
                  mode="normal"
                  tagId={problem.language || 'null'}
                  backgroundColor={theme.color.gray_20}
                  textColor={theme.color.black_primary}
                >
                  {problem.language}
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
      <Pagination
        count={totalPageNum} // 표시할 페이지네이션 페이지 수
        page={pageNum + 1} // 현재 페이지 위치
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
      <S.EditInfoModal
        isOpen={isOpenEditInfoModal}
        onClose={handleCloseEditInfoModal}
        width="60%"
        height="60%"
      />
      <S.EditPWModal
        isOpen={isOpenEditPWModal}
        onClose={handleCloseEditPWModal}
        width="60%"
        height="60%"
      />
    </S.ProfilePageWrapper>
  );
}
