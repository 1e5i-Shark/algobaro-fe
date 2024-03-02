export interface useRoomFilterStoreProps {
  searchInputValue: string;
  selectedLanguage: string[];
  selectedPrivate: boolean;
  selectedAccess: boolean;
  setSearchInputValue: (value: string) => void;
  setSelectedLanguage: (value: string | string[]) => void;
  setSelectedPrivate: (value: boolean) => void;
  setSelectedAccess: (value: boolean) => void;
}
