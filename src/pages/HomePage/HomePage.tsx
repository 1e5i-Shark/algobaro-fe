import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { Button, CheckBox, Icon } from '@/components';

import * as S from './HomePage.style';

export default function HomePage() {
  const latestUpdate = '1분전';

  return (
    <S.HomeContainer>
      <S.HomeWrapper>
        <S.NavContainer>
          <S.NavWrapper>
            <Button>방 만들기</Button>
            <S.HomeNavWrapper>
              <S.SearchWrapper>
                <S.SearchInput
                  type="text"
                  placeholder="방 제목을 검색해 주세요."
                />
                <Icon>
                  <SearchRoundedIcon />
                </Icon>
              </S.SearchWrapper>
              <div>dropdown</div>
              <CheckBox
                label="비밀방"
                checked={true}
              />
              <CheckBox
                label="입장 가능"
                checked={true}
              />
            </S.HomeNavWrapper>
          </S.NavWrapper>
          <S.UpdateData>
            {/* 글자 크기 작게 수정하기 */}
            {`마지막 업데이트: ${latestUpdate}`}
            <Icon>
              <RefreshRoundedIcon />
            </Icon>
          </S.UpdateData>
        </S.NavContainer>
      </S.HomeWrapper>
    </S.HomeContainer>
  );
}
