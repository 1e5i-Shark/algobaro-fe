import { Pagination, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

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
        />
      </Stack>
    </S.FooterContainer>
  );
}
