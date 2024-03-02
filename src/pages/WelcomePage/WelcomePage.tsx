import { ThemeModeToggleButton } from '@/components';
import LoginForm from '@/components/LoginForm/LoginForm';

import * as S from './WelcomePage.style';

export default function WelcomePage() {
  return (
    <S.WelcomePageWrapper>
      <h1>WelcomePage</h1>
      <LoginForm />
      <S.DarkModeButtonContainer>
        <ThemeModeToggleButton></ThemeModeToggleButton>
      </S.DarkModeButtonContainer>
    </S.WelcomePageWrapper>
  );
}
