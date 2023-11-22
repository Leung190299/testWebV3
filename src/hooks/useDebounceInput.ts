import { useEffect, useState } from 'react';

const useDebounceInput = <T>(value: T, milliSeconds: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [milliSeconds, value]);

  return debouncedValue;
};

export default useDebounceInput;
