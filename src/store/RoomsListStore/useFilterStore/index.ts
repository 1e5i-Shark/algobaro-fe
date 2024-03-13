import { create } from 'zustand';

import { useFilterStoreProps } from './type';

const useFilterStore = create<useFilterStoreProps>(set => ({
  searchInputValue: '',
  selectedLanguage: [],
  selectedAccess: null,
  selectedStatus: null,
  setInputValue: value => set(() => ({ searchInputValue: value })),
  setLanguage: value =>
    set(() => ({
      selectedLanguage: typeof value === 'string' ? [value] : value,
    })),
  setAccess: value => set(() => ({ selectedAccess: value })),
  setStatus: value => set(() => ({ selectedStatus: value })),
}));

export default useFilterStore;
