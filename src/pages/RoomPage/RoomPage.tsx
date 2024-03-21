import { useEffect, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Chat, Spinner } from '@/components';
import { SOCKET_TYPE } from '@/constants/socket';
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
  const {
    roomData,
    setMyRoomData,
    setRoomData,
    reset: resetRoom,
  } = useRoomStore();

  const {
    client,
    subscription,
    receiveLogs,
    listeners,
    connect,
    disconnect,
    setMessageValue,
    reset: resetMessage,
  } = useMessageStore();

  const { data: myInfo, refetch: refetchMyInfo } = useMyInfo();

  const { roomShortUuid } = useParams();
  const navigate = useNavigate();

  if (!roomShortUuid) {
    return <Navigate to={PATH.HOME} />;
  }

  const {
    data,
    isLoading,
    isError,
    refetch: refetchRoom,
  } = useGetUuidRoom(roomShortUuid);

  const roomDataMemoized = useMemo(() => data, [data?.response]);

  useEffect(() => {
    connect(roomShortUuid);
    refetchMyInfo();

    return () => {
      if (!client || !subscription) return;

      subscription.unsubscribe();
      client.deactivate();

      resetMessage();
      resetRoom();
    };
  }, []);

  useEffect(() => {
    refetchRoom();

    if (receiveLogs.at(-1) === SOCKET_TYPE.ROOM.START_CODING) {
      setMessageValue({ messageLogs: [] });
      navigate(`${PATH.PROBLEMSOLVE}/${roomShortUuid}`, { replace: true });
    }

    if (myInfo && data?.response) {
      setRoomData(data.response);
    }
  }, [myInfo, roomDataMemoized, listeners, receiveLogs]);

  useEffect(() => {
    if (!myInfo) return;

    const myData = findMyRoomData(roomData.roomMembers, myInfo.response.email);

    if (myData) {
      setMyRoomData(myData);
    }
  }, [roomData]);

  if (isError) {
    alert('방 정보를 불러오지 못했습니다. 잠시 후 다시 입장해주세요.');
    return <Navigate to={PATH.HOME} />;
  }

  const beforeUnloadListener = (e: BeforeUnloadEvent) => {
    e.preventDefault();

    disconnect();
    resetRoom();
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
