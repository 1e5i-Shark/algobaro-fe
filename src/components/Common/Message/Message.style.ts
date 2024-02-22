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

    & > p {
      padding: ${$padding};
      padding-left: ${`calc(${theme.size.icon[$avatarSize]} + ${$padding} )`};
      font-size: ${$fontSize};
      word-break: break-all;
    }
  `}
`;
export const MessageSender = styled.div<MessageSenderProps>`
  ${({ $fontSize }) => css`
    display: flex;
    align-items: center;
    font-size: ${$fontSize};

    & > span {
      margin-left: 8px;
    }

    & > :last-child {
      margin-left: auto;
    }
  `}
`;
