import clsx from 'clsx';
import React from 'react';
import { CustomProps } from '../../types/element-type';
import Link from 'next/link';
import Routers from '@/routes/routers';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: string;
  logo: string;
  point: number;
  src: number;
  outOfStock?: boolean;
  onClickReceive?: () => void;
  onClickDetail?: () => void;
}>;

const CardGiftDivide = ({
  title,
  img = '/image/logo',
  logo = '/image/url',
  redemptionDeadline,
  className,
  point,
  src,
  outOfStock,
  onClickReceive,
  onClickDetail,
  ...rest
}: Props) => {
  return (
    <div className={clsx('card md:group', className)} {...rest}>
      <figure className="aspect-video">
        <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: src, izui: true } }} className="relative">
          <img
            src={img}
            alt="promotion image"
            className="h-full w-full transition-default bg-neutral-0 object-cover group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0">
            <span className="tag tag-vector h-auto bg-gradient-to-r from-yellow-500 to-red-500 p-2 md:px-4">
              <p className="text-sm font-bold whitespace-nowrap">9h - 11h 25/6/2023</p>
            </span>
          </div>
        </Link>
      </figure>
      <div className="card-body gap-1 bg-neutral-0 md:px-4 p-3">
        <div className="flex justify-between">
          <div onClick={onClickDetail} className="card-title gap-3 font-bold cursor-pointer text-xs md:text-base line-clamp-2">
            {title}
          </div>
          <div className="relative h-8 md:h-12 w-8 md:w-12 flex-shrink-0 overflow-hidden rounded-full">
            <img src={logo} alt="logo image" className="absolute inset-0 object-cover" />
          </div>
        </div>
        <p className="card-desc text-xs md:text-sm">Khung giờ 9h - 11h 25/6/2023</p>
      </div>
      <div className="card-divider bg-neutral-0"></div>
      <div className="flex rounded-b-inherit px-3 md:px-4 gap-x-2 md:gap-x-4 bg-neutral-0 -mt-px py-3 md:pt-px md:pb-4">
        <div onClick={onClickDetail} className="btn-secondary px-2 btn btn-sm w-1/2 rounded-full cursor-pointer">
          Chi tiết
        </div>
        <button className="btn-primary btn btn-sm w-1/2 px-2 rounded-full" onClick={onClickReceive} disabled={outOfStock}>
          Nhận ngay
        </button>
      </div>
    </div>
  );
};

export default CardGiftDivide;
