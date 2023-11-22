import Link from 'next/link';
import Routers from '@/routes';
import { useEffect, useState } from 'react';
import { getListProduct } from '@/services/product/product';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { Data } from '@/types/model';
import CardFavouriteProduct, { FavouriteProductBody } from '@/components/pages/profiles/component/card/card-favourite-product';
import * as React from 'react';

export const FavouriteProductGrid = () => {
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
    <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-md:mt-0 max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-4 max-lg:gap-y-6 max-lg:gap-x-4">
      {products.map((product, index) => (
        <div key={index} className="">
          <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
            <CardFavouriteProduct
              img={product.thumbnail}
              installment={Boolean(index % 3)}
              title={product.name}
              type="secondary"
              onLike={() => {}}
              onAddToCart={() => {}}
              className={'rounded-lg'}
            >
              <FavouriteProductBody
                tags={product.tags}
                price={product.priceRange.max}
                discountPrice={product.priceRange.discount_min}
                name={product.name}
                discountPercentage
                rate={4.5}
                sold={888}
              />
            </CardFavouriteProduct>
          </Link>
        </div>
      ))}
    </div>
  );
};
