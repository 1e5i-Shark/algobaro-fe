import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MyInfoType } from '@/types/myInfo';

import { MyStateProps } from './types';

const initialData = {
  id: null,
  email: '',
  nickname: '',
  bojId: '',
  profileImage: null,
};

const DUMMY_DATA = {
  id: 1,
  email: 'king@test.com',
  nickname: '김방장',
  bojId: 'king',
  profileImage: null,
};

const useMyInfoStore = create<MyStateProps>()(
  devtools(set => ({
    myInfo: DUMMY_DATA,
    setMyInfo: (newData: Partial<MyInfoType>) =>
      set(state => ({ myInfo: { ...state.myInfo, ...newData } })),
    reset: () =>
      set({
        myInfo: initialData,
      }),
  }))
);

export default useMyInfoStore;
