import { useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);
  useEffect(() => {
    if (value) {
      setIsDebouncing(true);
    }

    const debounceTimeOut = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);
    return () => {
      clearTimeout(debounceTimeOut);
      setIsDebouncing(false);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};
