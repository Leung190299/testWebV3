import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Svg from '../icon/svg';

import { clamp } from '@/utilities/number';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Direction } from '../carousel/full-carousel';

type simOptionItem = {
  id: number;
  image: string;
  label: string;
  href: string;
};

type QualitySimCardProps = {
  simOption: simOptionItem[];
};

const QualitySimCard = ({ simOption }: QualitySimCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });
  const progress = useTransform(scrollXProgress, [0, 1], [1, total - 2]);

  function handleNavigate(direction: Direction) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + scrollRef.current.children[0].clientWidth * direction,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <div className="text-center">
        <span className="section-title-sub whitespace-pre-line">
          SIM SỐ CHẤT. ƯU ĐÃI KHỦNG{'\n'}
          <span className="text-red-500">THỎA THÍCH LỰA CHỌN</span>
        </span>
        <p className="pt-1 text-neutral-500 text-sm md:text-base">Sở hữu ngay Sim theo nhu cầu!</p>
      </div>
      <div className="container mt-6 md:mt-10 xl:mt-14">
        <div className="relative -mx-1.5 md:-mx-1.5">
          <div className="flex overflow-auto scrollbar-hide md:py-9 xl:py-8 snap-mandatory snap-x touch-pan-x" ref={scrollRef}>
            {[...simOption, ...simOption].map((option, index) => (
              <Item key={index} src={option.image} name={option.label} href={option.href} progress={progress} index={index} />
            ))}
          </div>
          <div className="max-xl:hidden">
            <div className="absolute top-1/2 right-full -translate-x-4 -translate-y-1/2">
              <button
                className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
                onClick={() => handleNavigate(Direction.PREV)}
              >
                <Svg src="/icons/line/chevron-left.svg" className="inline h-10 w-10" />
              </button>
            </div>
            <div className="absolute top-1/2 left-full translate-x-4 -translate-y-1/2">
              <button
                className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
                onClick={() => handleNavigate(Direction.NEXT)}
              >
                <Svg src="/icons/line/chevron-right.svg" className="inline h-10 w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const total = 6;
const Item = ({
  src,
  progress,
  index,
  href,
  name
}: {
  src: string;
  progress: MotionValue<number>;
  index: number;
  href: string;
  name: string;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, (v) => 1 - Math.abs(clamp(index - v, -1, 1)));

  return (
    <div className="w-1/3 flex-shrink-0 px-1.5 md:px-5 snap-center" ref={itemRef}>
      <Link href={href} className="w-full relative">
        <motion.div className="w-full block-img block-tivi-vertical image-scale" style={{ '--scale': scale } as any}>
          <img src={src} className="object-cover rounded-md md:rounded-2xl xl:rounded-3xl" alt="Banner" />
          <div className="absolute inset-0 flex items-center md:top-auto md:bottom-6 left-4 md:left-6 xl:bottom-8 xl:left-10">
            <div className="relative text-neutral-0 font-itel text-h-xxs md:text-h-sm xl:text-h-xl font-bold whitespace-pre-line">
              {name}
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default QualitySimCard;
