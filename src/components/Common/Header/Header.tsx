import { useNavigate } from 'react-router-dom';

import { Avatar, DarkModeToggleButton } from '@/components';
import { PATH } from '@/routes/path';

import * as S from './Header.style';

export default function Header() {
  const naviate = useNavigate();

  const handleAvatarClick = () => {
    naviate(PATH.PROFILE);
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoText>AlgoBaro</S.LogoText>
      </S.LogoWrapper>
      <S.IconWrapper>
        <DarkModeToggleButton />
        <Avatar onClick={handleAvatarClick} />
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
}
