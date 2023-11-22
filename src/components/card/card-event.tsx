import React from 'react';
import { CustomProps } from '../../types/element-type';
import clsx from 'clsx';

type Props = CustomProps<{
  img: string;
  title: string;
  desc: string;
}>;

const CardEvent = ({ title, img, desc }: Props) => {
  return (
    <div className="card">
      <figure className="group block-img block-photo md:block-video rounded-lg bg-base-300">
        <img src={img} alt={title} className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid" />
      </figure>
      <div className="card-body px-0 py-2 md:py-4 space-y-1 md:space-y-2">
        <h5 className="line-clamp-3 text-sm md:text-lg">
          <b>{title}</b>
        </h5>
        <p className="max-md:hidden line-clamp-2 text-sm text-subtle-content">{desc}</p>
        <p className="text-xs md:text-sm text-subtle-content">Tin iTel • 09/03/2023</p>
      </div>
    </div>
  );
};

export default CardEvent;
