import { create } from 'zustand';

import { useRoomFilterStoreProps } from './type';

const useRoomFilterStore = create<useRoomFilterStoreProps>(set => ({
  searchInputValue: '',
  selectedPrivate: false,
  selectedAccess: false,
  // selectedLanguage: '', // 일단 보류
  setSearchInputValue: value => set(() => ({ searchInputValue: value })),
  setSelectedPrivate: value => set(() => ({ selectedPrivate: value })),
  setSelectedAccess: value => set(() => ({ selectedAccess: value })),
}));

export default useRoomFilterStore;
