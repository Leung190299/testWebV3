import clsx from 'clsx';
import React from 'react';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: string;
  logo: string;
  point: number;
}>;

const CardCouponDivide = ({ title, img = '/image/logo', logo = '/image/url', redemptionDeadline, className, point, ...rest }: Props) => {
  return (
    <div className={clsx('card', className)} {...rest}>
      <figure className="aspect-video">
        <img src={img} alt="promotion image" className="h-full w-full bg-neutral-0 object-cover" />
      </figure>
      <div className="card-body gap-1 bg-neutral-0 px-4 py-3">
        <h5 className="card-title justify-between gap-3 font-bold">
          {title}
          <div className="relative aspect-square w-12 flex-shrink-0 overflow-hidden rounded-full">
            <img src={logo} alt="logo image" className="absolute inset-0 object-cover" />
          </div>
        </h5>
        <p className="card-desc text-sm">HSD: 28/02/2023</p>
      </div>
      <div className="card-divider bg-neutral-0"></div>
      <div className="card-actions-ticket bg-neutral-0 ">
        <button className="btn-secondary btn btn-sm w-1/2 rounded-full">Chi tiết</button>
        <button className="btn-primary btn btn-sm w-1/2 rounded-full">Dùng mã</button>
      </div>
    </div>
  );
};

export default CardCouponDivide;
