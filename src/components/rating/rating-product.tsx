import React from 'react';
import Svg from '../icon/svg';

export type RatingProductProps = {
  rate?: number;
  sold?: number;
  view?: number;
  rateCount?: number;
};

const RatingProduct = ({ rate = 0, sold, view }: RatingProductProps) => {
  return (
    <div className="-mx-2 flex divide-x divide-neutral-200 text-sm text-neutral-700">
      <div className="flex items-center   text-xs md:text-sm px-2 font-medium">
        <span>{rate}</span>
        <Svg src="/icons/bold/star.svg" className="ml-0.5 inline-block h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
      </div>
      {typeof view === 'number' && <div className="px-2 text-neutral-500">{view} lượt mua</div>}
      {typeof sold === 'number' && <div className="px-2 text-neutral-500">Đã bán {sold}</div>}
    </div>
  );
};

export default RatingProduct;
