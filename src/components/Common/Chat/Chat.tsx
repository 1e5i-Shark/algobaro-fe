import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Message } from '@/components';
import useMessageStore from '@/store/MessageStore';

import { MenuText } from '../Menu/MenuText';
import * as S from './Chat.style';
import ChatInput from './ChatInput';

export default function Chat() {
  const navigate = useNavigate();
  const { messageLogs } = useMessageStore();

  const menuList = [
    {
      id: 1,
      text: MenuText.TransferHost,
      onClick: (event: MouseEvent<HTMLElement>) =>
        console.log('메뉴 테스트', event),
    },
  ];

  return (
    <S.ChatContainer>
      <button onClick={() => navigate('/home')}>홈으로가기</button>
      <S.MessagesContainer>
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
