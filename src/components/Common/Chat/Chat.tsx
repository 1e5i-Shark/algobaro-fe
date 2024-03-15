import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';

import { Message } from '@/components';
import useMessageStore from '@/store/MessageStore';
import useMeStore from '@/store/MyInfoStore';
import useRoomStore from '@/store/RoomStore';

import * as S from './Chat.style';
import ChatInput from './ChatInput';

interface ChatProps {
  height?: string;
}

export default function Chat({ height = '100%' }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { myInfo } = useMeStore();
  const {
    roomData: { roomShortUuid },
  } = useRoomStore();
  const { messageLogs, connected, connect, setMessageValue, disconnect } =
    useMessageStore();

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
      <S.MessagesContainer
        ref={scrollRef}
        className="message-container"
      >
        {messageLogs.map(message => {
          return (
            <S.MessageWrapper key={v4()}>
              <Message
                userName={message.memberId.toString()}
                comment={message.value as string}
                createdAt={message.timestamp}
              />
            </S.MessageWrapper>
          );
        })}
      </S.MessagesContainer>
      <ChatInput className="chatinput" />
    </S.ChatContainer>
  );
}
