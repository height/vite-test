import { useRef, useState } from 'react';
import { getCache, setCache } from '../utils/cache';

export const useBeforeMount = (callback?: () => void) => {
  const hasRun = useRef(false);

  if (!hasRun.current) {
    callback?.();
    hasRun.current = true;
  }
};

export const useCache = <T>(keyPath: string, defaultValue: T) => {
  const [state, setState] = useState(getCache(keyPath) || defaultValue);
  return [
    state,
    (newVal: T, expireMinutes?: number) => {
      setCache(keyPath, newVal, expireMinutes);
      setState(newVal);
    },
  ];
};
