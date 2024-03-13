import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CheckBox, Icon, MultiDropDown } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { PATH } from '@/routes/path';
import useRoomFilterStore from '@/store/RoomsListStore/useFilterStore';

import { DummyDataSet } from '../DummyData/DummyData';
import * as S from './HomeNav.style';

export default function HomeNav() {
  const latestUpdate = '1분전';
  const { theme } = useCustomTheme();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const {
    selectedAccess,
    selectedStatus,
    setSearchInputValue,
    setSelectedLanguage,
    setSelectedAccess,
    setSelectedStatus,
  } = useRoomFilterStore();

  const handleCreateRoom = () => {
    navigate(PATH.CREATEROOM);
  };

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    setSearchInputValue(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Input 내부가 빈 문자열일 경우, 초기화
    if (value.trim() === '') {
      setInputValue('');
      setSearchInputValue('');
      return;
    }

    setInputValue(value);
  };

  return (
    <S.NavContainer>
      <Button onClick={handleCreateRoom}>방 만들기</Button>

      <S.SearchOptionsContainer>
        <MultiDropDown
          dataId="search-code-language"
          dataSet={DummyDataSet}
          labelId="search-code-language-label"
          labelName="언어"
          fontSize={theme.size.M}
          width="13.3rem"
          onSelected={setSelectedLanguage}
        />

        <CheckBox
          label="공개방"
          checked={selectedAccess}
          onChange={() => setSelectedAccess(!selectedAccess)}
        />

        <CheckBox
          label="입장 가능"
          checked={selectedStatus}
          onChange={() => setSelectedStatus(!selectedStatus)}
        />

        <S.SearchInputWrapper onSubmit={handleInputSubmit}>
          <S.SearchInput
            type="text"
            placeholder="방 제목을 검색해 주세요."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Icon>
            <SearchRoundedIcon />
          </Icon>
        </S.SearchInputWrapper>
      </S.SearchOptionsContainer>

      <S.UpdateData>
        {`마지막 업데이트: ${latestUpdate}`}
        <Icon>
          <RefreshRoundedIcon />
        </Icon>
      </S.UpdateData>
    </S.NavContainer>
  );
}
