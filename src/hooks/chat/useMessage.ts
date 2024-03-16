import { useEffect } from 'react';

import useMessageStore from '@/store/MessageStore';

import useForceUpdate from './useForceUpdate';

export default function useMessage() {
  const forceUpdate = useForceUpdate();
  const { subscribe, unsubscribe } = useMessageStore();

  useEffect(() => {
    subscribe(forceUpdate);

    return () => unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return useMessage;
}
