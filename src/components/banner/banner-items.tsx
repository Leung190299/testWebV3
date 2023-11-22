import Routers from '@/routes/routers';
import { Data } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import Link from 'next/link';
import CardProduct from '../card/card-product';

type Props<T> = {
  data: Array<T>;
};

const BannerItems = <T extends Data.Product>({ data }: Props<T>) => {
  const [item] = data;
  const items = [data[1], data[2]];

  return (
    <div className="grid w-full grid-cols-2 gap-x-6 xl:grid-cols-3">
      <div className="group col-span-2 row-span-2">
        <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: item.id } }} className="card">
          <CardProduct
            img={item.thumbnail}
            title={item.name}
            blockImageClassName="block-photo"
            type="secondary"
            bodyClassName="mt-4"
            data={item}
          >
            <h4 className="text-xl xl:text-s-sm font-bold">{item.name}</h4>
            <div className="price-info mt-1 items-center align-bottom">
              <span className="price inline-block text-xl">
                <span className={false ? 'text-red-500' : undefined}>{toCurrency(item.variant.discount_price || item.variant.price)}</span>
                {item.variant.discount_price && <span className="price-discount ml-2 text-sm">{toCurrency(item.variant.price)}</span>}
              </span>
              {item.variant.discount_percentage && <span className="badge badge-sale">-{item.variant.discount_percentage}%</span>}
            </div>
          </CardProduct>
        </Link>
      </div>
      <div className="flex col-span-2 xl:col-span-1 xl:block xl:space-y-6 gap-6 mt-10 xl:mt-0">
        {items.map((item) => {
          return (
            <div key={item.id} className="group w-1/2 xl:w-full">
              <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: item.id } }} className="card">
                <CardProduct
                  img={item.thumbnail}
                  title={item.name}
                  blockImageClassName="block-cinema"
                  type="secondary"
                  bodyClassName="mt-2"
                  data={item}
                >
                  <h4 className="text-xl font-bold xl:text-s-sm">{item.name}</h4>
                  <div className="price-info mt-1 items-center align-bottom">
                    <span className="price inline-block">
                      <span className={false ? 'text-red-500' : undefined}>
                        {toCurrency(item.variant.discount_price || item.variant.price)}
                      </span>
                      {item.variant.discount_price && <span className="price-discount ml-2 text-sm">{toCurrency(item.variant.price)}</span>}
                    </span>
                    {item.variant.discount_percentage && <span className="badge badge-sale">-{item.variant.discount_percentage}%</span>}
                  </div>
                </CardProduct>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerItems;
