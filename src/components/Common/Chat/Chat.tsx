import { MouseEvent, useEffect, useRef } from 'react';
import { v4 } from 'uuid';

import { Message } from '@/components';
import useMessageStore from '@/store/MessageStore';

import { MenuText } from '../Menu/MenuText';
import * as S from './Chat.style';
import ChatInput from './ChatInput';

interface ChatProps {
  height?: string;
}

export default function Chat({ height = '100%' }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messageLogs } = useMessageStore();

  const menuList = [
    {
      id: 1,
      text: MenuText.TransferHost,
      onClick: (event: MouseEvent<HTMLElement>) =>
        console.log('메뉴 테스트', event),
    },
  ];

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageLogs]);

  return (
    <S.ChatContainer $height={height}>
      <S.MessagesContainer ref={scrollRef}>
        {messageLogs.map(message => {
          return (
            <S.MessageWrapper key={v4()}>
              <Message
                userName={message.userId}
                comment={message.value}
                menuList={menuList}
                createdAt={message.timestamp}
              />
            </S.MessageWrapper>
          );
        })}
      </S.MessagesContainer>
      <ChatInput className={'chatinput'} />
    </S.ChatContainer>
  );
}
