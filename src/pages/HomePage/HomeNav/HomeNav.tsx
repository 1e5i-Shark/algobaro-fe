import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CheckBox, Icon, MultiDropDown } from '@/components';
import { LANGUAGES_DATA_SET } from '@/constants/room';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { PATH } from '@/routes/path';
import useFilterStore from '@/store/RoomsListStore/useFilterStore';

import * as S from './HomeNav.style';

interface HomeNavProps {
  refetch: () => void;
}

export default function HomeNav({ refetch }: HomeNavProps) {
  // const latestUpdate = '1분전';
  const [latestUpdate, setLatestUpdate] = useState(1);
  const { theme } = useCustomTheme();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const {
    selectedAccess,
    selectedStatus,
    setTitle,
    setLanguage,
    setAccess,
    setStatus,
  } = useFilterStore();

  const handleCreateRoomClick = () => {
    navigate(PATH.CREATEROOM);
  };

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTitle(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Input 내부가 빈 문자열일 경우, 초기화
    if (value === '') {
      setInputValue('');
      setTitle('');
      return;
    }

    setInputValue(value);
  };

  const handleRefetchData = () => {
    setLatestUpdate(prev => prev + 1);
    refetch();
  };

  return (
    <S.NavContainer>
      <Button onClick={handleCreateRoomClick}>방 만들기</Button>

      <S.SearchOptionsContainer>
        <MultiDropDown
          dataId="search-code-language"
          dataSet={LANGUAGES_DATA_SET}
          labelId="search-code-language-label"
          labelName="언어"
          fontSize={theme.size.M}
          width="13.3rem"
          onSelected={setLanguage}
        />

        <CheckBox
          label="비밀방"
          checked={selectedAccess === 'PRIVATE'}
          onChange={() =>
            setAccess(selectedAccess === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE')
          }
        />

        <CheckBox
          label="입장 가능"
          checked={selectedStatus === 'RECRUITING'}
          onChange={() =>
            setStatus(
              selectedStatus === 'RECRUITING' ? 'RUNNING' : 'RECRUITING'
            )
          }
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
        {`마지막 업데이트: ${latestUpdate}분전`}
        <Icon onClick={handleRefetchData}>
          <RefreshRoundedIcon />
        </Icon>
      </S.UpdateData>
    </S.NavContainer>
  );
}
