import React, { useState } from 'react';
import useDebounced from './useDebounce';

const useDebounceQuery = (ms: number, noFirst?: boolean, noLast?: boolean) => {
  const [query, setQuery] = useState('');
  const setQueryDebounced = useDebounced(setQuery, [setQuery], ms, noFirst, noLast);
  return [query, setQueryDebounced, setQuery] as [string, typeof setQuery, typeof setQuery];
};

export default useDebounceQuery;
