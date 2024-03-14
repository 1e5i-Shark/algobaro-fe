import { SocketType } from '@/types/chat';

export const SOCKET_TYPE: SocketType = {
  CHAT: {
    ENTER: 'enter',
    QUIT: 'quit',
    MESSAGE: 'message',
  },
  ROOM: {
    READY: 'ready',
    UNREADY: 'unready',
    CHANGE_HOST: 'change-host',
    START_CODING: 'start-coding',
    END_CODING: 'end-coding',
  },
};
