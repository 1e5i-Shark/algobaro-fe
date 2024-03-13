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

const useRoomStore = create<RoomStateProps>()(
  devtools(set => ({
    roomData: initialData,
    setRoomData: (newRoomData: Partial<RoomType>) =>
      set(state => ({ roomData: { ...state.roomData, ...newRoomData } })),
    reset: () =>
      set({
        roomData: initialData,
      }),
  }))
);

export default useRoomStore;
