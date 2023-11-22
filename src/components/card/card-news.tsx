import React from 'react';
import { CustomProps } from '../../types/element-type';
import clsx from 'clsx';

type Props = {
  img?: string;
  title: React.ReactNode;
  alt?: string;
  desc?: React.ReactNode;
  subDesc?: React.ReactNode;
  imageClassName?: string;
};

const CardNews = ({ img, title, desc, alt, subDesc, className, imageClassName = 'block-video' }: CustomProps<Props>) => {
  return (
    <div className={clsx('card', className)}>
      <figure className={clsx('group block-img rounded-lg bg-base-300', imageClassName)}>
        <img src={img} alt={alt} className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid" />
      </figure>
      <div className="card-body px-0 py-2 md:py-4">
        <h5 className="md:text-lg xl:text-xl">
          <b>{title}</b>
        </h5>
        {desc && <p className="mt-2 text-sm text-subtle-content line-clamp-2">{desc}</p>}
        <div className="mt-1 md:mt-2 text-sm md:text-base text-subtle-content">{subDesc}</div>
      </div>
    </div>
  );
};

export default CardNews;
