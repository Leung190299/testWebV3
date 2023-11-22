import React from 'react';
import { CustomProps } from '../../types/element-type';
import clsx from 'clsx';

type Props = CustomProps<{
  img: string;
  title: string;
  desc?: string;
  imageClassName?: string;
  hideActionOnMobile?: boolean;
  onClick?(): void;
}>;

const CardPromotion = ({ img, title, desc, className, imageClassName = 'block-video', onClick, hideActionOnMobile, ...rest }: Props) => {
  return (
    <div {...rest} className={clsx('card group', className)}>
      <figure className={clsx('block-img overflow-hidden', imageClassName)}>
        <img src={img} alt="promotion image" className="group-hover:scale-110 transition-default h-full w-full object-cover" />
      </figure>
      <div className="card-body p-2 md:py-4 md:px-6">
        <h5 className="card-title text-sm md:text-lg">{title}</h5>
        <p className="card-desc text-xs md:text-sm mt-1">iTel Phim • 12/2/2023</p>
        <div className={clsx('card-actions mt-4', hideActionOnMobile && 'max-md:hidden')}>
          <button
            className="btn-secondary btn rounded-full transition-default"
            onClick={(e) => {
              e.preventDefault();
              onClick?.();
            }}
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPromotion;
