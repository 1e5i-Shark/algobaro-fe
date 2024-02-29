import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { Avatar } from '@/components/Common/Avatar';
import { MemberType } from '@/types/room';

import Icon from '../Common/Icon/Icon';
import Menu from '../Common/Menu/Menu';
import { MenuText } from '../Common/Menu/MenuText';
import * as S from './MemberCard.style';
import StatusTag from './StatusTag';

interface MemberProps
  extends Pick<MemberType, 'nickname' | 'profileImage' | 'role'> {}

export default function MemberCard({
  nickname,
  profileImage,
  role,
}: MemberProps) {
  const menuList = [
    {
      id: 1,
      text: MenuText.TransferHost,
      onClick: () => alert('방장 위임 클릭!'),
    },
    {
      id: 2,
      text: MenuText.KickOut,
      onClick: () => alert('강제 퇴장 클릭!'),
    },
  ];

  return (
    <S.CardWrapper>
      <S.MenuWrapper>
        <Menu
          menuList={menuList}
          className="menu"
        >
          <Icon>
            <MoreVertRoundedIcon />
          </Icon>
        </Menu>
      </S.MenuWrapper>
      <Avatar
        src={profileImage}
        size="M"
      />
      <S.NameWrapper>{nickname}</S.NameWrapper>
      <StatusTag role={role} />
    </S.CardWrapper>
  );
}
