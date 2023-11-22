import Svg from '@/components/icon/svg';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

type IChatBoxCarousel = {
  items: any[]
};
const ChatBoxCarousel = ({ children, items }: CustomProps<IChatBoxCarousel>) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? items.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === items.length - 1 ? 0 : curr + 1));

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return curr <= 0;
    }

    if (direction === 'next' && curr !== null) {
      return curr === items.length - 1;
    }

    return false;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      next();
    },
    onSwipedRight: () => {
      prev();
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true
  });

  return (
    <>
      {!isDisabled('prev') ? (
        <button
          onClick={prev}
          disabled={isDisabled('prev')}
          className="btn-tertiary btn btn-circle absolute left-0 top-1/3 h-10 w-10 -translate-y-full rotate-180 transform border border-neutral-300 bg-neutral-0 z-10"
        >
          <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
        </button>
      ) : <></>}
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 240}px)` }} {...handlers}>
        {items.map((item, i) => (
          <div key={`ci-${i}`} className='mr-2'>
            <div className={clsx('w-[240px] bg-neutral-0 text-neutral-800 rounded-xl text-sm')}>
              <img draggable={false} className='rounded-t-xl h-[135px] w-[240px]' src={item.img} alt={item.title} />
              <div className='px-4 py-3'>
                <div className='text-red-500 font-bold text-sm'>{item.title}</div>
                <div className='text-neutral-500 text-xs'>{item.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isDisabled('next') ? (
        <button
          onClick={next}
          disabled={isDisabled('next')}
          className="btn-tertiary btn btn-circle absolute right-[8%] top-1/3 h-10 w-10 -translate-y-full transform border border-neutral-300 bg-neutral-0 z-10"
        >
          <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
        </button>
      ) : <></>}
    </>
  );
};

export default ChatBoxCarousel;
