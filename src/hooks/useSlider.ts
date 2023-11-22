import { Direction } from '@/components/carousel/full-carousel';
import React, { useCallback, useEffect, useState } from 'react';

type Options = {
  totalSlide: number;
  loop?: number;
};

const useSlider = ({ totalSlide, loop }: Options) => {
  const [index, setActive] = useState(0);
  const [direction, setDirection] = useState(Direction.NEXT);

  const onSlide = useCallback(
    (direction: Direction) => {
      setDirection(direction);
      setActive((prev) => (prev + direction === totalSlide ? 0 : prev + direction === -1 ? totalSlide - 1 : prev + direction));
    },
    [totalSlide]
  );
  function onSetActive(nextIndex: number) {
    setDirection(nextIndex > index ? Direction.NEXT : Direction.PREV);
    setActive(nextIndex);
  }

  useEffect(() => {
    if (loop) {
      let timeout = setTimeout(() => {
        onSlide(Direction.NEXT);
      }, loop);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, index]);

  return { index, direction, onSlide, onChange: onSetActive };
};

export default useSlider;
