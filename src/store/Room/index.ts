import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RoomType } from '@/types/room';

import { RoomStateProps } from './type';

const initialData: RoomType = {
  roomId: 15,
  roomStatus: 'RECRUITING',
  title: '같이 푸실분~',
  languages: ['JAVA', 'PYTHON', 'JAVASCRIPT', 'C++'],
  roomAccessType: 'PUBLIC',
  problemPlatform: 'BOJ',
  password: 'password1234',
  roomLimit: 4,
  tags: ['BFS', 'Level 1'],
  timeLimit: 20,
  roomShortUuid: 'c6574c0a',
  problemLink: 'https://www.acmicpc.net/problem/1000',
  currentMemberCount: 5,
  roomMembers: [
    {
      memberId: 1,
      email: 'king@test.com',
      nickname: '김방장',
      profileImage: '',
      role: 'HOST',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      memberId: 2,
      email: 'amu@test.com',
      nickname: '아무개',
      role: 'PARTICIPANT',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
      ready: false,
    },
    {
      memberId: 3,
      email: 'god@test.com',
      nickname: '갓코딩',
      role: 'PARTICIPANT',
      profileImage: 'https://picsum.photos/100/100',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      memberId: 4,
      email: 'hello@test.com',
      nickname: '헬로',
      role: 'PARTICIPANT',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
    },
    {
      memberId: 5,
      email: 'world@test.com',
      nickname: '월드',
      role: 'PARTICIPANT',
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
