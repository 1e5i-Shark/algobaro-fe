import { ChangeEvent, useState } from 'react';

import { RoomDataProps } from './DummyData';

interface usePaginationProps {
  filteredData: RoomDataProps[];
  itemPerPage?: number;
}

const usePagination = ({
  filteredData,
  itemPerPage = 4, // 한 페이지당 표시될 방의 갯수
}: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링된 방 데이터
  const lastItem = currentPage * itemPerPage;
  const firstItem = lastItem - itemPerPage;
  const currentItems = filteredData.slice(firstItem, lastItem);
  // 전체 페이지 수 계산
  const pageCount =
    filteredData.length % itemPerPage === 0
      ? filteredData.length / itemPerPage
      : Math.floor(filteredData.length / itemPerPage) + 1;

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return {
    currentItems,
    pageCount,
    currentPage,
    handlePageChange,
  };
};

export default usePagination;
