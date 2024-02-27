import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Spinner } from '@/components';
import { axiosAuthInstance } from '@/services/axiosInstance';

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
  roomUUID: '2ad2e9db-30af-4fa2-895c-b6b1f7e95203',
  tags: '{ Gold4, BFS }',
  // Todo: 백엔드 데이터 확인
  problemLink:
    'https://school.programmers.co.kr/learn/courses/30/lessons/86051',
  shortUUID: 'x15964',
  languages: ['java', 'python', 'javascript', 'cpp'],
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
  timeLimit: 68,
};

export default function RoomPage() {
  // 개별 방 정보 조회
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['room'],
    queryFn: async () =>
      await axiosAuthInstance.get(`/v1/rooms/`, {
        params: {
          roomUuid: `${DUMMY_DATA.roomUUID}`,
        },
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('data: ' + data);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>RoomPage API 호출 실패</h1>;
  }

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
