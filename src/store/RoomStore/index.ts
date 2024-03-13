import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { RoomType } from '@/types/room';

import { RoomStateProps } from './type';

const initialData: RoomType = {
  roomId: 0,
  roomStatus: 'RECRUITING',
  title: '',
  languages: [],
  roomAccessType: 'PUBLIC',
  problemPlatform: '',
  password: '',
  roomLimit: 4,
  tags: [],
  timeLimit: 20,
  roomShortUuid: '',
  problemLink: '',
  currentMemberCount: 0,
  roomMembers: [],
};

const DUMMY_DATA: RoomType = {
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
      memberId: 2,
      email: 'amu@test.com',
      nickname: '아무개',
      role: 'PARTICIPANT',
      profileImage: '',
      joinTime: '2024-03-04T00:45:18',
      ready: true,
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
    roomData: DUMMY_DATA,
    setRoomData: (newRoomData: Partial<RoomType>) =>
      set(state => ({ roomData: { ...state.roomData, ...newRoomData } })),
    reset: () =>
      set({
        roomData: initialData,
      }),
  }))
);

export default useRoomStore;
