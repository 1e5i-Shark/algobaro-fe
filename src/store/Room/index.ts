import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RoomType } from '@/types/room';

import { RoomStateProps } from './type';

const initialData: RoomType = {
  roomId: 10,
  roomStatus: 'RECRUITING',
  title: '같이 푸실분~',
  introduce: '저랑 같이 A+B 문제 푸실 분 구해요',
  roomAccessType: 'PUBLIC',
  problemPlatform: 'BOJ',
  problemName: 'A+B',
  problemLink: 'https://www.acmicpc.net/problem/1000',
  password: 'password1234',
  roomLimit: 4,
  tags: ['BFS', 'Level 1'],
  timeLimit: 20,
  roomUUID: '2ad2e9db-30af-4fa2-895c-b6b1f7e95203',
  languages: ['java', 'python', 'javascript', 'cpp'],
  members: [
    {
      id: 1,
      nickname: '김방장',
      bojId: 'king',
      profileImage: '',
      role: 'HOST',
      ready: true,
    },
    {
      id: 2,
      nickname: '아무개',
      bojId: 'anyone',
      role: 'MEMBER',
      profileImage: '',
      ready: false,
    },
    {
      id: 3,
      nickname: '갓코딩',
      bojId: 'godCoding',
      role: 'MEMBER',
      profileImage: 'https://picsum.photos/100/100',
      ready: true,
    },
    {
      id: 4,
      nickname: '하이',
      bojId: 'hi',
      role: 'MEMBER',
      profileImage: '',
      ready: true,
    },
    {
      id: 5,
      nickname: '헬로월드',
      bojId: 'hello',
      role: 'MEMBER',
      profileImage: '',
      ready: true,
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
