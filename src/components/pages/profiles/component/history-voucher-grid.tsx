import { useEffect, useState } from 'react';
import { getListProduct } from '@/services/product/product';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { Data } from '@/types/model';
import PaginationSimple from '@/components/pagination/pagination-simple';
import { CardVoucher } from '@/components/pages/profiles/component/card/card-voucher';
import { CardMobileHistoryVoucher } from '@/components/pages/profiles/component/card/card-mobile-history-voucher';
import * as React from 'react';

const HistoryVoucherGrid = () => {
  const loadingData = useBoolean(false);
  const [products, setProducts] = useState<Data.Product[]>([]);

  useEffect(() => {
    async function getSuggestedProducts() {
      loadingData.setTrue();
      const products = await getListProduct({ limit: 9 });
      // Fake delay calling api
      await new Promise((resolve) => setTimeout(resolve, 100));
      setProducts(products);
      loadingData.setFalse();
    }

    getSuggestedProducts();
  }, [loadingData]);

  return (
    <>
      <div className="max-md:mt-0 grid grid-cols-3 max-md:grid-cols-2 gap-x-6 gap-y-10 max-lg:gap-x-4 max-lg:gap-y-10 max-md:gap-x-3 max-md:gap-y-3">
        {products.map((product, index) => (
          <div key={index} className="">
            <div className="max-md:hidden">
              <CardVoucher />
            </div>
            <div className="md:hidden">
              <CardMobileHistoryVoucher />
            </div>
          </div>
        ))}
      </div>
      <div className="max-md:hidden pt-14">
        <PaginationSimple totalPage={100} adjacent={4} />
      </div>
      <div className="md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div>
    </>
  );
};
export default HistoryVoucherGrid;
