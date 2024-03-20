import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ROOM_ROLE } from '@/pages/RoomPage/RoomPage.consts';
import { RoomMemberType, RoomType } from '@/types/room';

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
  timeLimit: 60,
  roomShortUuid: '',
  problemLink: '',
  currentMemberCount: 0,
  roomMembers: [],
  endTime: '',
};

const initialMyData: RoomMemberType = {
  memberId: 0,
  email: '',
  nickname: '',
  role: ROOM_ROLE.PARTICIPANT,
  profileImage: '',
  joinTime: '',
  ready: false,
};

const useRoomStore = create<RoomStateProps>()(
  devtools(
    set => ({
      roomData: initialData,
      myRoomData: initialMyData,
      setRoomData: (newRoomData: Partial<RoomType>) =>
        set(state => ({ roomData: { ...state.roomData, ...newRoomData } })),
      setMyRoomData: (newRoomData: Partial<RoomMemberType>) =>
        set(state => ({ myRoomData: { ...state.myRoomData, ...newRoomData } })),
      addRoomMembers: newMembers =>
        set(state => ({
          roomData: {
            ...state.roomData,
            roomMembers: [...state.roomData.roomMembers, ...newMembers],
          },
        })),
      reset: () =>
        set({
          roomData: initialData,
          myRoomData: initialMyData,
        }),
    }),
    { store: 'RoomStore ' }
  )
);

export default useRoomStore;
