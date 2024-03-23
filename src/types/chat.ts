export type SocketType = {
  CHAT: { [key in ChatKeyUnion]: ChatValueUnion };
  ROOM: { [key in RoomKeyUnion]: RoomValueUnion };
};
export type ChatKeyUnion = 'ENTER' | 'QUIT' | 'MESSAGE';
export type ChatValueUnion = 'enter' | 'quit' | 'message';
export type RoomKeyUnion =
  | 'READY'
  | 'UNREADY'
  | 'CHANGE_HOST'
  | 'START_CODING'
  | 'END_CODING';
export type RoomValueUnion =
  | 'ready'
  | 'unready'
  | 'change-host'
  | 'start-coding'
  | 'end-coding';
