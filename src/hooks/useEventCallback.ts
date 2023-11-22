import { useCallback, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return {
  const ref = useRef(fn);
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback(
    (...args: Args) =>
      // @ts-expect-error hide `this`
      // tslint:disable-next-line:ban-comma-operator
      (0, ref.current!)(...args),
    []
  );
}
