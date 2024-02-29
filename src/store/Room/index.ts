import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RoomType } from '@/types/room';

import { RoomStateProps } from './type';

const initialData: RoomType = {
  roomId: 6,
  introduce: '저랑 같이 A+B 문제 푸실 분 구해요',
  startAt: '2024-02-29T07:35:09.479Z',
  roomStatus: 'RECRUITING',
  title: '같이 푸실분~',
  roomAccessType: 'PUBLIC',
  problemLink: 'https://www.acmicpc.net/problem/1000',
  problemPlatform: '백준',
  problemName: 'A+B',
  password: 'password1234',
  roomLimit: 4,
  tags: ['Gold4', 'BFS'],
  timeLimit: 20,
  roomUUID: '2ad2e9db-30af-4fa2-895c-b6b1f7e95202',
  languages: ['java', 'python', 'javascript', 'cpp'],
  members: [
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
};

const useRoomStore = create<RoomStateProps>()(
  devtools(set => ({
    roomData: { ...initialData },
    setRoomData: (newRoomData: Partial<RoomType>) =>
      set(state => ({ roomData: { ...state.roomData, ...newRoomData } })),
  }))
);

export default useRoomStore;
