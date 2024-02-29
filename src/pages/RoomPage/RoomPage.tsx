import ChatViews from './ChatViews/ChatViews';
import * as S from './RoomPage.style';
import { Participants, RoomHeader, TestInfo } from './RoomViews';

export default function RoomPage() {
  // console.log(roomData);

  // 개별 방 정보 조회
  // const { data, isLoading, error, isSuccess } = useQuery<RoomResponse>({
  //   queryKey: ['room'],
  //   queryFn: async () =>
  //     await axiosAuthInstance.get(`/v1/rooms/${DUMMY_DATA.roomUUID}`),
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
    <S.RoomContainer>
      <S.WaitingRoomContainer>
        <RoomHeader />
        <Participants />
        <TestInfo />
      </S.WaitingRoomContainer>
      <S.ChatContainer>
        <ChatViews />
      </S.ChatContainer>
    </S.RoomContainer>
  );
}
