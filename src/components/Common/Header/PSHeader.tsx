import { useNavigate } from 'react-router-dom';

import { useCustomTheme } from '@/hooks/useCustomTheme';
import { PATH } from '@/routes/path';

import Button from '../Button/Button';
import ThemeModeToggleButton from '../ThemeModeToggleButton/ThemeModeToggleButton';
import * as S from './PSHeader.style';

export default function PSHeader() {
  const { theme } = useCustomTheme();

  const navigate = useNavigate();

  const handleGiveUp = () => {
    if (confirm('정말 포기하고 나가시겠습니까?')) {
      navigate(PATH.HOME);
    }
  };

  return (
    <S.HeaderWrapper>
      <S.TimerWrapper>타이머</S.TimerWrapper>
      <S.ButtonWrapper>
        <ThemeModeToggleButton />
        <Button
          height="4rem"
          backgroundColor={theme.color.red}
          onClick={handleGiveUp}
        >
          포기하기
        </Button>
      </S.ButtonWrapper>
    </S.HeaderWrapper>
  );
}
