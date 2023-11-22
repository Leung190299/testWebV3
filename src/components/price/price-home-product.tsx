import { Props, ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
import clsx from 'clsx';
import React, { ForwardedRef } from 'react';
import Element from '../element/element';
import { toCurrency } from '@/utilities/currency';

type PriceListProps = {
  discountPrice?: number;
  price: number;
  discountPercentage?: number;

  isFlasSale?: boolean;
  itemClassName?: string;
};

const DEFULAT_PRICE_LIST_TAG = 'div';
const PriceListProduct = forwardRefWithAs(function PriceListProduct<TTag extends ReactTag = typeof DEFULAT_PRICE_LIST_TAG>(
  { discountPrice, price, discountPercentage, isFlasSale, itemClassName, ...rest }: Props<TTag, PriceListProps>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Element ref={ref} {...rest} defaultClassName="price-info align-bottom">
      <span className={clsx('price', itemClassName)}>
        <span className={isFlasSale ? 'text-red-500' : undefined}>{toCurrency(discountPrice || price)}</span>
        {discountPrice && <span className="price-discount xl:ml-2">{toCurrency(price)}</span>}
      </span>
      {discountPercentage && <span className="badge badge-sale">-{discountPercentage}%</span>}
    </Element>
  );
});

export default PriceListProduct;
