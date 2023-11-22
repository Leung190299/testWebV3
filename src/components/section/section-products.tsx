import Link from 'next/link';
import React from 'react';

import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Svg from '../icon/svg';

type SectionProductProps = {
  title: React.ReactNode;
  isOdd?: boolean | null;
  href?: string | null;
  classTitle?: string;
  classSection?: string;
  linkTitle?: React.ReactNode;
  onClickHref?: () => void;
};

const SectionProduct = ({
  title,
  children,
  isOdd,
  href,
  classTitle,
  classSection = 'bg-neutral-0',
  linkTitle = 'Xem tất cả',
  onClickHref,
  ...rest
}: CustomProps<SectionProductProps>) => {
  return (
    <section className={clsx(isOdd !== null ? (isOdd ? 'md:bg-neutral-50' : 'md:bg-neutral-0') : undefined, classSection)}>
      <div {...rest}>
        <div className="flex items-center">
          <h2 className={clsx(classTitle, 'font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3')}>{title}</h2>
          {(href || onClickHref) && (
            <Link
              href={href || '/'}
              onClick={onClickHref ? (e) => (e.preventDefault(), onClickHref()) : undefined}
              className="text-sm md:text-base transition-default font-medium hover:text-red-500"
            >
              <span className="max-md:hidden">Xem tất cả</span>
              <span className="md:hidden flex items-center">
                Tất cả <Svg src="/icons/line/chevron-right.svg" width={16} height={16} />
              </span>
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionProduct;
