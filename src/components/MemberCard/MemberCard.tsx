import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { Avatar } from '@/components/Common/Avatar';
import { ROOM_ROLE } from '@/services/Room/Room';
import { MemberType } from '@/types/room';

import Icon from '../Common/Icon/Icon';
import Menu from '../Common/Menu/Menu';
import { MenuListProps, MenuText } from '../Common/Menu/MenuText';
import * as S from './MemberCard.style';
import StatusTag from './StatusTag';

interface MemberProps
  extends Partial<
    Pick<MemberType, 'nickname' | 'profileImage' | 'role' | 'ready'>
  > {
  memberId: number;
  onMenuClick: (menu: string, memberId: number) => void;
}

export default function MemberCard({
  memberId,
  nickname,
  profileImage,
  role = 'HOST',
  ready,
  onMenuClick,
}: MemberProps) {
  const menuList: MenuListProps[] = [
    {
      id: 1,
      text: MenuText.TransferHost,
      onClick: () => onMenuClick(MenuText.TransferHost, memberId),
    },
    {
      id: 2,
      text: MenuText.KickOut,
      onClick: () => onMenuClick(MenuText.KickOut, memberId),
    },
  ];

  return (
    <S.CardWrapper>
      {role === ROOM_ROLE.MEMBER && (
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
      )}
      <Avatar
        src={profileImage}
        size="M"
      />
      <S.NameWrapper>{nickname}</S.NameWrapper>
      <StatusTag
        role={role}
        ready={ready ?? false}
      />
    </S.CardWrapper>
  );
}
