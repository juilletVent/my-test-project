import { isNil } from 'lodash';
import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef<Function>(callback);

  // 每次更新都刷新callback，以便callback能获取到最近的state、props
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const timeProcess = () => callbackRef.current();

    if (!isNil(delay)) {
      const timerHandle = setInterval(timeProcess, delay);
      return () => clearInterval(timerHandle);
    }
  }, [delay, callback]);
}
