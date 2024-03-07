import { useEffect } from 'react';

import useMessageStore from '@/store/MessageStore';

import useForceUpdate from './useForceUpdate';

export default function useMessage() {
  const forceUpdate = useForceUpdate();
  const { subscribe, unSubscribe } = useMessageStore();

  useEffect(() => {
    subscribe(forceUpdate);

    return () => unSubscribe(forceUpdate);
  }, [forceUpdate]);

  return useMessage;
}
