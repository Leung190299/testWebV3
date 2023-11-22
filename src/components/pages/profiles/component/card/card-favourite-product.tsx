import * as React from 'react';
import clsx from 'clsx';
import Svg from '@/components/icon/svg';
import PriceListProduct from '@/components/price/price-list-product';
import RatingProduct from '@/components/rating/rating-product';
import {useReducer} from "react";
import toast from "react-hot-toast";

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
    <div className="card-tags">
      {data.map((tag) => (
        <span key={tag} className="tag tag-primary md:tag-md">
          {tag}
        </span>
      ))}
    </div>
  ) : null;
};

const Badge = ({ value }: { value?: number | string }) => {
  return value ? (
    <div className="transition-default badge badge-lg badge-center absolute -right-3 -top-3 w-12 rotate-[30deg] rounded-full font-normal group-hover:rotate-0">
      <div>-{value}%</div>
    </div>
  ) : null;
};

export const FavouriteProductBody = (product: {
  tags?: string[];
  name: string;
  discountPrice?: number;
  price: number;
  discountPercentage?: number | true;
  rate: number;
  sold?: number;
}) => {
  return (
    <>
      <Tags data={product.tags} />
      <div className="pt-4 flex flex-col gap-y-2">
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

const CardFavouriteProduct = ({
  img,
  className,
  title,
  type = 'primary',
  blockImageClassName = type === 'secondary' ? 'block-square' : 'block-tivi',
  bodyClassName = 'gap-4',
  discountPercentage,
  children
}: Props) => {
  const [isFavourite, setIsFavourite] = useReducer((state) => {
    return !state;
  }, false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Thêm sản phẩm thành công');
  };

  const handleLikeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavourite();
  };

  return (
    <article className={clsx('group card', className)}>
      <figure className={clsx('card-image block-img z-0 w-full', type === 'secondary' ? 'rounded-inherit' : '', blockImageClassName)}>
        <img src={img} alt={title} className="transition-default object-cover group-hover:scale-110" />
        <div className="card-hover absolute bottom-4 right-4">
          <button type="button" onClick={handleLikeItem} className="btn-tertiary btn btn-circle">
            <Svg className="h-6 w-6" src={isFavourite ? '/icons/line/heart.svg' : '/icons/bold/favorite.svg'} />
          </button>
          <button type="button" onClick={handleAddToCart} className="btn-tertiary btn btn-circle mt-2 flex">
            <Svg className="h-6 w-6" src="/icons/bold/cart.svg" />
          </button>
        </div>
      </figure>
      <Badge value={discountPercentage} />
      <div className={clsx('pb-6 pt-4 max-lg:pb-4',type === 'secondary' ? 'px-0' : '', bodyClassName)}>{children}</div>
    </article>
  );
};

export default CardFavouriteProduct;
