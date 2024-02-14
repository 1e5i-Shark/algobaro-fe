import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { GlobalStateProps } from './type';

const useGlobalStore = create<GlobalStateProps>()(
  // devtools 설정
  devtools(
    persist(
      // 상태 변경 set 함수 정의
      set => ({
        exampleNum: 0,
        increaseNum: () => set(state => ({ exampleNum: state.exampleNum + 1 })),
        decreaseNum: () => set(state => ({ exampleNum: state.exampleNum - 1 })),
        resetNum: () => set({ exampleNum: 0 }),
      }),
      // 전역상태 로컬 스토리지 저장 persist 기능
      { name: 'globalStore', storage: createJSONStorage(() => localStorage) }
    )
  )
);

export default useGlobalStore;
