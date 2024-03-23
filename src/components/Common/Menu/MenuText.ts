import { MouseEvent } from 'react';

export interface MenuListProps {
  id: number;
  text: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export const MENU_TEXT = {
  REPORT: '신고하기',
  TRANSFER_HOST: '방장 위임',
  KICKOUT: '강제 퇴장',
};
