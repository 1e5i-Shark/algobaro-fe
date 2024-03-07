import { css, styled } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

export const ChatContainer = styled(Col)`
  height: 100%;
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
    align-items: flex-end;
    border-top: ${`2px solid ${theme.color.transparent_50}`};

    & > textarea {
      flex-grow: 1;
      padding: 1rem;
      margin: 1rem;
      background-color: ${theme.color.container_color};
      border-radius: 0.5rem;
    }

    & > button {
      margin: 1rem;
    }
  `}
`;

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    flex-grow: 1;
    height: 100%;

    & > textarea {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      color: ${theme.color.text_primary_color};
      background-color: ${theme.color.background_primary};
    }
  `}
`;

export const ChatListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
