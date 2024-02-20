import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import styled, { css } from 'styled-components';

import { Avatar } from '@/components';
import { Size } from '@/types';

interface MessageProps {
  padding?: string;
  avatarSize?: Size;
  avatarSrc?: string;
  avatarShadow?: boolean;
  userName?: string;
  fontSize?: string;
  iconSize?: Size;
  comment: string;
}

export default function Message({
  padding = '8px',
  avatarSize = 'XS',
  avatarSrc = '',
  avatarShadow = true,
  userName = 'User1',
  fontSize = '1.6rem',
  iconSize = 'XS',
  comment,
}: MessageProps) {
  return (
    <>
      <MessageContainer
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
          <span>{userName}</span>
          <MoreVertRoundedIcon />
        </MessageSender>
        <p>{comment}</p>
      </MessageContainer>
    </>
  );
}

interface MessageContainerProps {
  $padding: string;
  $fontSize: string;
  $avatarSize: Size;
}

interface MessageSenderProps {
  $fontSize: string;
}

const MessageContainer = styled.div<MessageContainerProps>`
  ${({ $padding, $fontSize, $avatarSize, theme }) => css`
    padding: ${$padding};
    border: 2px solid red;

    & > p {
      padding: ${$padding};
      padding-left: ${`calc(${theme.size.icon[$avatarSize]} + ${$padding} + 2px)`};
      font-size: ${$fontSize};
      word-break: break-all;
      white-space: pre-wrap;
    }
  `}
`;
const MessageSender = styled.div<MessageSenderProps>`
  ${({ $fontSize }) => css`
    display: flex;
    align-items: center;
    font-size: ${$fontSize};
    border: 2px solid orange;

    & > span {
      margin-left: 8px;
    }

    & > :last-child {
      margin-left: auto;
    }
  `}
`;
