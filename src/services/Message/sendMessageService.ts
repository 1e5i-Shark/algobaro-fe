import Stomp from '@stomp/stompjs';

import { PATH } from '@/routes/path';
import { ChatValueUnion } from '@/types/chat';

interface MessageProps {
  client: Stomp.Client;
  type: ChatValueUnion;
  messageToSend: {
    roomId: number;
    userId: string;
    message: string;
  };
}

export const sendMessageService = ({
  client,
  type,
  messageToSend,
}: MessageProps) => {
  client.publish({
    destination: `${PATH.PUBPREFIX}/chat/${type}`,
    body: JSON.stringify(messageToSend),
  });
};
