import { MyInfoType } from '@/types/myInfo';

export interface MyStateProps {
  myInfo: MyInfoType;
  setMe: (state: Partial<MyInfoType>) => void;
  reset: () => void;
}
