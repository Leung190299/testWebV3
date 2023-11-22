import Svg from '@/components/icon/svg';
import { useCallback, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';

import { Direction } from '@/components/carousel/full-carousel';
import PaginationBullets from '@/components/pagination/pagination-bullets';
import { toCurrency } from '@/utilities/currency';
import clsx from 'clsx';

type QualitySimCardProps = {
  data: dataModel.Pack[];
  onRegister(data: dataModel.Pack): void;
  onClickDetail?: (pack: dataModel.Pack) => void;
  /**
   * duration
   */
  loop?: number;
};
const FeaturedPackData = ({ data, onRegister, onClickDetail, loop = 3 }: QualitySimCardProps) => {
  const total = data.length;
  const sliderRef = useRef<Slider>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNavigate = useCallback((direction: Direction) => {
    direction === Direction.NEXT ? sliderRef.current?.slickNext() : sliderRef.current?.slickPrev();
  }, []);

  const settings: Settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange(current, next) {
      setActiveSlide(next);
    },
    autoplay: true,
    waitForAnimate: true,
    centerMode: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 0,
          speed: 500,
          autoplaySpeed: 3000,
          autoplay: true,
          pauseOnHover: false
        }
      }
    ]
  };
  return (
    <div className="relative -mx-1.5 md:-mx-8">
      <Slider ref={sliderRef} className="data--slider__container" {...settings} useCSS>
        {data.map((option, index) => {
          return (
            <div key={index} className="px-1.5 md:px-5 xl:px-10">
              <div className="w-60 md:w-[17.5rem] xl:w-[23.25rem] flex-shrink-0 box-content md:box-border">
                <div className="w-full relative">
                  <div
                    className={clsx(
                      'w-full image-scale2 rounded-2xl xl:rounded-3xl border border-neutral-200 group hover:border-red-500 duration-300 transition-default',
                      {
                        'md:scale-[1.125]': activeSlide === index
                      }
                    )}
                  >
                    <div className="!pb-0 p-3 xl:p-6">
                      <div className="bg-neutral-50 rounded-xl xl:rounded-2.5xl !pt-0 p-3 xl:px-4 xl:pb-6">
                        <div className="py-2 flex items-center justify-between text-sm font-bold">
                          <div className="flex items-center xl:py-3 xl:text-base">
                            <Svg src="/icons/bold/fire.svg" className="inline h-6 w-6" />
                            <span>{option.Name}</span>
                          </div>
                          <button
                            className="flex md:hidden font-medium xl:font-bold xl:flex items-center gap-x-1 md:gap-x-2 hover:text-red-500"
                            onClick={() => onClickDetail && onClickDetail(option)}
                          >
                            Chi tiết
                            <Svg src="/icons/line/chevron-right.svg" className="xl:hidden inline h-4 w-4" />
                            <Svg src="/icons/line/arrow-right.svg" className="max-md:hidden inline h-4 w-4" />
                          </button>
                        </div>
                        <hr className="border-neutral-200" />
                        <div className="font-itel text-h-xxs xl:text-h-sm xl:text-center mt-2 xl:mt-4">
                          <b>{option.FreeDataPerDay}GB/ngày</b>
                        </div>
                        <div className="mt-2 xl:mt-4 xl:text-center text-sm xl:text-base">
                          {option.FreeInternalSMS && (
                            <div>
                              <p className="text-xs md:text-xs text-neutral-600">Miễn phí</p>
                              <p className="mt-1 font-medium xl:font-bold">{option.FreeInternalSMS} SMS</p>
                            </div>
                          )}
                          {option.FreeExternalSMS && (
                            <div className="mt-4 xl:mt-4">
                              <div className="text-xs md:text-xs text-neutral-600">Miễn phí </div>
                              <div className="mt-1 font-medium xl:font-bold">{option.FreeExternalSMS} SMS/tháng</div>
                            </div>
                          )}
                          {option.FreeExternalCall && (
                            <div className="mt-4 xl:mt-4">
                              <div className="text-xs md:text-xs text-neutral-600">Miễn phí gọi </div>
                              <div className="mt-1 font-medium xl:font-bold">{option.FreeExternalCall} phút/tháng</div>
                            </div>
                          )}
                          {option.FreeInternalCall && (
                            <div className="mt-4 xl:mt-4">
                              <div className="text-xs md:text-xs text-neutral-600">Miễn phí gọi nội mạng (iTel & VinaPhone)</div>
                              <div className="mt-1 font-medium xl:font-bold">{option.FreeInternalCall} phút/tháng </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="transition-default badge badge-lg badge-center absolute -right-3 -top-3 w-12 rotate-[30deg] rounded-full font-normal group-hover:rotate-0">
                      <div>-{99}%</div>
                    </div> */}
                    <div className="p-4 xl:p-6 xl:pt-4 flex md:block xl:flex">
                      <div className="flex-1">
                        <p className="md:text-xl font-bold text-neutral-800">
                          {toCurrency(option.Price!)}
                          <span className="text-xs xl:text-sm font-normal text-neutral-500">/ tháng</span>
                        </p>
                        {/* <p className="text-xs font-normal text-neutral-500 line-through">{toCurrency(option!)}</p> */}
                      </div>
                      <div className="md:mt-4 xl:mt-0 md:w-full xl:w-auto">
                        <button className="btn-primary btn btn-sm rounded-full md:btn-secondary w-full" onClick={() => onRegister(option)}>
                          <span className="max-md:hidden">Đăng ký ngay</span>
                          <span className="md:hidden">Đăng ký</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
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
      <PaginationBullets total={total} active={activeSlide} />
    </div>
  );
};

export default FeaturedPackData;
