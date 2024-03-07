import { css, styled } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

export const ChatContainer = styled(Col)`
  height: 100vh;
`;

export const MessagesContainer = styled(Col)`
  flex-grow: 1;
  justify-content: flex-end;
`;

export const MessageWrapper = styled.div`
  ${({ theme }) => css`
    border-top: ${`1px solid ${theme.color.transparent_50}`};
  `}
`;

export const ChatInputContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-content: center;
    justify-content: center;
    height: 6rem;
    border-top: ${`2px solid ${theme.color.transparent_50}`};
  `}
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    color: ${theme.color.text_primary_color};
    background-color: ${theme.color.background_primary};
  `}
`;

export const SendButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 1rem;
`;

export const ChatListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
