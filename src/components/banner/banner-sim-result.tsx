import React from 'react';
import Svg from '../icon/svg';
import clsx from 'clsx';

type Props = {
  type?: 'numerlogy' | 'feng_shui';
};

const BannerSimResult = ({ type = 'numerlogy' }: Props) => {
  const attributes = [
    ['Ngày 15', '1 + 5', '6'],
    ['Tháng 7', '7', '6'],
    ['Năm 1999', '1 + 9 + 9 + 9', '6']
  ];

  return (
    <div className={clsx('block-img', type === 'numerlogy' ? 'block-video md:block-cinema' : 'block-cinema')}>
      <img
        src={
          type === 'numerlogy'
            ? 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1685194687/itel/images/bg-sim_1_r1xj1z.png'
            : 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1686045355/itel/images/cd12bf0295769b8ca499467fcd22de42_wrd8pt.png'
        }
        className="object-cover scale-125"
        alt="banner"
      />
      {type === 'numerlogy' ? (
        <div className="absolute inset-0 bg-opacity-60 md:px-8 md:py-10 pt-4" data-theme="dark">
          <h3 className="font-itel md:text-h-xs text-center xl:text-h-sm">Nguyễn bảo ngọc</h3>
          <p className="text-sm md:text-xl xl:text-s-sm text-center">
            <b>15/07/1999</b>
          </p>
          <div className="flex font-bold items-center text-[0.625rem] md:text-sm xl:text-base mt-2 md:mt-6">
            <div className="flex flex-col gap-4 md:gap-6 xl:gap-8 mr-2 flex-1">
              {attributes.map((values, rowIndex) => {
                return (
                  <div className="flex items-center -mx-2" key={rowIndex}>
                    <div className="px-2 flex-1">
                      <div className="border rounded-lg border-neutral-500 bg-neutral-800 bg-opacity-50 h-8 md:h-11 xl:h-12 center-by-grid">
                        {values[0]}
                      </div>
                    </div>
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-3 w-3 md:h-6 md:w-6" />
                    <div className="px-2 flex-1">
                      <div className="border rounded-lg border-neutral-500 bg-neutral-800 bg-opacity-50 h-8 md:h-11 xl:h-12 center-by-grid">
                        {values[1]}
                      </div>
                    </div>
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-3 w-3 md:h-6 md:w-6" />
                    <div className="px-2 flex-1">
                      <div className="border rounded-lg border-neutral-500 bg-neutral-800 bg-opacity-50 h-8 md:h-11 xl:h-12 center-by-grid">
                        {values[2]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Svg src="/icons/bold/right-arrow.svg" className="inline h-3 w-3 md:h-6 md:w-6 mr-2 md:mr-6" />
            <div className="w-20 md:w-[7.625rem] xl:w-[13.125rem] flex-shrink-0">
              <div className="block-img block-square">
                <img
                  src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685430571/itel/images/1bf7dadc7f0034f5a18d7d0bff659640_h5fbx1.png"
                  alt=""
                  className="object-cover rounded-lg border border-neutral-500"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        null
        // <div className="absolute inset-0 center-by-grid">
        //   <h1 className="font-itel font-bold text-2xl text-modern-red">Thành đầu thổ</h1>
        // </div>
      )}
    </div>
  );
};

export default BannerSimResult;
