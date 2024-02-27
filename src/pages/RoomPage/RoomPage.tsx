import ChatViews from './ChatViews/ChatViews';
import * as S from './RoomPage.style';
import { Participants, RoomHeader, TestInfo } from './RoomViews';

const DUMMY_DATA = {
  roomId: 1,
  roomStatus: '문제 푸는 중',
  title: '같이 푸실분~',
  introduce: '저랑 같이 A+B 문제 푸실 분 구해요',
  roomAccessType: '공개 방',
  problemPlatform: '백준',
  problemName: 'A+B',
  password: 'password1234',
  roomLimit: 4,
  levelTag: 'Gold 4',
  algorithmTag: 'BFS',
  // roomUUID: '2ad2e9db-30af-4fa2-895c-b6b1f7e95203',
  problemLink:
    'https://school.programmers.co.kr/learn/courses/30/lessons/86051',
  // Todo: 백엔드 데이터 확인
  shortUUID: 'x15964',
  languages: ['java', 'python', 'javascript', 'cpp'],
  tags: ['Gold 4', 'BFS'],
  users: [
    {
      username: '김방장',
      status: '방장',
      image: '',
    },
    {
      username: '아무개',
      status: '준비완료',
      image: '',
    },
    {
      username: '갓코딩',
      status: '대기중',
      image: 'https://picsum.photos/100/100',
    },
    {
      username: '하이',
      status: '준비완료',
      image: '',
    },
    {
      username: '헬로월드',
      status: '대기중',
      image: '',
    },
    {
      username: '취준생',
      status: '준비완료',
      image: '',
    },
  ],
  timer: 60,
};

export default function RoomPage() {
  return (
    <S.RoomContainer>
      <S.WaitingRoomContainer>
        <RoomHeader data={DUMMY_DATA} />
        <Participants data={DUMMY_DATA.users} />
        <TestInfo data={DUMMY_DATA} />
      </S.WaitingRoomContainer>
      <S.ChatContainer>
        <ChatViews />
      </S.ChatContainer>
    </S.RoomContainer>
  );
}
