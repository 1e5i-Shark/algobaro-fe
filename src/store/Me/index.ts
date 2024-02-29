import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MyType } from '@/types/me';

import { MyStateProps } from './types';

const initialData = {
  id: 2,
  email: '',
  nickname: '',
  bojId: '',
  profileImage: '',
};

const useMeStore = create<MyStateProps>()(
  devtools(set => ({
    me: {
      id: 1,
      email: '',
      nickname: '김방장',
      bojId: 'king',
      profileImage: '',
    },
    setMe: (newMyData: Partial<MyType>) =>
      set(state => ({ me: { ...state.me, ...newMyData } })),
    reset: () =>
      set({
        me: initialData,
      }),
  }))
);

export default useMeStore;
