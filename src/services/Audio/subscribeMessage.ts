import Stomp from '@stomp/stompjs';

import { LOCAL_ACCESSTOKEN } from '@/constants/localStorageKey';

import { API_ENDPOINT } from '../apiEndpoint';

interface Props {
  client: Stomp.Client | null;
  destination: string;
  callback: (message: Stomp.Message) => void;
}

export const subscribeMessage = ({ client, destination, callback }: Props) => {
  client?.subscribe(
    `${API_ENDPOINT.AUDIO.SUBSCRIPTION}${destination}`,
    callback,
    {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_ACCESSTOKEN)}`,
    }
  );
};
