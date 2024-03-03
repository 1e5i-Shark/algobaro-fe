export interface useRoomFilterStoreProps {
  searchInputValue: string;
  selectedLanguage: string[];
  selectedAccess: boolean;
  selectedStatus: boolean;
  setSearchInputValue: (value: string) => void;
  setSelectedLanguage: (value: string | string[]) => void;
  setSelectedAccess: (value: boolean) => void;
  setSelectedStatus: (value: boolean) => void;
}
