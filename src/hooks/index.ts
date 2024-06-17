import { useRef } from 'react';

export const useBeforeMount = (callback?: () => void) => {
  const hasRun = useRef(false);

  if (!hasRun.current) {
    callback?.();
    hasRun.current = true;
  }
};
