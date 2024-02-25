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

// RoomHeader
export const HeaderContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
  /* background-color: lightblue; */
`;

export const RoomInfoContainer = styled.div`
  background-color: 'peru';
`;

export const ButtonsWrapper = styled(Row)``;

export const RoomIdWrapper = styled(Row)`
  padding-bottom: 0.8rem;

  &:hover {
    filter: brightness(95%);
  }
`;

export const CopyRoomIdTag = styled(Row)`
  ${({ theme }) => css`
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: ${theme.color.container_color};
    border-radius: 0.3rem;
  `}
`;

export const TextId = styled.div`
  padding-right: 0.3rem;
`;

export const TitleWrapper = styled(Row)`
  align-items: center;
  padding-bottom: 0.7rem;
`;

export const TagsWrapper = styled(Row)`
  padding-bottom: 0.7rem;
`;

export const TagWrapper = styled.div`
  padding-right: 0.5rem;
`;

export const LogosWrapper = styled(Row)``;

export const LogoWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;

  &:last-of-type {
    margin-right: 0;
  }
`;
