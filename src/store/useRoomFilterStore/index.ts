import { create } from 'zustand';

import { useRoomFilterStoreProps } from './type';

const useRoomFilterStore = create<useRoomFilterStoreProps>(set => ({
  searchInputValue: '',
  selectedLanguage: [],
  selectedPrivate: false,
  selectedAccess: false,
  setSearchInputValue: value => set(() => ({ searchInputValue: value })),
  setSelectedLanguage: value =>
    set(() => ({
      selectedLanguage: typeof value === 'string' ? [value] : value,
    })),
  setSelectedPrivate: value => set(() => ({ selectedPrivate: value })),
  setSelectedAccess: value => set(() => ({ selectedAccess: value })),
}));

export default useRoomFilterStore;
