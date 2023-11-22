import React from 'react';
import { RatingProductProps } from './rating-product';
import Svg from '../icon/svg';

const RatingProductDetail = ({ rate, view, sold, rateCount }: RatingProductProps) => {
  return (
    <div className="-mx-2 flex items-center divide-x divide-neutral-200 font-medium text-neutral-700">
      <div className="flex items-center px-2">
        <Svg src="/icons/bold/star.svg" className="mr-0.5 inline-block h-5 w-5 text-yellow-500" />
        <span>{rate}</span>
      </div>
      {typeof view === 'number' && <div className="px-2 text-neutral-500">{view.toLocaleString('vi')} lượt mua</div>}
      {typeof sold === 'number' && <div className="px-2 text-neutral-500">Đã bán {sold.toLocaleString('vi')}</div>}
      {typeof rateCount === 'number' && <div className="px-2 text-neutral-500">{rateCount.toLocaleString('vi')} đánh giá</div>}
    </div>
  );
};

export default RatingProductDetail;
