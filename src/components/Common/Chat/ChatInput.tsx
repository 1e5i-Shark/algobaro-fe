import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect } from 'react';

import { Icon } from '@/components';
import { chatType } from '@/constants/chat';
import useMessageStore from '@/store/MessageStore';

import * as S from './Chat.style';

interface ChatInputProps {
  className: string;
}

export default function ChatInput({ className }: ChatInputProps) {
  const { connected, messageEntered, disconnect, sendMessage, changeInput } =
    useMessageStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(chatType.MESSAGE);
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

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <S.InputWrapper>
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            value={messageEntered}
            onChange={handleChangeInput}
          />
        </S.Form>
      </S.InputWrapper>
      <S.SendButton>
        <Icon
          background={true}
          onClick={handleSendClick}
        >
          <SendRoundedIcon />
        </Icon>
      </S.SendButton>
    </S.ChatInputContainer>
  );
}
