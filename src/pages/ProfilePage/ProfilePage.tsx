import { Pagination } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Spinner, Tag } from '@/components';
import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { useEditMyImage, useMyInfo } from '@/hooks/Api/useMembers';
import { useSolvedHistoryList } from '@/hooks/Api/useSolves';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PATH } from '@/routes/path';

import * as S from './ProfilePage.style';

export default function ProfilePage() {
  const { theme } = useCustomTheme();

  // 로그아웃 버튼 기능을 위한 로컬스토리지 AccessToken set 함수를 가져온다.
  const [, setAccessToken] = useLocalStorage(LOCAL_ACCESSTOKEN);
  // 로그아웃 후 시작 페이지 이동을 위한 네비게이터 훅
  const navigate = useNavigate();

  // 아바타 이미지 변경을 위한 input ref와 avatarImage state이다.
  const fileInput = useRef<HTMLInputElement>(null);
  const [avatarImage, setAvatarImage] = useState('');

  // 정보 및 암호 변경 모달 open state이다.
  const [isOpenEditInfoModal, setIsOpenEditInfoModal] = useState(false);
  const [isOpenEditPWModal, setIsOpenEditPWModal] = useState(false);

  // 페이지네이션 상태 관리 함수
  const [pageNum, setPageNum] = useState(0);

  // 내 정보 가져오는 useQuery 훅
  const { data: myInfoData } = useMyInfo();
  const myInfo = myInfoData?.response;

  // 풀이 히스토리를 가져오는 useQuery 훅
  // 한 페이지에 4개의 히스토리를 가져온다.
  const {
    data: solvedHistoryData,
    isLoading,
    refetch: fetchSolvedHistory,
  } = useSolvedHistoryList({
    page: pageNum,
    size: 4,
  });

  const solvedHistoryRes = solvedHistoryData?.response;
  // 풀이 히스토리 리스트 데이터
  const solvedHistoryList = solvedHistoryRes?.content;
  // 전체 페이지 수
  const totalPageNum = solvedHistoryRes?.totalPages;
  // 전체 히스토리 데이터 수
  const totalHistoryNum = solvedHistoryRes?.totalElements;
  // 프로필 이미지 변경하는 API useMutation 훅
  const { mutate: editMyImageMutate } = useEditMyImage();

  // 페이지 번호를 클릭하여 변경하는 이벤트 핸들러 함수
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    if (event) setPageNum(value - 1);
  };

  // 프로필 아바타를 클릭할 때 수정 input 이벤트를 동작시킨다.
  const handleClickAvatar = () => {
    fileInput.current?.click();
  };

  // 사용자가 프로필 이미지를 선택하여 변경하면 API로 formData를 전송한다.
  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const fileData = e.target.files?.[0];
    const fileUrl = fileData ? URL.createObjectURL(fileData) : '';
    const fileSize = fileData?.size || 0;
    const limitSize = 1024 ** 2 * 5; // 5MB 용량 제한

    // 용량 제한 경고를 표시한다.
    if (fileSize >= limitSize) alert('5MB 이하 이미지만 업로드 가능합니다!');

    // 5MB 이하 파일 데이터일 때만 요청하도록 가드를 설정한다.
    if (fileData && fileSize <= limitSize) {
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

  // 페이지 번호가 바뀌면 문제 히스토리를 refetch 한다.
  useEffect(() => {
    fetchSolvedHistory();
  }, [pageNum]);

  return (
    <S.ProfilePageWrapper>
      {/* 유저 정보 컨테이너 */}
      <S.UserInfoContainer>
        {/* 아바타 프로필 사진 */}
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
        {/* 닉네임, 이메일 */}
        <S.UserInfoTextContainer>
          <S.UserName>{myInfo ? myInfo.nickname : ''}</S.UserName>
          <S.UserEmail>
            <S.UserInfoTitle>Email.</S.UserInfoTitle>
            {myInfo ? myInfo.email : ''}
          </S.UserEmail>
          <S.UserBojId>
            <S.UserInfoTitle>BOJ ID.</S.UserInfoTitle>

            {myInfo ? myInfo.bojId : ''}
          </S.UserBojId>
        </S.UserInfoTextContainer>
        {/* 정보, 암호 수정 및 로그아웃 버튼 */}
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
        <S.MySolveTitle>내가 푼 문제</S.MySolveTitle>
        <S.MySolveText>{totalHistoryNum}</S.MySolveText>
      </S.MySolveTextContainer>
      {/* 풀이 히스토리 컨테이너 */}
      <S.ProblemHistoryContainer>
        <S.ProblemHistoryTitle>풀이 히스토리</S.ProblemHistoryTitle>
        <S.ProblemHistoryListContainer>
          {isLoading ? (
            <Spinner />
          ) : solvedHistoryList?.length !== 0 ? (
            <>
              {solvedHistoryList?.map(problem => {
                return (
                  <S.ProblemHistoryItem key={problem.id}>
                    <S.ProblemLink>
                      {problem.problemLink.replace(
                        'https://www.acmicpc.net/problem/',
                        ''
                      )}
                    </S.ProblemLink>
                    <Tag
                      mode="normal"
                      width="7rem"
                      height={theme.size.L}
                      fontSize={theme.size.S}
                      tagId={problem.solveStatus || 'null'}
                      backgroundColor={
                        problem.solveStatus === 'SUCCESS'
                          ? theme.color.green
                          : theme.color.red
                      }
                      textColor={theme.color.black_primary}
                      style={{
                        fontWeight: theme.fontWeight.semiBold,
                      }}
                    >
                      {problem.solveStatus}
                    </Tag>
                    <Tag
                      mode="normal"
                      width="7rem"
                      height={theme.size.L}
                      fontSize={theme.size.S}
                      tagId={problem.language || 'null'}
                      backgroundColor={theme.color.gray_20}
                      textColor={theme.color.black_primary}
                      style={{
                        fontWeight: theme.fontWeight.semiBold,
                      }}
                    >
                      {problem.language}
                    </Tag>
                  </S.ProblemHistoryItem>
                );
              })}
            </>
          ) : (
            <div>터엉</div>
          )}
        </S.ProblemHistoryListContainer>
        {/* 페이지네이션 영역 */}
        <Pagination
          count={totalPageNum} // 표시할 페이지네이션 페이지 수
          // TODO: Merge 시 삭제
          // count={5} // 빈 페이지 테스트용 코드
          page={pageNum + 1} // 현재 페이지 위치
          siblingCount={1} // 현재 페이지 기준 양쪽 몇 개 표시
          boundaryCount={0}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          size="medium" //
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
      </S.ProblemHistoryContainer>
      {/* 정보 수정 모달 */}
      <S.EditInfoModal
        isOpen={isOpenEditInfoModal}
        onClose={handleCloseEditInfoModal}
        width="60%"
        height="60%"
      />
      {/* 암호 변경 모달 */}
      <S.EditPWModal
        isOpen={isOpenEditPWModal}
        onClose={handleCloseEditPWModal}
        width="60%"
        height="60%"
      />
    </S.ProfilePageWrapper>
  );
}
