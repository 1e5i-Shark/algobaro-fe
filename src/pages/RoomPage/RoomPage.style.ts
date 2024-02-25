import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

// RoomPage
export const RoomContainer = styled(Row)`
  height: 100vh;
  padding-top: 3rem;
  background-color: 'peru';
`;

export const WaitingRoomContainer = styled(Col)`
  flex-grow: 3;
  min-width: 50rem;
  padding: 0 1rem;
  /* background-color: #789456; */
`;

export const ChatContainer = styled(Col)`
  ${({ theme }) => css`
    flex-grow: 1;
    min-width: 25rem;
    padding: 0 1rem;
    /* background-color: #f2f13f; */
    border-left: 1px solid ${theme.color.transparent_30};
  `}
`;
