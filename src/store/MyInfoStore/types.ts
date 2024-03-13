import { MyInfoType } from '@/types/myInfo';

export interface MyStateProps {
  myInfo: MyInfoType;
  setMyInfo: (state: Partial<MyInfoType>) => void;
  reset: () => void;
}
