import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Spinner } from '@/components';
import { useGetUuidRoom } from '@/hooks/useRooms';
import { PATH } from '@/routes/path';
import useMyInfoStore from '@/store/MyInfoStore';
import useRoomStore from '@/store/RoomStore';

import ChatViews from './ChatViews/ChatViews';
import MemberList from './MemberList/MemberList';
import RoomHeader from './RoomHeader/RoomHeader';
import { ROOM_ROLE } from './RoomPage.consts';
import * as S from './RoomPage.style';
import TestInfo from './TestInfo/TestInfo';

export default function RoomPage() {
  const { roomData, setRoomData } = useRoomStore();
  const { roomMembers } = roomData;
  const { myInfo } = useMyInfoStore();

  const navigate = useNavigate();
  const { state: roomShortUuid } = useLocation();

  useEffect(() => {
    const isExist = roomMembers.findIndex(
      member => member.memberId === myInfo.id
    );

    if (isExist !== -1) return;

    const date = new Date().toISOString();

    const newMembers = [
      {
        memberId: myInfo.id as number,
        email: myInfo.email,
        nickname: myInfo.nickname,
        profileImage: myInfo.profileImage,
        role: ROOM_ROLE.HOST,
        joinTime: date,
        ready: true,
      },
      ...roomMembers,
    ];

    setRoomData({ roomMembers: newMembers });
  }, []);

  const { isLoading, isError, error, isSuccess } =
    useGetUuidRoom(roomShortUuid);

  const myRoomData = useMemo(() => {
    return roomMembers.filter(member => member.memberId === myInfo.id)[0];
  }, [roomMembers]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error(error);

    alert('방 정보를 불러오지 못했습니다. 잠시 후 다시 입장해주세요.');
    navigate(PATH.HOME);
  }

  if (isSuccess) {
    // Todo: API 연결 후 전역 저장
    // setRoomData(data.response);
  }

  if (!myRoomData) {
    return <Spinner />;
  }

  return (
    <S.RoomContainer className="roompage">
      <S.WaitingRoomContainer className="waitingroom-container">
        <RoomHeader
          className="roomheader-container"
          myRoomData={myRoomData}
        />
        <MemberList
          className="memberlist-container"
          myRole={myRoomData.role}
        />
        <TestInfo
          className="testinfo-container"
          myRoomData={myRoomData}
        />
      </S.WaitingRoomContainer>
      {/* Todo: Chat 컴포넌트 변경 */}
      <S.ChatContainer className="chat-container">
        <ChatViews />
      </S.ChatContainer>
    </S.RoomContainer>
  );
}
