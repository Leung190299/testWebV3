import React, { useEffect, useRef, useState } from 'react';

type Props = {};

const useRefScrollProgress = <T extends HTMLElement | SVGElement>() => {
  const ref = useRef<T>(null);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  useEffect(() => {
    if (!ref.current) return;

    const y = scrollY;
    const rect = ref.current.getBoundingClientRect();

    const top = y + rect.top;
    const bottom = y + rect.bottom;

    setTop(top);
    setBottom(bottom);
  }, []);
  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const y = scrollY;
      const limit = bottom - top;
      const distance = Math.min(limit, Math.max(0, bottom - y));
      let progress = 0;

      progress = 1 - distance / limit;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [top, bottom]);

  return { ref, top, bottom };
};

export default useRefScrollProgress;
