import Stomp from '@stomp/stompjs';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';

import { API_ENDPOINT } from '../apiEndpoint';

interface Props {
  client: Stomp.Client | null;
  destination: string;
  body: Record<string, unknown>;
}

export const sendMessageService = ({ client, destination, body }: Props) => {
  client?.publish({
    destination: `${API_ENDPOINT.AUDIO.PUBLICATION}${destination}`,
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
    },
  });
};
