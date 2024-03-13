import { AccessType, RoomStatusType } from '@/types/room';

export interface useFilterStoreProps {
  searchInputValue: string;
  selectedLanguage: string[] | [];
  selectedAccess: AccessType | null;
  selectedStatus: RoomStatusType | null;
  setInputValue: (value: string) => void;
  setLanguage: (value: string | string[]) => void;
  setAccess: (value: AccessType) => void;
  setStatus: (value: RoomStatusType) => void;
}
