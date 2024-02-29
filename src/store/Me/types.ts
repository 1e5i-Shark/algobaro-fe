import { MyType } from '@/types/me';

export interface MyStateProps {
  me: MyType;
  setMe: (state: Partial<MyType>) => void;
  reset: () => void;
}
