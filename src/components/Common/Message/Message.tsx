import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { HTMLAttributes, MouseEvent } from 'react';

import { Avatar, Icon, Menu } from '@/components';
import { Size } from '@/types';

import {
  MessageContainer,
  MessageSender,
  MessageText,
  UserName,
} from './Message.style';

/**
 * Message 컴포넌트
 * @param [ padding = '8px' ] - Message 컴포넌트 padding
 * @param [ avatarSize = 'XS' ] - avatar의 크기
 * @param [ avatarSrc = '' ] - avatar의 이미지 주소
 * @param [ avatarShadow = true ] - avatar의 그림자 표시 여부
 * @param [ userName = 'User1' ] - 작성자
 * @param [ fontSize = '1.6rem' ] - 작성자 및 메시지 내용의 폰트 크기
 * @param [ iconSize = 'XS' ] - icon의 크기
 * @param [ comment ] - required, 메시지 내용
 */

interface MenuListProps {
  id: number;
  text: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string;
  width?: string;
  avatarSize?: Size;
  avatarSrc?: string;
  avatarShadow?: boolean;
  userName?: string;
  fontSize?: string;
  iconSize?: Size;
  comment: string;
  menuList: MenuListProps[];
}

export default function Message({
  padding = '8px',
  width = '100%',
  avatarSize = 'XS',
  avatarSrc = '',
  avatarShadow = true,
  userName = 'User1',
  fontSize = '1.6rem',
  iconSize = 'XS',
  comment,
  menuList,
  ...props
}: MessageProps) {
  return (
    <>
      <MessageContainer
        $width={width}
        $padding={padding}
        $fontSize={fontSize}
        $avatarSize={avatarSize}
      >
        <MessageSender $fontSize={fontSize}>
          <Avatar
            size={avatarSize}
            src={avatarSrc}
            isShadow={avatarShadow}
          />
          <UserName>{userName}</UserName>
          <Menu menuList={menuList}>
            <Icon size={iconSize}>
              <MoreVertRoundedIcon />
            </Icon>
          </Menu>
        </MessageSender>
        <MessageText>{comment}</MessageText>
      </MessageContainer>
    </>
  );
}
