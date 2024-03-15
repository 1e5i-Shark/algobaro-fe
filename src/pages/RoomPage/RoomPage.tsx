import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Chat, Spinner } from '@/components';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { PATH } from '@/routes/path';
import useMessageStore from '@/store/MessageStore';
import useMyInfoStore from '@/store/MyInfoStore';
import useRoomStore from '@/store/RoomStore';

import { findMyRoomData } from './findMyRoomData';
import MemberList from './MemberList/MemberList';
import RoomHeader from './RoomHeader/RoomHeader';
import * as S from './RoomPage.style';
import TestInfo from './TestInfo/TestInfo';

export default function RoomPage() {
  const { myRoomData, setMyRoomData, setRoomData } = useRoomStore();
  const { myInfo } = useMyInfoStore();
  const { connected, listeners, connect, disconnect } = useMessageStore();

  const { roomShortUuid } = useParams();

  if (!roomShortUuid) {
    return <Navigate to={PATH.HOME} />;
  }

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetUuidRoom(roomShortUuid);

  useEffect(() => {
    // 소켓 초기 연결
    if (!connected) {
      connect(roomShortUuid);
    } else {
      disconnect();
    }
  }, []);

  // 참여인원이 추가되었으므로 다시 refetch
  useEffect(() => {
    refetch();
  }, [listeners]);

  // Todo: 새로고침했을 때 다시 connect하는 대응
  // const reconnectSocketServer = (id: string) => {
  //   connect(id);
  // };

  // useEffect(() => {
  //   if (!connected) {
  //     reconnectSocketServer(roomShortUuid);
  //   } else {
  //     disconnect();
  //   }
  // }, []);

  if (isError) {
    console.error(error);

    alert('방 정보를 불러오지 못했습니다. 잠시 후 다시 입장해주세요.');
    return <Navigate to={PATH.HOME} />;
  }

  useEffect(() => {
    if (isSuccess && data.response) {
      const { roomMembers: roomMembersData } = data.response;
      setRoomData(data.response);

      if (!myInfo.id) return;

      const myData = findMyRoomData(roomMembersData, myInfo.email);
      if (myData) {
        setMyRoomData(myData);
      }
    }
  }, [data]);

  /**
   * 웹소켓은 새로고침, 페이지 이동 시 연결이 끊긴다.
   * 그러나 비정상적인 네트워크 종료 등으로 브라우저가 갑작스럽게 연결이 끊기면 서버 측에서 이를 감지하기 어려울 수 있다.
   * 따라서 beforeUnloadListener로 명시적으로 웹소켓 연결을 끊어준다.
   */
  const beforeUnloadListener = () => {
    if (connected) {
      disconnect();
    }
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
