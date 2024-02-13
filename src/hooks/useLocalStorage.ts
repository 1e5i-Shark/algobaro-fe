import { useSyncExternalStore } from 'react';

let listeners: Function[] = [];

const useLocalStorage = (key: string): [string | null, Function] => {
  const value = useSyncExternalStore(subscribe, () => getSnapshot(key));

  const setValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    emitChange();
  };

  return [value, setValue];
};

const getSnapshot = (key: string) => {
  return localStorage.getItem(key);
};

const subscribe = (listener: Function) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(li => li !== listener);
  };
};

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

export default useLocalStorage;
