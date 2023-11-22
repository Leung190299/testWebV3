import { useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement | SVGElement>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  handler: React.MouseEventHandler<T>
) {
  const refArray = Array.isArray(ref) ? ref : [ref];
  useEffect(
    () => {
      const listener: any = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!refArray.length || refArray.some((ref) => ref.current?.contains(event.target))) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mouseup', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mouseup', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refArray, handler]
  );
}
