import { clamp } from '@/utilities/number';
import { getPointerPosition } from '@/utilities/position';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useGlobalEventListener from '@pit-ui/modules/hooks/useGlobalEventListener';
import React, { CSSProperties, useCallback, useRef, useState } from 'react';

type Props = {
  onClick?(): void;
};

type State = {
  initialPosition: { left: number; top: number };
  initialPos: number[];
  time: number;
  elementSize: { width: number; height: number };
};

type ReturnUseDragItem<T> = [CSSProperties, { onMouseDown: React.MouseEventHandler<HTMLElement>; container: React.RefObject<T> }];
const useDragItem = <T extends HTMLElement>({ onClick }: Props): ReturnUseDragItem<T> => {
  const [position, setPosition] = useState<CSSProperties>({ top: undefined, left: undefined });
  const isMouseDown = useBoolean(false);
  const state = useRef<State>({
    initialPosition: { left: 0, top: 0 },
    initialPos: [0, 0],
    time: 0,
    elementSize: { width: 0, height: 0 }
  }).current;
  const container = useRef<T>(null);
  function onMouseDown(e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>) {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
    e.stopPropagation();
    e.preventDefault();
    isMouseDown.setTrue();
    const element = container.current || e.currentTarget;
    const bcr = element.getBoundingClientRect();
    state.time = Date.now();
    state.initialPos = getPointerPosition(e.nativeEvent);
    state.initialPosition = { left: bcr.left, top: bcr.top };
    state.elementSize.width = bcr.width;
    state.elementSize.height = bcr.height;
  }
  const onExit = useCallback(() => {
    if (onClick && Date.now() - state.time < 100) onClick();
    isMouseDown.setFalse();
  }, [isMouseDown, onClick, state]);
  const onMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown.value) return;
      const position = getPointerPosition(e);
      const movementX = position[0] - state.initialPos[0];
      const movementY = position[1] - state.initialPos[1];

      const maxX = innerWidth - state.elementSize.width;
      const maxY = innerHeight - state.elementSize.height;
      const x = clamp(state.initialPosition.left + movementX, 0, maxX);
      const y = clamp(state.initialPosition.top + movementY, 0, maxY);
      requestAnimationFrame(() =>
        setPosition({
          top: (y * 100) / innerHeight + '%',
          left: (x * 100) / innerWidth + '%',
          right: 'auto',
          bottom: 'auto'
        })
      );
    },
    [isMouseDown.value, state]
  );
  useGlobalEventListener('mouseup', onExit);
  useGlobalEventListener('touchend', onExit);
  useGlobalEventListener('mousemove', onMove);
  useGlobalEventListener('touchmove', onMove);

  return [position, { onMouseDown, container }];
};
export { useDragItem };
