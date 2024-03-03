import { useMemo } from 'react';

import useRoomFilterStore from '@/store/useRoomFilterStore';

import { RoomDataProps } from './DummyData';

const useFilteredRoomData = (roomData: RoomDataProps[]) => {
  const { searchInputValue, selectedLanguage, selectedAccess, selectedStatus } =
    useRoomFilterStore();

  return useMemo(() => {
    if (!roomData.length) {
      return;
    }

    let filteredData = roomData;

    if (searchInputValue) {
      filteredData = filteredData.filter(data =>
        data.title.toLowerCase().includes(searchInputValue.toLowerCase().trim())
      );
    }
    if (selectedLanguage.length > 0) {
      filteredData = filteredData.filter(data =>
        selectedLanguage.every(lang => data.language.includes(lang))
      );
    }
    if (selectedAccess) {
      filteredData = filteredData.filter(
        data => data.roomAccess === selectedAccess
      );
    }
    if (selectedStatus) {
      filteredData = filteredData.filter(data => data.roomStatus === '대기중');
    }

    return filteredData;
  }, [
    roomData,
    searchInputValue,
    selectedLanguage,
    selectedAccess,
    selectedStatus,
  ]);
};

export default useFilteredRoomData;
