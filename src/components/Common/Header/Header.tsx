import { useNavigate } from 'react-router-dom';

import { Avatar, ThemeModeToggleButton } from '@/components';
import { PATH } from '@/routes/path';

import * as S from './Header.style';

export default function Header() {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(PATH.PROFILE);
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoText>AlgoBaro</S.LogoText>
      </S.LogoWrapper>
      <S.IconWrapper>
        <ThemeModeToggleButton />
        <S.AvatarWrapper>
          <Avatar onClick={handleAvatarClick} />
        </S.AvatarWrapper>
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
}
