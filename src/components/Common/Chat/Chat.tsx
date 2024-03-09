import { MouseEvent, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { Message } from '@/components';
import useMeStore from '@/store/Me';
import useMessageStore from '@/store/MessageStore';

import { MenuText } from '../Menu/MenuText';
import * as S from './Chat.style';
import ChatInput from './ChatInput';

interface ChatProps {
  height?: string;
}

export default function Chat({ height = '100%' }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { me } = useMeStore();
  // routes/index.ts 파일의 path에 정의된 :roomId을 가져옴
  // * 현재 테스트의 경우 profile routes에서 진행되므로
  // * routes/index.ts 파일의 42번째 라인의 userId를 roomId로 수정 후 테스트해야 정상 작동 됨.
  const { roomId } = useParams();
  const { messageLogs, connected, connect, setMessageValue, disconnect } =
    useMessageStore();

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
    const connectSocketServer = async (id: number) => {
      if (connected) return;

      setMessageValue({ userId: me.nickname });
      connect(id);
    };

    roomId && connectSocketServer(+roomId);

    return () => {
      if (roomId && connected) disconnect();
    };
  }, [roomId, disconnect]);

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
