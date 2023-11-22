import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import { ownerDocument } from '@/utilities/dom';
import { useRef } from 'react';

type UseDragOptions = {
  onDragStart(): void;
  onDragEnd(): void;
};
export const useDrag = <T extends HTMLElement>(options: Partial<UseDragOptions> = {}) => {
  const ref = useRef<T>(null);
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const state = { isDown: false, startX: 0 };
    const onMouseDown = (ev: MouseEvent) => {
      state.isDown = true;
      options.onDragStart?.();

      const doc = ownerDocument(ref.current);
      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseLeave);
    };

    const onMouseLeave = (ev: MouseEvent) => {
      options.onDragEnd?.();
      state.isDown = false;
      stopListening();
    };
    const onMouseMove = (ev: MouseEvent) => {
      if (!state.isDown) return;
      ev.preventDefault();
      ref.current!.scrollLeft -= ev.movementX;
    };
    const stopListening = () => {
      const doc = ownerDocument(ref.current);
      doc.removeEventListener('mousemove', onMouseMove);
      doc.removeEventListener('mouseup', onMouseLeave);
    };
    ref.current.addEventListener('mousedown', onMouseDown);
    return () => {
      stopListening();
      ref.current?.removeEventListener('mousedown', onMouseDown);
    };
  }, []);
  return ref;
};
