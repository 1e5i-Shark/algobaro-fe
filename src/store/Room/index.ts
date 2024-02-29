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
      id: 1,
      nickname: '김방장',
      bojId: 'king',
      profileImage: '',
      role: 'HOST',
    },
    {
      id: 2,
      nickname: '아무개',
      bojId: 'anyone',
      role: 'READY',
      profileImage: '',
    },
    {
      id: 3,
      nickname: '갓코딩',
      bojId: 'godCoding',
      role: 'WAITING',
      profileImage: 'https://picsum.photos/100/100',
    },
    {
      id: 4,
      nickname: '하이',
      bojId: 'hi',
      role: 'READY',
      profileImage: '',
    },
    {
      id: 5,
      nickname: '헬로월드',
      bojId: 'hello',
      role: 'WAITING',
      profileImage: '',
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
