import { ChangeEvent } from 'react';

import { Pagination } from '@/components';
import usePageStore from '@/store/RoomsListStore/usePageStore';

import * as S from './HomeFooter.style';

interface HomeFooterProps {
  totalPages: number;
}

export default function HomeFooter({ totalPages }: HomeFooterProps) {
  const { currentPage, setCurrentPage } = usePageStore();

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  return (
    <S.FooterContainer>
      {/*  api에 맞춰, 1페이지의 경우 0으로 호출되기에 +1을 해줍니다. */}
      <Pagination
        count={totalPages} // 표시할 전체 페이지 수
        page={currentPage + 1} // 현재 페이지 위치
        onChange={handlePageChange}
      />
    </S.FooterContainer>
  );
}
