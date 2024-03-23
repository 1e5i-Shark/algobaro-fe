import { AccessType, RoomStatusType } from '@/types/room';

export interface useFilterStoreProps {
  searchTitle: string;
  selectedLanguage: string[];
  selectedAccess: AccessType | null;
  selectedStatus: RoomStatusType | null;
  setTitle: (value: string) => void;
  setLanguage: (value: string[]) => void;
  setAccess: (value: AccessType) => void;
  setStatus: (value: RoomStatusType) => void;
}
