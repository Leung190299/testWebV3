import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import Routers from '@/routes/routers';
import { Data } from '@/types/model';

import useMediaQuery, { MediaScreen } from '@/hooks/useMediaQuery';
import clsx from 'clsx';
import { SectionSearchHeader } from '../header';
import { useSearchContext } from '../input/input-search-header';
import Svg from '../icon/svg';

type Props = {};

const SharedSectionSearchGame = (props: Props) => {
  const { queryDebounced, querySubmited, handleSearchClear, handleSearchSelect, historySearch } = useSearchContext();
  const [products, setProducts] = useState<Data.Product[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<Data.Product[]>([]);
  const media = useMediaQuery(MediaScreen.Desktop);

  useEffect(() => {
    async function search() {
      setProducts([]);
      const products = await searchProducts({ q: querySubmited, limit: 8 });
      setPeopleSearch(products);
    }
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function search() {
      setProducts([]);
      const products = await searchProducts({ q: querySubmited, limit: 30 });
      setProducts(products);
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
    <div className="relative z-10 md:pb-10 md:py-8 xl:py-6">
      {media === MediaScreen.Mobile && isChangedQuery ? (
        <SectionSearchHeader title="GỢI Ý TỪ KHÓA" className="mt-2 py-2 md:py-0 md:mt-6 xl:mt-8">
          <div className="mt-2 md:mt-4">
            <ul>
              {[
                'Game săn mồi',
                'Game săn mồi 2',
                'Game săn mồi Mobile',
                'Game săn mồi Mobile 2',
                'Game săn mồi Mobile',
                'Game săn mồi Mobile',
                'Game săn mồi Mobile'
              ].map((text) => {
                return (
                  <li key={text} className="py-3 md:py-2 flex items-center gap-x-2" onClick={() => handleSearchSelect(text)}>
                    <p className="font-medium">{text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </SectionSearchHeader>
      ) : null}
      {(media === MediaScreen.Mobile ? !isChangedQuery : true) && (
        <>
          {!querySubmited ? (
            <SectionSearchHeader title="Tìm kiếm gần đây" className="py-4 md:py-0 mt-2 md:mt-0">
              <div className="mt-2 md:mt-4">
                <ul className="">
                  {historySearch.map((search) => {
                    return (
                      <li key={search.timestamp}>
                        <button className="py-2 flex items-center gap-x-2" onClick={() => handleSearchSelect(search.text)}>
                          <Svg src="/icons/bold/history.svg" className="text-subtle-content" width={24} height={24} />
                          <p className="font-medium">{search.text}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SectionSearchHeader>
          ) : null}
          <section className="mobile-container py-4 md:py-0 mt-2 md:mt-0">
            <div className={clsx(!querySubmited ? 'md:mt-10' : 'xl:mt-6', 'container max-md:px-0')}>
              {querySubmited ? (
                <h4 className="font-bold md:text-s-sm">Kết quả cho "{querySubmited}"</h4>
              ) : (
                <h4 className="text-lg md:text-s-sm font-bold">Mọi người cũng tìm kiếm</h4>
              )}
              <div className="-mx-1.5 md:-mx-3 flex flex-wrap -mt-1 md:mt-0">
                {(querySubmited ? products : peopleSearch).map((product) => {
                  return (
                    <div key={product.id} className="mt-4 md:mt-6 w-1/2 px-1.5 md:px-3 xl:w-1/4">
                      <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }} onClick={handleSearchClear}>
                        <div className="card">
                          <figure className="group block-img rounded-lg bg-base-300 block-photo">
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                            />
                            {product.id % 3 ? (
                              <span className="absolute bottom-0 left-0">
                                <span className="h-auto tag tag-vector bg-gradient-to-r from-yellow-500 to-red-500 px-4 py-2 text-sm">
                                  Game hot
                                </span>
                              </span>
                            ) : null}
                          </figure>
                          <div className="card-body px-0 py-2 md:py-4">
                            <h5 className="md:text-lg">
                              <b>{product.name}</b>
                            </h5>
                            <div className="md:mt-2 text-xs md:text-sm text-subtle-content">Hot Tuần • Trí tuệ</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default SharedSectionSearchGame;
