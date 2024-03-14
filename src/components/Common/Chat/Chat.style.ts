import { css, styled } from 'styled-components';

import { Col } from '@/styles/GlobalStyle';

export const ChatContainer = styled(Col)<{ $height: string }>`
  ${({ $height }) => css`
    height: ${$height};
  `}
`;

// justify-content: flex-end; 의 경우 scroll이 안됨
export const MessagesContainer = styled(Col)`
  height: 100%;
  overflow-y: scroll;

  & > :first-child {
    margin-top: auto !important;
  }
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
      color: ${theme.color.text_primary_color};
      background-color: ${theme.mode === 'light'
        ? theme.color.container_color
        : theme.color.transparent_10};
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
