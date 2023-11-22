import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { MutableRefObject, useEffect } from 'react';

const useIsSticky = (ref: MutableRefObject<HTMLElement | null>, options?: IntersectionObserverInit) => {
  const sticky = useBoolean(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        sticky.setValue(e.intersectionRatio < 1);
      },
      { threshold: [1], ...options }
    );

    ref.current ? observer.observe(ref.current) : void 0;
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.rootMargin]);
  return sticky.value;
};

export default useIsSticky;
