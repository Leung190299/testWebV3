
import Svg from '../icon/svg';
import { MouseEventHandler, ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';

type IProps = {
  img?: string;
  title?: string;
  brand?: string;
  subTitle?: string;
  rules?:  MouseEventHandler<HTMLDivElement>;
};
const ContentRules = ({
  img = '/service/popupVnTrip.png',
  brand = 'Itel Du Lịch',
  title = 'Deal khủng mùa thu - Vi vu khắp chốn cùng itel x Vntrip',
  subTitle,
}: IProps) => {
  const [pY, setPY] = useState(0);

  const converStringDescriptron = (description: string): ReactNode =>
    description.split('<br/>').map((item: string, index: number) => (
      <div className="flex gap-2 items-center md:items-start" key={index}>
        <div className="md:pt-[2px]">
          <Svg src="/icons/bold/check.svg" className="bg-pink aspect-square rounded-full w-5 p-[2px]" />
        </div>
        <p>{item}</p>
      </div>
    ));

  return (
    <>
      <div
       onScroll={(e) => setPY(e.currentTarget.scrollTop)}
       className={clsx(pY && 'z-20', 'fixed top-0 left-0 h-screen md:h-auto overflow-auto md:static')}
      >
        <div className={pY ? 'flex w-full md:hidden sticky top-0 left-0 z-10 bg-neutral-0' : 'hidden'}>
          <div className="flex justify-center relative w-full py-4">
            <Svg src="/icons/line/close.svg" className="absolute left-4 top-5 w-6 h-6" />
          </div>
        </div>
        <div className="lg:container lg:grid grid-flow-col lg:p-0">
          <div className="xl:aspect-square aspect-square lg:aspect-photo-vertical">
            <img src={img} alt="" className="w-full lg:h-full object-cover md:rounded-2xl lg:rounded-none" />
          </div>
          <div className="lg:px-10 lg:max-w-[590px] lg:py-10 pt-0 lg-pt-10 px-4 md:p-0">
            <div className="md:text-base text-sm text-neutral-500 flex flex-col gap-1 md:mt-8 mt-4 lg:mt-0">
              <h1 className="font-bold md:text-[32px] text-2xl text-neutral-800 leading-tight">{title}</h1>
            </div>
            <div className="mt-6 md:text-base text-sm text-neutral-800">
              <div className="flex flex-col gap-5 mt-4">
                {converStringDescriptron(subTitle||'')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentRules;
