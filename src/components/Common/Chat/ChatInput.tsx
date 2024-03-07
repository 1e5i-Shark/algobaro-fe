import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { TextareaAutosize } from '@mui/material';
import { useEffect } from 'react';

import { Icon } from '@/components';
import { chatType } from '@/constants/chat';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useMessageStore from '@/store/MessageStore';

import * as S from './Chat.style';

interface ChatInputProps {
  className: string;
}

export default function ChatInput({ className }: ChatInputProps) {
  const { theme } = useCustomTheme();
  const { connected, messageEntered, disconnect, sendMessage, changeInput } =
    useMessageStore();

  const beforeUnloadListener = () => {
    if (connected) {
      disconnect();
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadListener);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, []);

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    changeInput(value);
  };

  const handleSendClick = () => {
    sendMessage(chatType.MESSAGE);
  };

  if (!connected) {
    return null;
  }

  return (
    <S.ChatInputContainer className={className}>
      <TextareaAutosize
        value={messageEntered}
        onChange={handleChangeInput}
        maxRows={20}
        style={{
          color: `${theme.color.text_primary_color}`,
          backgroundColor: `${theme.mode === 'light' ? theme.color.container_color : theme.color.transparent_10}`,
        }}
      />

      <Icon
        background={true}
        onClick={handleSendClick}
      >
        <SendRoundedIcon />
      </Icon>
    </S.ChatInputContainer>
  );
}
