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
import { ROOM_ROLE } from './RoomPage.consts';
import * as S from './RoomPage.style';
import TestInfo from './TestInfo/TestInfo';

export default function RoomPage() {
  const { myRoomData, setMyRoomData, setRoomData } = useRoomStore();
  const { myInfo } = useMyInfoStore();
  const { connected, connect, disconnect } = useMessageStore();

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
      refetch();
    } else {
      disconnect();
    }
    // 참여인원이 추가되었으므로 다시 refetch
  }, []);

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

      const date = new Date().toISOString();
      setMyRoomData({
        memberId: myInfo.id as number,
        email: myInfo.email,
        nickname: myInfo.nickname,
        profileImage: myInfo.profileImage,
        role:
          roomMembersData.length >= 1 ? ROOM_ROLE.PARTICIPANT : ROOM_ROLE.HOST,
        joinTime: date,
        ready: false,
      });

      if (!myInfo.id) return;

      const myData = findMyRoomData(roomMembersData, myInfo.email);
      if (myData) {
        setMyRoomData(myData);
      }
    }
  }, [data]);

  const beforeUnloadListener = async () => {
    if (connected) {
      await disconnect();
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadListener);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, []);

  // 삭제 예정: myRoomData 디버깅 코드
  if (!myRoomData) {
    return <div>myRoomData가 없습니다.</div>;
  }

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
