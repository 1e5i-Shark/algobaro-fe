import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';

import { Message } from '@/components';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

import * as S from './Chat.style';
import ChatInput from './ChatInput';

interface ChatProps {
  height?: string;
}

export default function Chat({ height = '100%' }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messageLogs } = useMessageStore();
  const {
    roomData: { roomMembers },
  } = useRoomStore();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const memberIdToNickname = (memberId: number) => {
    const data = roomMembers.find(member => member.memberId === memberId);
    return data?.nickname;
  };

  const memberIdToAvatar = (memberId: number) => {
    const data = roomMembers.find(member => member.memberId === memberId);
    return data?.profileImage;
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
                avatarSrc={memberIdToAvatar(message.memberId) || ''}
                userName={memberIdToNickname(message.memberId) || ''}
                comment={message.value || ''}
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
