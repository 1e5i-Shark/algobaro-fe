import { Pagination as MuiPagination, PaginationProps } from '@mui/material';

import { useCustomTheme } from '@/hooks/useCustomTheme';

interface CustomPaginationProps extends PaginationProps {
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
  textSize?: string;
  arrowSize?: string;
  selectedBgColor?: string;
  selectedTextColor?: string;
}

/**
 * MUI Pagination 컴포넌트를 커스텀 사용하기 편하도록 만든 공통 컴포넌트
 * @param {'small' | 'medium' | 'large'} size Pagination 컴포넌트 전체 사이즈, 기본값 `'large'`
 * @param {string} textColor 페이지 번호 텍스트 색깔, 기본값 `theme.color.text_primary_color`
 * @param {string} textSize 페이지 번호 텍스트 크기, 기본값 `theme.size.M`
 * @param {string} arrowSize 화살표 아이콘 크기, 기본값 `theme.size.L`
 * @param {string} selectedBgColor 선택된 페이지 아이콘 배경 색, 기본값 `theme.color.secondary_color`
 * @param {string} selectedTextColor 선택된 페이지 번호 색, 기본값 `theme.color.background_primary`
 * @returns
 */
export default function Pagination({
  size = 'large',
  textColor,
  textSize,
  arrowSize,
  selectedBgColor,
  selectedTextColor,
  ...props
}: CustomPaginationProps) {
  const { theme } = useCustomTheme();
  return (
    <>
      <MuiPagination
        // 설정 기본값
        defaultPage={1} // 페이지 기본 위치
        siblingCount={1} // 현재 페이지 기준 양쪽 표시할 페이지 수
        boundaryCount={0} // 시작 끝에 표시할 페이지 수
        showFirstButton // 시작페이지 이동 버튼 표시 여부
        showLastButton // 끝페이지 이동 버튼 표시 여부
        size={size} // Pagination 컴포넌트 전체 사이즈
        sx={{
          //
          '& .MuiPaginationItem-root': {
            color: textColor || theme.color.text_primary_color,
            fontSize: textSize || theme.size.M,

            '& .MuiSvgIcon-root': {
              fontSize: arrowSize || theme.size.L,
            },
            '&.Mui-selected': {
              backgroundColor: selectedBgColor || theme.color.secondary_color,
              color: selectedTextColor || theme.color.background_primary,
            },
          },
        }}
        {...props}
      />
    </>
  );
}
