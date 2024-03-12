import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MyInfoType } from '@/types/myInfo';

import { MyStateProps } from './type';

const initialData = {
  id: null,
  email: '',
  nickname: '',
  bojId: '',
  profileImage: null,
};

const useMyInfoStore = create<MyStateProps>()(
  devtools(set => ({
    myInfo: { ...initialData },
    setMe: (newMyData: Partial<MyInfoType>) =>
      set(state => ({ myInfo: { ...state.myInfo, ...newMyData } })),
    reset: () =>
      set({
        myInfo: initialData,
      }),
  }))
);

export default useMyInfoStore;
