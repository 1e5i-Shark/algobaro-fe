import { ChatKeyUnion, ChatValueUnion } from '@/types/chat';

export const chatType: { [key in ChatKeyUnion]: ChatValueUnion } = {
  ENTER: 'enter',
  QUIT: 'quit',
  MESSAGE: 'message',
};
