import { useEffect, useState } from 'react';

import useRoomFilterStore from '@/store/useRoomFilterStore';

import { DUMMY_DATA, RoomDataProps } from './DummyData';
import HomeNav from './HomeNav/HomeNav';
import * as S from './HomePage.style';
import HomeSection from './HomeSection/HomeSection';

export default function HomePage() {
  const [roomData, setRoomData] = useState<RoomDataProps[]>([]);
  const [filteredData, setFilteredData] = useState<RoomDataProps[]>([]);
  const { searchInputValue, selectedLanguage, selectedAccess, selectedStatus } =
    useRoomFilterStore();

  const hasOption =
    searchInputValue ||
    !!selectedLanguage.length ||
    selectedAccess ||
    selectedStatus;

  // console.log(
  //   searchInputValue,
  //   !!selectedLanguage.length,
  //   selectedAccess,
  //   selectedStatus
  // );
  // console.log('filteredData : ', filteredData);

  const filterData = () => {
    let dataToFilter = roomData;
    if (searchInputValue) {
      setFilteredData(
        filteredData.filter(data =>
          data.title
            .toLowerCase()
            .includes(searchInputValue.toLowerCase().trim())
        )
      );
    }
    if (!!selectedLanguage.length) {
      dataToFilter = dataToFilter.filter(data =>
        selectedLanguage.every(lang => data.language.includes(lang))
      );
    }
    if (selectedAccess) {
      dataToFilter = dataToFilter.filter(
        data => data.roomAccess === selectedAccess
      );
    }
    if (selectedStatus) {
      dataToFilter = dataToFilter.filter(data => data.roomStatus === '대기중');
    }
    setFilteredData(dataToFilter);
  };

  useEffect(() => {
    if (!hasOption) {
      // 아래 코드는 get 요청으로 수정될 예정입니다.
      setRoomData(DUMMY_DATA);
      return;
    }

    filterData();
  }, [
    hasOption,
    searchInputValue,
    selectedLanguage.length,
    selectedAccess,
    selectedStatus,
  ]);

  return (
    <S.HomePageContainer>
      <S.HomePageWrapper>
        {/* 상단 Nav */}
        <HomeNav />

        {/* 방 목록  */}
        <S.HomeSectionContainer>
          {(!hasOption ? roomData : filteredData).map(data => {
            return (
              <HomeSection
                key={data.id}
                {...data}
              />
            );
          })}
        </S.HomeSectionContainer>

        {/* 페이지네이션 파트 */}
        <S.HomeFooter>푸터</S.HomeFooter>
      </S.HomePageWrapper>
    </S.HomePageContainer>
  );
}
