import clsx from 'clsx';
import React from 'react';
import { CustomProps } from '../../types/element-type';
import dayjs from 'dayjs';
import Link from 'next/link';
import type { Model } from '@/types/model';
import { Url } from 'next/dist/shared/lib/router/router';

type Props = CustomProps<Model.VoucherHOT> & {
  iShowButton?: boolean;
  classNameFrame?: string;
  classNameTitle?: string;
  classBrand?: string;
  classWrap?: string;
  classImg?: string;
  href?: string;
};

const CardVoucherHot = ({
  brand,
  genre,
  id,
  img,
  time,
  title,
  className,
  iShowButton = true,
  classNameFrame,
  classNameTitle,
  classBrand,
  classWrap,
  classImg,
  href,
  ...rest
}: Props) => {
  const url = href ?? { pathname: '/ifilm/[id]', query: { id: `${id}` } };
  return (
    <>
      <div className={clsx('group transition-default card overflow-hidden rounded-2xl', className)} {...rest}>
        <figure className={clsx(classNameFrame || 'aspect-video', 'overflow-hidden')}>
          <Link href={url}>
            <img
              src={img}
              alt="promotion image"
              className={clsx(
                classImg,
                !iShowButton && 'rounded-2xl',
                'transition-default h-full w-full object-cover group-hover:scale-110'
              )}
            />
          </Link>
        </figure>
        <div className={clsx(classWrap, 'card-body gap-1 px-0 md:px-4 md:py-3 py-0 pt-3')}>
          <Link href={url}>
            <h5 className={clsx(classNameTitle, 'card-title justify-between gap-3 font-bold line-clamp-2 md:line-clamp-none')}>
              Phim mới: {title}
            </h5>
          </Link>

          <div className="card-actions flex-col justify-between">
            <div className={clsx('card-desc md:mt-1 flex items-center gap-1 text-xs', classBrand)}>
              {brand} • {dayjs(time).format('DD/MM/YYYY')}
            </div>
            {iShowButton && (
              <Link href={url} className="transition-default btn-secondary btn btn-sm mt-4 rounded-full hidden md:flex">
                Khám phá ngay
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardVoucherHot;
