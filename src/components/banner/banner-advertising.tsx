import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';

import useSlider from '@/hooks/useSlider';
import { variantsTranslate, variantsTranslateWithoutOpacity } from '../carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '../carousel/full-carousel';
import PaginationBullets from '../pagination/pagination-bullets';

type Props = {
  autoplay?: boolean;
  time?: number;
  data: Array<{
    id: number;
    media: { mobile?: string; tablet?: string; desktop?: string };
    title: React.ReactNode;
    tabletTitle?: React.ReactNode;
    mobileTitle?: React.ReactNode;
    hideBtnOnTablet?: boolean;
    desc?: string;
    actionTitle?: string;

    extra?: string[];

    type?: 'blue' | 'red';
    position?: string;
  }>;
  withOverLay?: boolean;

  type?: 'primary' | 'secondary' | 'tertiary';
};

const BannerAdvertising = ({ data, time = 6000, type = 'primary', withOverLay }: CustomProps<Props, 'section'>) => {
  const slider = useSlider({ totalSlide: data.length, loop: time });

  const item = data[slider.index];

  return (
    <FullCarousel
      index={slider.index}
      onSlide={slider.onSlide}
      numItems={data.length}
      className={clsx(
        type === 'primary'
          ? 'h-[15.625rem] md:h-[36rem] xl:h-[42.5rem]'
          : type === 'secondary'
          ? 'h-48 md:h-64 xl:h-[21.25rem]'
          : 'h-48 md:h-96 xl:h-[42.5rem]',
        'relative w-full cursor-grab overflow-hidden block-img pb-0 '
      )}
      data-theme="dark"
    >
      <FullCarouselItem variants={variantsTranslateWithoutOpacity} index={slider.index} direction={-slider.direction}>
        <div className="relative h-full select-none bg-red-500">
          <picture className="absolute inset-0">
            <source srcSet={item.media.desktop} media="(min-width: 1200px)" />
            <source srcSet={item.media.tablet} media="(min-width: 768px)" />
            <img
              src={item.media.mobile}
              alt="example"
              className={clsx(item.position ?? 'object-right-bottom object-cover', 'h-full w-full')}
              draggable={false}
            />
          </picture>
          {/* type primary and terticary have overlay */}
          {withOverLay && (
            <div className="max-xl:hidden absolute bottom-0 left-0 h-96 w-full bg-opacity-30 bg-gradient-to-b from-neutral-900/0 to-neutral-900/60 xl:h-40"></div>
          )}
          <div className="container h-full">
            {/* Style for primary banner */}
            {type === 'primary' ? (
              <div className="relative max-w-xl pt-20 md:pt-14 xl:pt-28">
                <h2 className="whitespace-pre font-itel text-h-xs md:text-h-xl xl:text-h1">{item.title}</h2>
                <p className="mt-2">{item.desc}</p>
                <div className="max-md:hidden mt-7">
                  <button className="btn-primary btn btn-lg rounded-full font-medium">{item.actionTitle}</button>
                </div>

                <div className="max-md:hidden mt-16 xl:mt-[2.625rem] flex">
                  {item.extra?.map((item) => {
                    return (
                      <div key={item} className="mr-8 w-52">
                        <img src={item} alt="" draggable={false} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : type === 'secondary' ? (
              // Style for secondary banner
              <div className="relative flex flex-col h-full justify-center md:block max-w-xl md:pt-12 xl:pt-16">
                <h2 className="font-itel font-bold text-h-xs md:text-h-sm xl:text-h-md whitespace-pre">
                  <span className="max-xl:hidden">{item.title}</span>
                  <span className="max-md:hidden xl:hidden">{item.tabletTitle || item.title}</span>
                  <span className="md:hidden">{item.mobileTitle || item.title}</span>
                </h2>
                <p className="mt-2 whitespace-pre xl:whitespace-normal text-neutral-200 max-md:hidden">{item.desc}</p>
                <div className={clsx(item.hideBtnOnTablet && 'max-xl:hidden', 'max-md:hidden mt-6 xl:mt-7')}>
                  <button className="btn-primary btn xl:btn-lg rounded-full font-medium">{item.actionTitle}</button>
                </div>
              </div>
            ) : (
              // Style for tertiary banner
              <div className="relative flex flex-col h-full justify-center md:block max-w-xl md:pt-[5.125rem] xl:pt-[10.25rem]">
                <h2 className="font-itel font-bold text-h-xs md:text-h-sm xl:text-h-xl whitespace-pre">
                  <span className="max-xl:hidden">{item.title}</span>
                  <span className="max-md:hidden xl:hidden">{item.tabletTitle || item.title}</span>
                  <span className="md:hidden">{item.mobileTitle || item.title}</span>
                </h2>
                <p className="mt-2 whitespace-pre xl:whitespace-normal text-neutral-200 text-sm md:text-base max-md:hidden">{item.desc}</p>
                <div className={clsx(item.hideBtnOnTablet && 'max-xl:hidden', 'max-md:hidden mt-6 xl:mt-7')}>
                  <button className="btn-primary btn xl:btn-lg rounded-full font-medium">{item.actionTitle}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </FullCarouselItem>
      <div
        className={clsx(type === 'primary' ? 'bottom-4 md:bottom-6 xl:bottom-8' : 'bottom-4 xl:bottom-6', 'absolute w-full bg-transparent')}
      >
        <PaginationBullets total={data.length} active={slider.index} onClick={slider.onChange} />
      </div>
    </FullCarousel>
  );
};

export default BannerAdvertising;
