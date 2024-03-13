import { create } from 'zustand';

import { useFilterStoreProps } from './type';

const useFilterStore = create<useFilterStoreProps>(set => ({
  searchTitle: '',
  selectedLanguage: [],
  selectedAccess: null,
  selectedStatus: null,
  setTitle: value => set(() => ({ searchTitle: value })),
  setLanguage: value => set(() => ({ selectedLanguage: [...value] })),
  setAccess: value => set(() => ({ selectedAccess: value })),
  setStatus: value => set(() => ({ selectedStatus: value })),
}));

export default useFilterStore;
