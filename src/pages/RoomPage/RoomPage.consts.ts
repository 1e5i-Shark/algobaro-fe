import { AccessType, RoleType, RoomStatusType } from '@/types/room';

export const ROOM_STATUS: { [key: string]: RoomStatusType } = {
  RECRUITING: 'RECRUITING',
  RUNNING: 'RUNNING',
};

export const ROOM_ACCESS: { [key: string]: AccessType } = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

export const ROOM_ROLE: { [key: string]: RoleType } = {
  HOST: 'HOST',
  PARTICIPANT: 'PARTICIPANT',
};
