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

const useMyInfoStore = create<MyStateProps>()(
  devtools(set => ({
    myInfo: {
      id: 1,
      email: '',
      nickname: '김방장',
      bojId: 'king',
      profileImage: '',
    },
    setMyInfo: (newData: Partial<MyInfoType>) =>
      set(state => ({ myInfo: { ...state.myInfo, ...newData } })),
    reset: () =>
      set({
        myInfo: initialData,
      }),
  }))
);

export default useMyInfoStore;
