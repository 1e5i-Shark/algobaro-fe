import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { usePageStoreProps } from './type';

const usePageStore = create<usePageStoreProps>()(
  devtools(set => ({
    currentPage: 0,
    setCurrentPage: (page: number) => set({ currentPage: page }),
  }))
);

export default usePageStore;
