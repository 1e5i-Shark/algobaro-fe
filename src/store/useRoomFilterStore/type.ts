export interface useRoomFilterStoreProps {
  searchInputValue: string;
  selectedPrivate: boolean;
  selectedAccess: boolean;
  selectedLanguage: string[];
  setSearchInputValue: (value: string) => void;
  setSelectedPrivate: (value: boolean) => void;
  setSelectedAccess: (value: boolean) => void;
  setSelectedLanguage: (value: string | string[]) => void;
}
