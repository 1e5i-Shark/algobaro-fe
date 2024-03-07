import { styled } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

export const ChatContainer = styled(Col)`
  height: 100vh;
`;

export const MessagesContainer = styled(Col)`
  flex-grow: 1;
  justify-content: flex-end;
`;

export const MessageWrapper = styled.div`
  border-top: 1px solid gray;
`;

export const ChatInputWrapper = styled(Col)`
  justify-content: center;
  height: 5rem;
  border-top: 1px solid gray;
`;

export const ChatListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  width: 10rem;
  height: 4rem;
`;

export const SendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
`;
