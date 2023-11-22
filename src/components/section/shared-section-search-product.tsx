import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import CardProduct from '../card/card-product';
import { quickSearchs } from '../layout/layout-imall';

import Routers from '@/routes/routers';

import { useLoading } from '@/hooks/useLoading';
import useMediaQuery, { MediaScreen } from '@/hooks/useMediaQuery';
import imallService from '@/services/imallService';
import { toCurrency } from '@/utilities/currency';
import clsx from 'clsx';
import { SectionSearchHeader } from '../header';
import { useSearchContext } from '../input/input-search-header';

type Props = {};

const SharedSectionSearchProduct = (props: Props) => {
  const { queryDebounced, querySubmited, handleSearchClear, handleSearchSelect } = useSearchContext();
  const [products, setProducts] = useState<imallModel.Product[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<imallModel.Product[]>([]);
  const { openLoading, closeLoading } = useLoading();
  const media = useMediaQuery(MediaScreen.Desktop);
  const getSlug = (json: string): string => {
    return JSON.parse(json).slug;
  };
  const getImage = (json: string): string => {
    return JSON.parse(json)[0].image_url || JSON.parse(json)[0].src;
  };
  useEffect(() => {
    async function search() {
      try {
        setProducts([]);
        const params = {
          columnFilters: {
            Slug: ''
          },
          sort: [
            {
              field: 'price',
              type: 'desc'
            }
          ],
          page: 1,
          pageSize: 8,
          lang: 1
        };
        const res = await imallService.getProducts(params);
        if (res.code == 200) {
          setPeopleSearch(res.result);
        }
      } catch (error) {}
    }
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function search() {
      try {
        openLoading();
        setProducts([]);
        const res = await imallService.getResultSearch(querySubmited);
        if (res.code == 200) {
          setProducts(res.result.Products);
        }
      } catch (error) {
      } finally {
        closeLoading();
      }
    }
    querySubmited && search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySubmited]);
  const searchProducts = useCallback(async (params: { q: string; limit: number; skip?: number }) => {
    const value = await fetch('/api/products?' + new URLSearchParams(params as any)).then((v) => v.json());
    return value.data;
  }, []);

  const isChangedQuery = querySubmited !== queryDebounced;

  return (
    <div className="relative z-10 md:pb-10 md:pt-6">
      {media === MediaScreen.Mobile && isChangedQuery ? (
        <>
          <SectionSearchHeader title="Từ khoá nổi bật" className="mt-2 py-2 md:py-0 md:mt-6 xl:mt-8">
            <div className="md:mt-4">
              <ul>
                {['OPPO A14', 'Điện thoại OPPO A14', 'Điện thoại Oppo A16 4GB Red', 'Tai nghe OPPO A14', 'Điện thoại Oppo A16 4GB Red'].map(
                  (text) => {
                    return (
                      <li key={text} className="py-3 md:py-2 flex items-center gap-x-2" onClick={() => handleSearchSelect(text)}>
                        <p className="font-medium">{text}</p>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </SectionSearchHeader>
          <SectionSearchHeader title="SẢN PHẨM GỢI Ý" className="py-2 md:py-0 mt-2 md:mt-6 xl:mt-8" href={Routers.IMALL}>
            <div className="md:mt-6 md:flex gap-x-4 divide-y divide-neutral-200">
              {peopleSearch.map((product, index) => (
                <Link
                  href={{ pathname: Routers.IMALL_DETAIL, query: { slug: getSlug(product.meta!) } }}
                  key={product.id}
                  className="py-4 flex items-center"
                >
                  <div className="w-12">
                    <div className="block-img block-square">
                      <img src={getImage(product.images!)} className="object-cover rounded-lg" alt={product.product_name} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p>
                      <b>{product.product_name}</b>
                    </p>
                    <p className="text-sm font-medium text-neutral-500">{toCurrency(product.price || 0)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </SectionSearchHeader>
        </>
      ) : null}
      {(media === MediaScreen.Mobile ? !isChangedQuery : true) && (
        <section className="mobile-container py-4 md:py-0 mt-2 md:mt-0">
          {!querySubmited ? (
            <div className="container max-md:px-0">
              <ul className="flex flex-wrap gap-2">
                {quickSearchs.length > 0 &&
                  quickSearchs.slice(0, 10).map((search: { id: number; text: string }) => {
                    return (
                      <li key={search.id}>
                        <button
                          className="btn-outline btn h-9 text-sm md:text-base md:h-11 rounded-full border-neutral-300 font-medium"
                          onClick={() => handleSearchSelect(search.text)}
                        >
                          {search.text}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : null}
          <div className={clsx(!querySubmited ? 'mt-6 md:mt-10' : 'xl:mt-6', 'container max-md:px-0')}>
            {querySubmited ? (
              <h4 className="font-bold md:text-s-sm">Kết quả cho "{querySubmited}"</h4>
            ) : (
              <h4 className="text-lg md:text-s-sm font-bold">Mọi người cũng tìm kiếm</h4>
            )}
            <div className="-mx-1.5 md:-mx-2 xl:-mx-3 flex flex-wrap">
              {(querySubmited ? products : peopleSearch).length > 0 ? (
                (querySubmited ? products : peopleSearch).map((product) => {
                  return (
                    <div key={product.id} className="mt-6 w-1/2 px-1.5 md:px-2 xl:px-3 md:w-1/3 xl:w-1/4">
                      <Link href={{ pathname: Routers.IMALL_DETAIL, query: { slug: getSlug(product.meta!) } }} onClick={handleSearchClear}>
                        <CardProduct
                          title={product.product_name!}
                          img={getImage(product.images!)}
                          installment={product.origin_type == 'oppo' && product.price! > 3000000}
                          type="secondary"
                          data={product}
                          bodyClassName="pt-2 md:pb-6 md:pb-4 xl:pt-4 space-y-2 md:space-y-3 xl:space-y-4"
                        >
                          <CardProduct.Body
                            // tags={product.tags}
                            price={product.base_price!}
                            discountPrice={product.price!}
                            name={product.product_name!}
                            rate={4.5}
                            sold={Math.floor(Math.random() * 500)}
                          />
                        </CardProduct>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p className="text-center w-full">Rất tiếc! Không tìm thấy kết quả</p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SharedSectionSearchProduct;
