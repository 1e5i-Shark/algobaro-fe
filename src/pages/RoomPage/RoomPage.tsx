import { useMemo } from 'react';

import useMeStore from '@/store/Me';
import useRoomStore from '@/store/Room';

import ChatViews from './ChatViews/ChatViews';
import * as S from './RoomPage.style';
import { MemberList, RoomHeader, TestInfo } from './RoomViews';

export default function RoomPage() {
  const { me } = useMeStore();
  const { roomData } = useRoomStore();
  const { members, roomId } = roomData;

  const myRoomData = useMemo(
    () => members.filter(member => member.id === me.id)[0],
    [roomId, members]
  );

  // Todo: 개별 방 정보 조회 API
  // const { data, isLoading, error, isSuccess } = useQuery({
  //   queryKey: [ROOM_UUID_INFO],
  //   queryFn: async () => await getUuidRoom(`/${roomUUID}`),
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setRoomData(data.response);
  //     console.log(roomData);
  //   }
  // }, [isSuccess]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   return <h1>RoomPage API 호출 실패</h1>;
  // }

  return (
    <S.RoomContainer className="roompage">
      <S.WaitingRoomContainer className="waitingroom">
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
      <S.ChatContainer className="chat-room">
        <ChatViews />
      </S.ChatContainer>
    </S.RoomContainer>
  );
}
