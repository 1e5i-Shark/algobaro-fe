import { styled } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const RoomContainer = styled(Row)`
  height: 100vh;
  background-color: 'peru';
`;

const WaitingRoomContainer = styled(Col)`
  flex-grow: 3;
  min-width: 50rem;
  background-color: #789456;
`;

const ChatContainer = styled(Col)`
  flex-grow: 1;
  min-width: 25rem;
  background-color: #f2f13f;
`;

export default function RoomPage() {
  return (
    <RoomContainer>
      <WaitingRoomContainer>
        <h1>대기룸</h1>
      </WaitingRoomContainer>
      <ChatContainer>
        <h1>채팅</h1>
      </ChatContainer>
    </RoomContainer>
  );
}
