import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { TextareaAutosize } from '@mui/material';
import { KeyboardEvent, useEffect } from 'react';

import { Icon } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
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

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    changeInput(value);
  };

  const handleMessageSend = () => {
    if (messageEntered.trim() === '') {
      changeInput('');
      return;
    }
    sendMessage(SOCKET_TYPE.CHAT.MESSAGE);
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글의 경우, 자음 모음의 조합 언어라 같은 이벤트라도 영어랑 달리 2번 발생함. 이를 방지해준다.
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      if (e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) return;

      // e.preventDefault() => 기본 동작을 중단시킴.
      // Input 내장 기능 => 페이지 새로고침.
      // Textarea 내장 기능 => 줄바꿈.
      e.preventDefault();
      handleMessageSend();
    }
  };

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

  if (!connected) {
    return null;
  }

  return (
    <S.ChatInputContainer className={className}>
      <TextareaAutosize
        onKeyDown={onEnterPress}
        value={messageEntered}
        onChange={handleChangeInput}
        maxRows={10}
      />

      <Icon
        background={true}
        onClick={handleMessageSend}
      >
        <SendRoundedIcon />
      </Icon>
    </S.ChatInputContainer>
  );
}
