import clsx from 'clsx';

import useProduct from '@/store/cart/hooks/product';
import { CustomProps } from '../../types/element-type';
import PriceListProduct from '../price/price-list-product';
import RatingProduct from '../rating/rating-product';
import TagInstallment from '../tag-chip/tag-installment';
import TagSale from '../tag-chip/tag-sale';

type Props = CustomProps<{
  img: string;
  title: string;
  installment?: boolean;
  discountPercentage?: number;
  saleExpiry?: string | null;
  data: any;

  // Styles
  type?: 'primary' | 'secondary';
  blockImageClassName?: string;
  bodyClassName?: string;
  saleClassName?: string;

  className?: string;
  children?: React.ReactNode;
}>;

const CardProduct = ({
  img,
  installment,
  className,
  title,
  type = 'primary',
  data,
  blockImageClassName = type === 'secondary' ? 'block-square' : 'block-tivi',
  bodyClassName = 'card-body gap-4',
  discountPercentage,
  saleExpiry,
  saleClassName = 'absolute bottom-0 left-0 tag-xs',

  children
}: Props) => {
  const { likeItem, addToCart, liked } = useProduct();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!data.variant) return;
    addToCart(data.variant, data);
  };
  const handleLikeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    likeItem();
  };
  return (
    <article className={clsx('group card', className)}>
      <figure className={clsx('card-image block-img z-0 w-full', type === 'secondary' ? 'rounded-inherit' : '', blockImageClassName)}>
        <img src={img} alt={title} className="transition-default object-cover group-hover:scale-110" />
        {/* <div className="card-hover absolute bottom-4 right-4">
          <button type="button" onClick={handleLikeItem} className="btn-tertiary btn btn-circle flex">
            {liked ? (
              <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
            ) : (
              <Svg src="/icons/others/heart-stroke.svg" width={24} height={24} />
            )}
          </button>
          <button type="button" onClick={handleAddToCart} className="btn-tertiary btn btn-circle mt-2 flex">
            <Svg className="h-6 w-6" src="/icons/bold/cart.svg" />
          </button>
        </div> */}
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
      <Badge value={discountPercentage} />
      <div className={clsx(type === 'secondary' ? 'px-0' : '', bodyClassName)}>{children}</div>
    </article>
  );
}

const Tags = ({ data }: { data?: string[] }) => {
  return data && data.length ? (
    <div className="card-tags">
      {data.map((tag) => (
        <span key={tag} className="tag tag-primary tag-sm md:tag-md">
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

const Body = (product: {
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
      <div className="space-y-2">
        <h5 className="card-title text-sm font-bold md:text-base xl:text-xl line-clamp-1">{product.name}</h5>
        <PriceListProduct
          className="gap-x-2"
          discountPrice={product.discountPrice}
          price={product.price}
          discountPercentage={product.discountPercentage}
        />
        <RatingProduct rate={4.5} sold={product.sold} />
      </div>
    </>
  );
};

export default Object.assign(CardProduct, { Tags, Badge, Price: PriceListProduct, Body });
