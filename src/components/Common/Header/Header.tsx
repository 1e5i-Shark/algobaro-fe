import { useNavigate } from 'react-router-dom';

import { Avatar, ThemeModeToggleButton } from '@/components';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { PATH } from '@/routes/path';

import * as S from './Header.style';

export default function Header() {
  const navigate = useNavigate();

  // Todo: 수영님의 MeStore에서 추출하는 것으로 이후 변경
  const { data: myInfo, refetch } = useMyInfo();

  if (!myInfo) {
    refetch();
  }

  const myId = myInfo?.response.id;
  const myProfileImage = myInfo?.response.profileImage;

  const handleMyProfileClick = () => {
    navigate(`${PATH.PROFILE}/${myId}`);
  };

  const handleLogoClick = () => {
    navigate(PATH.ROOT);
  };

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper onClick={handleLogoClick}>
        <S.LogoText>AlgoBaro</S.LogoText>
      </S.LogoWrapper>
      <S.IconWrapper>
        <ThemeModeToggleButton />
        <S.AvatarWrapper>
          <Avatar
            src={myProfileImage}
            onClick={handleMyProfileClick}
          />
        </S.AvatarWrapper>
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
}
