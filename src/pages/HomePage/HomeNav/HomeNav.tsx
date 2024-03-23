import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CheckBox, Icon, MultiDropDown } from '@/components';
import { LANGUAGES_DATA_SET } from '@/constants/room';
import { PATH } from '@/routes/path';
import useFilterStore from '@/store/RoomsListStore/useFilterStore';
import { toastify } from '@/utils/toastify';

import AnimatedIcon from './animatedIcon';
import * as S from './HomeNav.style';
import useStopWatch from './useStopWatch';

interface HomeNavProps {
  refetch: () => void;
}

export default function HomeNav({ refetch }: HomeNavProps) {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { elapsedTime, nowDelay, startStopWatch } = useStopWatch();
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

    // Input 내부에 값을 입력한 후, 모두 지울 경우 초기화된 상태로 다시 api 요청
    if (value === '') {
      setInputValue('');
      setTitle('');
      return;
    }

    setInputValue(value);
  };

  const handleRefetchData = () => {
    if (nowDelay) {
      toastify.error('잠시 후 다시 시도해주세요.');
      return;
    }

    // 타이머 실행, 딜레이 리셋
    startStopWatch();

    // 새로고침 아이콘의 애니메이션이 끝난 후 상태를 리셋하기 위해 타이머 설정
    setAnimate(true);
    setTimeout(() => setAnimate(false), 350);

    // api 재요청
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
          fontSize="1.3rem"
          width="10rem"
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
        <span>
          {!elapsedTime
            ? '방 정보 업데이트'
            : `마지막 업데이트: ${elapsedTime}분 전`}
        </span>
        <Icon onClick={handleRefetchData}>
          <AnimatedIcon $animate={animate} />
        </Icon>
      </S.UpdateData>
    </S.NavContainer>
  );
}
