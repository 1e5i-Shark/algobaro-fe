import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';

import { Button, CheckBox, Icon, MultiDropDown } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import * as S from './HomeNav.style';

export default function HomeNav() {
  const { theme } = useCustomTheme();
  const [check, setCheck] = useState(false);
  const dataSet: { [key: string]: string } = {
    python: '파이썬',
    javascript: '자바스크립트',
    cPlusPlus: 'C++',
    java: 'Java',
  };
  const latestUpdate = '1분전';

  return (
    <S.NavContainer>
      <Button>방 만들기</Button>

      <S.SearchOptionsContainer>
        <S.SearchInputWrapper>
          <S.SearchInput
            type="text"
            placeholder="방 제목을 검색해 주세요."
          />
          <Icon>
            <SearchRoundedIcon />
          </Icon>
        </S.SearchInputWrapper>

        <MultiDropDown
          dataId="search-code-language"
          dataSet={dataSet}
          labelId="search-code-language-label"
          labelName="언어"
          fontSize={theme.size.M}
          width="13.3rem"
        />

        <CheckBox
          label="비밀방"
          checked={check}
          onChange={() => setCheck(!check)}
        />

        <CheckBox
          label="입장 가능"
          checked={true}
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
