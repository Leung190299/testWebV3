import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import FullCarousel, { Direction, FullCarouselItem } from '../carousel/full-carousel';
import PaginationBullets from '../pagination/pagination-bullets';
import { variantsTranslate } from '../carousel/carousel-variants';

type Props = {
  autoplay?: boolean;
  time?: number;
  data: Array<{
    id: number;
    img: string;
    title: string;
    actionTitle: string;
    type?: 'blue' | 'red';
  }>;
};

const CoupleSimAdvertising = ({ data, autoplay, time = 6000 }: CustomProps<Props, 'section'>) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const onChangeIndex = (newVal: number) => {
    if (!data.length) return;
    if (newVal >= data.length) setIndex(0);
    else if (newVal < 0) setIndex(data.length - 1);
    else setIndex(newVal);
  };
  const onSlide = (direciton: Direction) => {
    setDirection(direciton);

    const newVal = index - direciton;
    onChangeIndex(newVal);
  };
  const onChangePage = (newVal: number) => {
    setDirection(-(newVal > index ? Direction.NEXT : Direction.PREV));
    onChangeIndex(newVal);
  };
  useEffect(() => {
    if (!autoplay) return;
    const timeout = setTimeout(() => {
      onChangePage(index + 1);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [autoplay, index]);

  const item = data[index];

  return (
    <FullCarousel
      index={index}
      onSlide={onSlide}
      numItems={data.length}
      className="block-img block-cinema overflow-hidden xl:pb-0 xl:h-[42.5rem]"
      data-theme="dark"
    >
      <FullCarouselItem variants={variantsTranslate} index={index} direction={-direction}>
        <div className="relative h-full w-full">
          <img src={`${item.img}`} alt="img" className="absolute inset-0 h-full w-full object-cover object-right" />
          <div className="container h-full">
            <div className="flex h-full flex-col justify-center relative z-20 xl:w-full md:w-3/5">
              <h2 className="whitespace-pre font-itel xl:text-h0 text-h-xs md:text-h3">
                <b>{item.title}</b>
              </h2>
              <p className="max-md:hidden mt-2 xl:text-xl md:text-base font-medium text-neutral-200">{item.actionTitle}</p>
            </div>
          </div>
        </div>
      </FullCarouselItem>
      <div className="max-md:hidden absolute bottom-6 w-full bg-transparent xl:bottom-8">
        <PaginationBullets total={data.length} active={index} onClick={onChangePage} />
      </div>
    </FullCarousel>
  );
};

export default CoupleSimAdvertising;
