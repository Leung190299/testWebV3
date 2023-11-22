import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { AnimatePresence, MotionConfig, motion, Variants } from 'framer-motion';
import React, { ReactNode, useReducer } from 'react';
import { useSwipeable } from 'react-swipeable';

type FullCarouselItemProps = {
  id?: string | number;
  index: number;
  direction: number;
  children: ReactNode;
  variants?: Variants;
  className?: string;
  style?: React.CSSProperties;
};

export enum Direction {
  NEXT = 1,
  PREV = -1
}

type FullCarouselProps = {
  numItems: number;
  index: number;
  onSlide(direction: Direction): void;
  duration?: number;
};
const FullCarousel = ({ numItems, children, onSlide, index, duration = 0.5, ...rest }: CustomProps<FullCarouselProps>) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onSlide(Direction.PREV);
    },
    onSwipedRight: () => {
      onSlide(Direction.NEXT);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true
  });
  return (
    <MotionConfig
      transition={{
        x: { stiffness: 300, damping: 30, duration },
        opacity: { duration },
        rotateY: { duration }
      }}
    >
      <div {...rest} {...handlers}>
        {children}
      </div>
    </MotionConfig>
  );
};
const FullCarouselItem = ({ id, index, direction, children, variants, className, ...rest }: FullCarouselItemProps) => {
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={id || index}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className={clsx('absolute inset-0', className)}
        {...rest}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export { FullCarouselItem };
export default FullCarousel;
