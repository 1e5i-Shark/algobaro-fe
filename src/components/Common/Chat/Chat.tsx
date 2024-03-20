import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';

import { Message } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
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

  const memberIdToData = (memberId: number) => {
    const data = roomMembers.find(member => member.memberId === memberId);

    const result = {
      profileImage: data?.profileImage || '',
      nickname: data?.nickname || '',
    };

    return result;
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
          const memberData = memberIdToData(message.memberId);
          // 입장, 퇴장 시 system 메세지를 출력한다.
          const isSystem =
            message.type === SOCKET_TYPE.CHAT.ENTER ||
            message.type === SOCKET_TYPE.CHAT.QUIT;
          return (
            <S.MessageWrapper key={v4()}>
              <Message
                avatarSrc={!isSystem ? memberData.profileImage : ''}
                userName={!isSystem ? memberData.nickname : 'Algobaro'}
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
