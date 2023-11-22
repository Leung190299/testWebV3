import Svg from '@/components/icon/svg';
import React, { useEffect, useRef, useState } from 'react';
import type { CustomProps } from '@/types/element-type';

type ISliderMultiItem = {};
const SliderMultiItem = ({ children }: CustomProps<ISliderMultiItem>) => {
  const maxScrollWidth = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (carousel.current !== null && carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0;
  }, []);

  return (
    <div className="container relative my-0 px-0">
      {!isDisabled('prev') && (
        <button
          onClick={movePrev}
          className="btn-tertiary btn btn-circle absolute -left-24 top-1/2 h-18 w-18  -translate-y-full rotate-180 transform border border-neutral-300 bg-neutral-0 hidden xl:flex"
        >
          <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
        </button>
      )}
      <div
        ref={carousel}
        className="carousel-container scrollbar-hide relative z-0 flex touch-pan-x snap-x snap-mandatory flex-nowrap items-start justify-start gap-3 md:gap-4 xl:gap-6 overflow-x-scroll scroll-smooth py-3 md:py-6"
      >
        {children}
      </div>
      {!isDisabled('next') && (
        <button
          onClick={moveNext}
          disabled={isDisabled('next')}
          className="btn-tertiary btn btn-circle absolute -right-24 top-1/2 h-18 w-18 -translate-y-full transform border border-neutral-300 bg-neutral-0 hidden xl:flex"
        >
          <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
        </button>
      )}
    </div>
  );
};

export default SliderMultiItem;
