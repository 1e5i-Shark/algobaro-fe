import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Chat, Spinner } from '@/components';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { PATH } from '@/routes/path';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

import { findMyRoomData } from './findMyRoomData';
import MemberList from './MemberList/MemberList';
import RoomHeader from './RoomHeader/RoomHeader';
import * as S from './RoomPage.style';
import TestInfo from './TestInfo/TestInfo';

export default function RoomPage() {
  const { roomData, setMyRoomData, setRoomData } = useRoomStore();
  const {
    client,
    subscription,
    receiveLogs,
    testEndTime,
    listeners,
    connect,
    disconnect,
    setMessageValue,
  } = useMessageStore();
  const { data: myInfo, refetch: refetchMyInfo } = useMyInfo();

  const { roomShortUuid } = useParams();

  if (!roomShortUuid) {
    return <Navigate to={PATH.HOME} />;
  }

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchRoom,
  } = useGetUuidRoom(roomShortUuid);

  useEffect(() => {
    // 방에 들어오면 무조건 connect
    connect(roomShortUuid);
    refetchMyInfo();

    // RoomPage가 unmount 된다면 disconnect
    // ! Page 이동시에도 연결을 다시 하기위해서 disconnect가 아닌 내부 몇개의 함수만 가져와서 사용
    return () => {
      if (!client || !subscription) return;

      subscription.unsubscribe();
      client.deactivate();

      setMessageValue({
        connected: false,
        currentRoomId: '',
        messageEntered: '',
        messageLogs: [],
        receiveLogs: [],
        listeners: null,
        client: null,
      });
    };
  }, []);

  useEffect(() => {
    refetchRoom();

    if (myInfo && data?.response) {
      setRoomData(data.response);
    }
  }, [myInfo, data, listeners, receiveLogs]);

  useEffect(() => {
    if (!myInfo) return;

    const myData = findMyRoomData(roomData.roomMembers, myInfo.response.email);

    if (myData) {
      setMyRoomData(myData);
    }
  }, [roomData]);

  useEffect(() => {
    console.log(testEndTime, 'testEndTime');
  }, [testEndTime]);

  if (isError) {
    console.error(error);

    alert('방 정보를 불러오지 못했습니다. 잠시 후 다시 입장해주세요.');
    return <Navigate to={PATH.HOME} />;
  }

  /**
   * 웹소켓은 새로고침, 페이지 이동 시 연결이 끊긴다.
   * 그러나 비정상적인 네트워크 종료 등으로 브라우저가 갑작스럽게 연결이 끊기면 서버 측에서 이를 감지하기 어려울 수 있다.
   * 따라서 beforeUnloadListener로 명시적으로 웹소켓 연결을 끊어준다.
   */
  const beforeUnloadListener = () => {
    disconnect();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadListener);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <S.RoomContainer className="roompage">
      <S.WaitingRoomContainer className="waitingroom-container">
        <RoomHeader className="roomheader-container" />
        <MemberList className="memberlist-container" />
        <TestInfo className="testinfo-container" />
      </S.WaitingRoomContainer>
      <S.ChatContainer className="chat-container">
        <Chat />
      </S.ChatContainer>
    </S.RoomContainer>
  );
}
