import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import { Avatar } from '@/components';
import { Size } from '@/types';

import { MessageContainer, MessageSender } from './Message.style';

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
