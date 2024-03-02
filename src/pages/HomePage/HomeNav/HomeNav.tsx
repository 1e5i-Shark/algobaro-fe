import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, CheckBox, Icon, MultiDropDown } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useRoomFilterStore from '@/store/useRoomFilterStore';

import { DummyDataSet } from '../DummyData';
import * as S from './HomeNav.style';

export default function HomeNav() {
  const latestUpdate = '1분전';
  const { theme } = useCustomTheme();
  const [inputValue, setInputValue] = useState('');
  const {
    selectedPrivate,
    selectedAccess,
    setSearchInputValue,
    setSelectedPrivate,
    setSelectedAccess,
    setSelectedLanguage,
  } = useRoomFilterStore();

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchInputValue(inputValue);
    setInputValue('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.NavContainer>
      <Button>방 만들기</Button>

      <S.SearchOptionsContainer>
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
          label="비밀방"
          checked={selectedPrivate}
          onChange={() => setSelectedPrivate(!selectedPrivate)}
        />

        <CheckBox
          label="입장 가능"
          checked={selectedAccess}
          onChange={() => setSelectedAccess(!selectedAccess)}
        />
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
