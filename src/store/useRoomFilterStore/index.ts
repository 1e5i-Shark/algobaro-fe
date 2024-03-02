import { create } from 'zustand';

import { useRoomFilterStoreProps } from './type';

const useRoomFilterStore = create<useRoomFilterStoreProps>(set => ({
  searchInputValue: '',
  selectedPrivate: false,
  selectedAccess: false,
  selectedLanguage: [],
  setSearchInputValue: value => set(() => ({ searchInputValue: value })),
  setSelectedPrivate: value => set(() => ({ selectedPrivate: value })),
  setSelectedAccess: value => set(() => ({ selectedAccess: value })),
  setSelectedLanguage: value =>
    set(() => ({
      selectedLanguage: typeof value === 'string' ? [value] : value,
    })),
}));

export default useRoomFilterStore;
