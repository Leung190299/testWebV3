import Link from 'next/link';
import Routers from '@/routes';
import { useEffect, useState } from 'react';
import { getListProduct } from '@/services/product/product';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { Data } from '@/types/model';
import CardHistoryProduct, { HistoryProductCardBody } from '@/components/pages/profiles/component/card/card-history-product';
import PaginationSimple from '@/components/pagination/pagination-simple';
import * as React from 'react';

export const HistoryProductGrid = () => {
  const loadingData = useBoolean(false);
  const [products, setProducts] = useState<Data.Product[]>([]);

  useEffect(() => {
    async function getSuggestedProducts() {
      loadingData.setTrue();
      const products = await getListProduct({ limit: 12 });
      // Fake delay calling api
      await new Promise((resolve) => setTimeout(resolve, 100));
      setProducts(products);
      loadingData.setFalse();
    }

    getSuggestedProducts();
  }, [loadingData]);

  return (
    <>
      <div
        className={
          'grid grid-cols-4 max-md:mt-0 max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-4 max-lg:grid-cols-3 max-lg:gap-x-4 gap-x-6 gap-y-14 max-lg:gap-y-6'
        }
      >
        {products.map((product, index) => (
          <div key={index} className="">
            <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
              <CardHistoryProduct
                img={product.thumbnail}
                installment={Boolean(index % 3)}
                title={product.name}
                type="secondary"
                onLike={() => {}}
                onAddToCart={() => {}}
                className={'rounded-lg'}
              >
                <HistoryProductCardBody
                  tags={product.tags}
                  price={product.priceRange.max}
                  discountPrice={product.priceRange.discount_min}
                  name={product.name}
                  rate={4.5}
                  sold={888}
                />
              </CardHistoryProduct>
            </Link>
          </div>
        ))}
      </div>

      <div className="max-md:hidden pt-14 max-lg:pt-6">
        <PaginationSimple totalPage={100} adjacent={4} />
      </div>
      <div className="md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div>
    </>
  );
};
