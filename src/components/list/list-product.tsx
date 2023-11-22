import Routers from '@/routes/routers';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Link from 'next/link';
import CardProduct from '../card/card-product';

type Props = {
  products: imallModel.Product[];
  installmentTag?: boolean;

  maxItem?: {
    pc?: number;
    tablet?: number;
    default?: number;
  };
};

const ListProduct = ({ products: data, maxItem = { pc: 8, tablet: 6, default: 4 }, installmentTag, ...rest }: CustomProps<Props>) => {
  const getImage = (json: string): string => {
    return JSON.parse(json)[0].image_url || JSON.parse(json)[0].src;
  };
  const getSlug = (json: string): string => {
    return JSON.parse(json).slug;
  };
  return (
    <div {...rest}>
      <div className="-mx-1.5 md:-mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
        {data.map((product, index) => (
          <div
            key={product.id}
            className={clsx(
              'w-1/2 px-1.5 md:px-3 md:w-1/3 xl:w-1/4',
              maxItem.default && index >= maxItem.default ? 'hidden' : 'block',
              maxItem.tablet && index >= maxItem.tablet ? 'md:hidden' : 'md:block',
              maxItem.pc && index >= maxItem.pc ? 'xl:hidden' : 'xl:block'
            )}
          >
            <Link href={{ pathname: `${Routers.IMALL_DETAIL}/${getSlug(product.meta!)}`, }}>
              <CardProduct
                img={getImage(product.images!)}
                installment={product.origin_type == 'oppo' && product.price! > 3000000}
                title={product.product_name!}
                type="secondary"
                data={product}
              >
                <CardProduct.Body
                  tags={[]}
                  price={product.base_price!}
                  discountPrice={product.price!}
                  name={product.product_name!}
                  discountPercentage
                  rate={4.5}
                  sold={888}
                />
              </CardProduct>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
