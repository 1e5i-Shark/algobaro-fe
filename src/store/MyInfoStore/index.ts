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
  devtools(
    set => ({
      myInfo: initialData,
      setMyInfo: (newData: Partial<MyInfoType>) =>
        set(state => ({ myInfo: { ...state.myInfo, ...newData } })),
      reset: () =>
        set({
          myInfo: initialData,
        }),
    }),
    { store: 'MyInfoStore ' }
  )
);

export default useMyInfoStore;
