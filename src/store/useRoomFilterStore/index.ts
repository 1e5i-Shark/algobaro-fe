import { create } from 'zustand';

import { useRoomFilterStoreProps } from './type';

const useRoomFilterStore = create<useRoomFilterStoreProps>(set => ({
  searchInputValue: '',
  selectedLanguage: [],
  selectedAccess: false,
  selectedStatus: false,
  setSearchInputValue: value => set(() => ({ searchInputValue: value })),
  setSelectedLanguage: value =>
    set(() => ({
      selectedLanguage: typeof value === 'string' ? [value] : value,
    })),
  setSelectedAccess: value => set(() => ({ selectedAccess: value })),
  setSelectedStatus: value => set(() => ({ selectedStatus: value })),
}));

export default useRoomFilterStore;
