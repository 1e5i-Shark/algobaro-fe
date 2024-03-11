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
    CHANGE: 'change-host',
    START: 'start-coding',
    END: 'end-coding',
  },
};
