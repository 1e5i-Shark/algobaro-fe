import { useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Image, ThemeModeToggleButton } from '@/components';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { PATH } from '@/routes/path';

import * as S from './Header.style';

export default function Header() {
  const { theme } = useCustomTheme();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Todo: 수영님의 MeStore에서 추출하는 것으로 이후 변경
  const { data: myInfo, refetch } = useMyInfo();

  if (!myInfo && pathname !== '/signup') {
    refetch();
  }

  const myId = myInfo?.response.id;
  const myProfileImage = myInfo?.response.profileImage;

  const handleMyProfileClick = () => {
    navigate(`${PATH.PROFILE}/${myId}`);
  };

  const handleLogoClick = () => {
    navigate(pathname === '/home' ? PATH.ROOT : PATH.HOME);
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper onClick={handleLogoClick}>
        <Image
          src={`/assets/logo-text-${theme.mode}.png`}
          alt="logo-text"
          height="2.5rem"
          priority={true}
        />
      </S.LogoWrapper>
      <S.IconWrapper>
        <ThemeModeToggleButton />
        {!(pathname.includes('/signup') || pathname.includes('/profile')) ? (
          <S.AvatarWrapper>
            <Avatar
              src={myProfileImage}
              onClick={handleMyProfileClick}
            />
          </S.AvatarWrapper>
        ) : null}
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
}
