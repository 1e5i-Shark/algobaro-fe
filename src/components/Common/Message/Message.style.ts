import styled, { css } from 'styled-components';

import { Size } from '@/types';

interface MessageContainerProps {
  $padding: string;
  $width: string;
  $fontSize: string;
  $avatarSize: Size;
}

interface MessageSenderProps {
  $fontSize: string;
}

export const MessageContainer = styled.div<MessageContainerProps>`
  ${({ $padding, $width, $fontSize, $avatarSize, theme }) => css`
    width: ${$width};
    padding: ${$padding};

    ${MessageText} {
      padding: ${$padding};
      padding-left: ${`calc(${theme.size.icon[$avatarSize]} + ${$padding} )`};
      font-size: ${$fontSize};
    }
  `}
`;

export const MessageSender = styled.div<MessageSenderProps>`
  ${({ $fontSize }) => css`
    display: flex;
    align-items: center;
    font-size: ${$fontSize};

    & > :last-child {
      margin-left: auto;
    }
  `}
`;

export const MessageText = styled.p`
  width: 98%;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const UserName = styled.span`
  margin-left: 8px;
`;
