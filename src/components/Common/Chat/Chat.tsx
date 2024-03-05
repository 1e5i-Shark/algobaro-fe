import { MouseEvent } from 'react';

import { Message } from '@/components';

import { MenuText } from '../Menu/MenuText';
import * as S from './Chat.style';
import ChatInput from './ChatInput';

export default function Chat() {
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
      <S.MessagesContainer>
        <S.MessageWrapper>
          <Message
            userName="김방장"
            comment={'메시지1'}
            menuList={menuList}
          />
        </S.MessageWrapper>
        <S.MessageWrapper>
          <Message
            userName="김방장"
            comment={'메시지2'}
            menuList={menuList}
          />
        </S.MessageWrapper>
      </S.MessagesContainer>
      <ChatInput className={'chat-input'} />
    </S.ChatContainer>
  );
}
