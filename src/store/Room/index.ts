import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RoomType } from '@/types/room';

import { RoomStateProps } from './type';

const initialData: RoomType = {
  roomId: 10,
  roomStatus: 'RECRUITING',
  title: '같이 푸실분~',
  languages: ['JAVA', 'PYTHON', 'JAVASCRIPT', 'C++'],
  roomAccessType: 'PUBLIC',
  problemPlatform: 'BOJ',
  password: 'password1234',
  roomLimit: 4,
  tags: ['BFS', 'Level 1'],
  timeLimit: 20,
  roomShortUuid: '2ad2e9db',
  problemLink: 'https://www.acmicpc.net/problem/1000',
  currentMemberCount: 5,
  roomMembers: [
    {
      id: 1,
      nickname: '김방장',
      profileImage: '',
      role: 'HOST',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      id: 2,
      nickname: '아무개',
      role: 'MEMBER',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
      ready: false,
    },
    {
      id: 3,
      nickname: '갓코딩',
      role: 'MEMBER',
      profileImage: 'https://picsum.photos/100/100',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      id: 4,
      nickname: '헬로',
      role: 'MEMBER',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      id: 5,
      nickname: '월드',
      role: 'MEMBER',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
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
