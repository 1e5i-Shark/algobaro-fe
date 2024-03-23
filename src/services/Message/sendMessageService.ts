import Stomp from '@stomp/stompjs';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';
import { ChatValueUnion, RoomValueUnion } from '@/types/chat';

import { API_ENDPOINT } from '../apiEndpoint';

interface MessageProps {
  client: Stomp.Client;
  type: ChatValueUnion | RoomValueUnion;
  messageToSend: {
    roomShortUuid: string;
    message: string;
  };
}

export const sendMessageService = ({
  client,
  type,
  messageToSend,
}: MessageProps) => {
  client.publish({
    destination: `${API_ENDPOINT.SOCKET.PUBLICATION}/chat/${type}`,
    body: JSON.stringify(messageToSend),
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
    },
  });
};
