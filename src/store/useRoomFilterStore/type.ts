export interface useRoomFilterStoreProps {
  searchInputValue: string;
  selectedPrivate: boolean;
  selectedAccess: boolean;
  setSearchInputValue: (value: string) => void;
  setSelectedPrivate: (value: boolean) => void;
  setSelectedAccess: (value: boolean) => void;
}
