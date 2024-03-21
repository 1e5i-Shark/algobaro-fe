import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { Message } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
import useMessageStore from '@/store/MessageStore';
import * as T from '@/store/MessageStore/type';
import useRoomStore from '@/store/RoomStore';

import * as S from './Chat.style';
import ChatInput from './ChatInput';

interface ChatProps {
  height?: string;
}

interface MessageState extends Required<T.Message> {
  profileImage: string;
  nickname: string;
}

export default function Chat({ height = '100%' }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messageLogs, receiveLogs } = useMessageStore();

  const {
    roomData: { roomMembers },
  } = useRoomStore();

  const [memberList, setMemberList] = useState<MessageState[]>([]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const memberIdToData = (id: number) => {
    const messageData = messageLogs
      .filter(member => member.memberId === id)
      .at(-1);

    const memberData = roomMembers.find(member => member.memberId === id);

    const result = {
      ...messageData,
      profileImage: memberData?.profileImage || '',
      nickname: memberData?.nickname || '',
    };

    return [...memberList, result as MessageState];
  };

  useEffect(() => {
    scrollToBottom();
    if (messageLogs.length < 1) return;

    const newMessage = messageLogs.at(-1);
    const newLogs = newMessage && memberIdToData(newMessage.memberId);
    newLogs && setMemberList(newLogs);
  }, [messageLogs, receiveLogs]);

  return (
    <S.ChatContainer $height={height}>
      <S.MessagesContainer
        ref={scrollRef}
        className="message-container"
      >
        {memberList.map(message => {
          const isSystem =
            message.type === SOCKET_TYPE.CHAT.ENTER ||
            message.type === SOCKET_TYPE.CHAT.QUIT;
          return (
            <S.MessageWrapper key={v4()}>
              <Message
                avatarSrc={!isSystem ? message.profileImage : 'system'}
                userName={!isSystem ? message.nickname : 'Algobaro'}
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
