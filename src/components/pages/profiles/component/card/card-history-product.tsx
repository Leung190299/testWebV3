import * as React from 'react';
import clsx from 'clsx';
import TagSale from '@/components/tag-chip/tag-sale';
import TagInstallment from '@/components/tag-chip/tag-installment';
import PriceListProduct from "@/components/price/price-list-product";
import RatingProduct from "@/components/rating/rating-product";

type Props = {
  img: string;
  title: string;
  installment?: boolean;
  discountPercentage?: number;
  saleExpiry?: string | null;

  type?: 'primary' | 'secondary';
  blockImageClassName?: string;
  bodyClassName?: string;
  saleClassName?: string;

  className?: string;
  children?: React.ReactNode;
  onLike?(): void;
  onAddHug?(): void;
  onAddToCart?(): void;
};

const Tags = ({ data }: { data?: string[] }) => {
  return data && data.length ? (
      <div className="card-tags hidden max-lg:block">
        {data.map((tag) => (
            <span key={tag} className="tag tag-primary md:tag-md">
          {tag}
        </span>
        ))}
      </div>
  ) : null;
};

export const HistoryProductCardBody = (product: {
  name: string;
  discountPrice?: number;
  price: number;
  discountPercentage?: number | true;
  rate: number;
  sold?: number;
  tags?: string[];
}) => {
  return (
      <>
        <Tags data={product.tags} />
        <div className="mt-4 flex flex-col gap-y-2 pb-4 max-md:pb-0 max-md:mt-2">
          <h5 className="card-title text-sm font-bold md:text-base xl:text-xl line-clamp-1">{product.name}</h5>
          <PriceListProduct
              className="gap-x-2"
              discountPrice={product.discountPrice}
              price={product.price}
              discountPercentage={product.discountPercentage}
          />
          <RatingProduct rate={4.5} sold={888} />
        </div>
    </>
  );
};

const CardHistoryProduct = ({
  img,
  installment,
  className,
  title,
  type = 'primary',
  blockImageClassName = type === 'secondary' ? 'block-square' : 'block-tivi',
  bodyClassName = 'gap-4',
  saleExpiry,
  saleClassName = 'absolute bottom-0 left-0 tag-xs',
  children
}: Props) => {

  return (
    <article className={clsx('group card', className)}>
      <figure className={clsx('card-image block-img z-0 w-full', type === 'secondary' ? 'rounded-inherit' : '', blockImageClassName)}>
        <img src={img} alt={title} className="transition-default object-cover group-hover:scale-110" />
        {installment && (
          <div className="absolute bottom-0 left-0">
            <TagInstallment />
          </div>
        )}
        {saleExpiry && (
          <TagSale className={saleClassName}>
            <TagSale.Timer expiry={saleExpiry} />
          </TagSale>
        )}
      </figure>
      <div className={clsx('max-lg:mt-2',type === 'secondary' ? 'px-0' : '', bodyClassName)}>{children}</div>
    </article>
  );
};

export default CardHistoryProduct;
