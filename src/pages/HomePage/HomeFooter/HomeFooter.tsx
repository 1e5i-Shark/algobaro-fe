import { Pagination, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

import * as S from './HomeFooter.style';

interface HomeFooterProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (_: ChangeEvent<unknown>, page: number) => void;
}

export default function HomeFooter({
  pageCount,
  currentPage,
  onPageChange,
}: HomeFooterProps) {
  return (
    <S.FooterContainer>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={onPageChange}
          showFirstButton
          showLastButton
          size="large"
          color="primary"
        />
      </Stack>
    </S.FooterContainer>
  );
}
