import { Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';

import { Avatar, Button, Tag } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import { problemHistory } from './problemHistory';
import * as S from './ProfilePage.style';

export default function ProfilePage() {
  const { theme } = useCustomTheme();
  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    if (event) setPageNum(value);
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
          <S.UserName>알고나</S.UserName>
          <S.UserEmail>algo@gmail.com</S.UserEmail>
        </S.UserInfoTextContainer>
        <S.UserInfoButtonContainer>
          <Button backgroundColor={theme.color.gray_20}>수정</Button>
          <Button>로그아웃</Button>
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
    </S.ProfilePageWrapper>
  );
}
