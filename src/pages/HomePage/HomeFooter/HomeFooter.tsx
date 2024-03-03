import { Pagination, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './HomeFooter.style';

interface HomeFooterProps {
  pageCount: number;
  currentPage: number;
  handlePageChange: (_: ChangeEvent<unknown>, page: number) => void;
}

export default function HomeFooter({
  pageCount,
  currentPage,
  handlePageChange,
}: HomeFooterProps) {
  const { theme } = useCustomTheme();

  return (
    <S.FooterContainer>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          size="large"
          color="primary"
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
      </Stack>
    </S.FooterContainer>
  );
}
