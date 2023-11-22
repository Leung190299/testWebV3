import { Props, ReactTag } from '@/types/element-type';
import { toCurrency } from '@/utilities/currency';
import { forwardRefWithAs } from '@/utilities/render';
import clsx from 'clsx';
import { ForwardedRef } from 'react';
import Element from '../element/element';

type PriceListProps = {
  discountPrice?: number;
  price: number;
  discountPercentage?: number | true;

  isFlasSale?: boolean;
  itemClassName?: string;
};

const DEFULAT_PRICE_LIST_TAG = 'div';
const PriceListProduct = forwardRefWithAs(function PriceListProduct<TTag extends ReactTag = typeof DEFULAT_PRICE_LIST_TAG>(
  { discountPrice, price, discountPercentage, isFlasSale, itemClassName, ...rest }: Props<TTag, PriceListProps>,
  ref: ForwardedRef<HTMLDivElement>
) {
  let discount = discountPercentage == true && discountPrice ? Math.floor(((price - discountPrice) / price) * 100) : discountPercentage;

  return (
    <Element ref={ref} {...rest} defaultClassName="price-info align-bottom">
      <span className={clsx('price', itemClassName)}>
        <span className={isFlasSale ? 'md:text-red-500' : undefined}>{toCurrency(discountPrice ?? price)}</span>
        {typeof discountPrice === 'number' && (
          <span className="inline-block text-xs text-neutral-500 md:text-sm xl:ml-2 font-normal">
            <s>{toCurrency(price)}</s>
          </span>
        )}
      </span>
      {discount && ( typeof discount==='number'&& discount >= 0) && <span className="badge badge-sale">-{discount}%</span>}
    </Element>
  );
});

export default PriceListProduct;
