import { NextPage } from 'next';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import Routers from '@/routes/routers';

import CardProduct from '@/components/card/card-product';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import PaginationSimple from '@/components/pagination/pagination-simple';
import SectionImallBanner from '@/components/section/section-imall-banner';
import SectionProduct from '@/components/section/section-products';
import { DEFAULT_PRICE } from '@/constants/imall.constants';

import { modal } from '@/libs/modal';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { getBrands } from '@/services/brand/getBrands';
import { getCategories } from '@/services/category/category';
import { getListProduct } from '@/services/product/product';
import { Data, Model } from '@/types/model';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FilterComponents, IFormSearch, Layout } from '../device';

export type FoodPageProps = {
  categories: Model.Category[];
  brands: Model.Brand[];
  featured_products: Data.Product[];
};

const FoodPage: NextPage<FoodPageProps> = ({ categories, brands, featured_products }) => {
  const loadingData = useBoolean(false);
  const [suggested, setSuggested] = useState<Data.Product[]>([]);
  const methods = useForm<IFormSearch>({ defaultValues: { range: DEFAULT_PRICE } });
  const [mergedCategories] = useState([{ id: 'all', name: 'Tất cả' }, ...categories]);
  const [category, setCategory] = useState(mergedCategories[0]);
  useEffect(() => {
    methods.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  useEffect(() => {
    async function getSuggestedProducts() {
      loadingData.setTrue();
      const products = await getListProduct({ limit: 12 });
      // Fake delay calling api
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSuggested(products);
      loadingData.setFalse();
    }
    getSuggestedProducts();
  }, [loadingData]);

  const handleModalFilter = () => {
    const defaultValues = methods.getValues();
    Object.assign(defaultValues.options, { brands: defaultValues.options.brandMobile });

    modal.open({
      render: <></>,
      onDone(data: IFormSearch) {
        Object.assign(data.options, { brandMobile: data.options.brands });
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel md:bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleRemoveAttributes = (item: { value: string; name: string; type: string }) => {
    const currentValues = methods.getValues(`options.${item.type}`);
    const index = currentValues.indexOf(item.value);
    // if (index !== -1) {
    //   currentValues.splice(index, 1);
    //   methods.setValue(`options.${item.type}`, currentValues);
    // }
  };
  const onSumbit: SubmitHandler<IFormSearch> = (values) => {
    // console.log(values);
  };
  const priceRange = useWatch({ name: 'range', control: methods.control });
  const filters = useMemo(() => {
    const data: { value: string; name: string; type: string }[] = [];
    priceRange &&
      DEFAULT_PRICE.some((p, i) => p !== priceRange[i]) &&
      data.push({ value: '123', name: `${priceRange[0].toLocaleString('en')} - ${priceRange[1].toLocaleString('en')}`, type: 'range' });
    return data;
  }, [priceRange]);

  return (
    <FormProvider {...methods}>
      <HeaderWebDefault title="Ăn uống" withCart withMenu withSearch />
      <Head>
        <title>Imall - Ăn uống</title>
      </Head>
      <div className="container max-md:p-0 flex w-full gap-x-6 pt-4">
        <div className="hidden w-[18.75rem] flex-shrink-0 xl:block">
          <div className="">
            <div className="menu h-[40.5rem] overflow-auto rounded-lg border border-neutral-300 px-6 pb-6">
              <ul className="font-bold">
                <li className="menu-title pb-4 pt-6">
                  <span className="py-0">Danh mục</span>
                </li>
                {mergedCategories.map((cat) => {
                  return (
                    <li key={cat.id} className={cat === category ? 'menu-active' : undefined}>
                      <button type="button" onClick={() => setCategory(cat)}>
                        {cat.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-4 space-y-8 rounded-lg border border-neutral-300 p-6">
              <FilterComponents brands={brands} categories={categories} />
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="md:pb-16 xl:-mr-1.5">
            <section className="bg-neutral-0 md:bg-transparent pb-4 px-4 md:p-0">
              <SectionImallBanner />
              <div className="mt-6 w-full overflow-hidden xl:hidden">
                <ul className="tabs flex-nowrap md:gap-x-4 xl:gap-x-8 overflow-x-auto scrollbar-hide">
                  {mergedCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={clsx(
                          'tab tab-bordered box-content whitespace-nowrap border-red-500 border-opacity-0 p-4 text-base',
                          cat === category ? 'tab-active' : ''
                        )}
                        onClick={() => setCategory(cat)}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 md:pt-4 flex items-center justify-end flex-row-reverse md:flex-row gap-2">
                  <ul className="flex whitespace-nowrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1">
                    {filters.length
                      ? filters.map((item) => (
                          <li key={item.type + item.value}>
                            <span className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                              {item.name}
                              <button type="button" onClick={() => handleRemoveAttributes(item)}>
                                <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                              </button>
                            </span>
                          </li>
                        ))
                      : brands.map(({ id, name }, i) => (
                          <li key={id}>
                            <label>
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                hidden
                                value={id}
                                {...methods.register('options.brandMobile')}
                              />
                              <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                                {name}
                              </span>
                            </label>
                          </li>
                        ))}
                  </ul>
                  <button
                    type="button"
                    className={clsx(
                      'relative btn-tertiary btn btn-sm btn-square md:w-auto md:btn-lg md:rounded-full flex-shrink-0',
                      filters.length && 'btn-active'
                    )}
                    onClick={handleModalFilter}
                  >
                    <Svg src="/icons/bold/filter.svg" width={24} height={24} />
                    {filters.length ? (
                      <span className="badge z-10 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                        <span>{filters.length}</span>
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>
            </section>

            {filters.length ? (
              <SectionProduct title="Danh sách sản phẩm" className="mt-2 md:mt-16 xl:mt-20 px-4 py-6 md:p-0">
                <ul className="max-md:hidden flex whitespace-nowrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1 mt-4">
                  {filters.map((item) => (
                    <li key={item.type + item.value}>
                      <span className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                        {item.name}
                        <button type="button" onClick={() => handleRemoveAttributes(item)}>
                          <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="-mx-1 md:-mt-2 flex xl:-mx-3 flex-wrap">
                  {featured_products.map((product, index) => (
                    <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:px-3">
                      <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                        <CardProduct
                          img={product.thumbnail}
                          installment={Boolean(index % 3)}
                          title={product.name}
                          type="secondary"
                          data={product}
                        >
                          <CardProduct.Body
                            tags={product.tags}
                            price={product.priceRange.max}
                            discountPrice={product.priceRange.discount_min}
                            name={product.name}
                            discountPercentage
                            rate={4.5}
                            sold={888}
                          />
                        </CardProduct>
                      </Link>
                    </div>
                  ))}
                </div>
              </SectionProduct>
            ) : (
              <>
                <SectionProduct title="Sản phẩm nổi bật" className="mt-2 md:mt-16 xl:mt-20 px-4 py-6 md:p-0">
                  <div className="-mx-1 mt-2 flex md:flex-wrap xl:-mx-3 overflow-x-auto scrollbar-hide">
                    {featured_products.map((product, index) => (
                      <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:px-3">
                        <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                          <CardProduct
                            img={product.thumbnail}
                            installment={Boolean(index % 3)}
                            title={product.name}
                            type="secondary"
                            data={product}
                          >
                            <CardProduct.Body
                              tags={product.tags}
                              price={product.priceRange.max}
                              discountPrice={product.priceRange.discount_min}
                              name={product.name}
                              discountPercentage
                              rate={4.5}
                              sold={888}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>
                <SectionProduct title="Sản phẩm cho bạn" className="mt-2 md:mt-16 xl:mt-20 px-4 pt-6 md:p-0">
                  <div className="-mx-1 mt-2 flex flex-wrap xl:-mx-3">
                    {suggested.map((product) => (
                      <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:w-1/4 xl:px-3">
                        <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                          <CardProduct
                            img={product.thumbnail}
                            title={product.name}
                            installment={product.id % 2 === 0 ? true : false}
                            type="secondary"
                            data={product}
                          >
                            <CardProduct.Body
                              price={product.priceRange.max}
                              discountPrice={product.priceRange.discount_min}
                              name={product.name}
                              rate={4.5}
                              sold={888}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>
              </>
            )}
            <div className="bg-neutral-0 max-md:hidden pb-6">
              <PaginationSimple totalPage={100} adjacent={4} />
            </div>
            <div className="bg-neutral-0 md:hidden pb-6">
              <PaginationSimple totalPage={100} adjacent={[3, 1]} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

FoodPage.getLayout = Layout;

const getStaticProps = getServerPropsWithTranslation<FoodPageProps>(async () => {
  return {
    props: {
      categories: await getCategories({ parent_id: 8 }),
      brands: await getBrands({}),
      featured_products: await getListProduct({ limit: 12 })
    },
    // revalidate: 8600
  };
});
export { getStaticProps };
export default FoodPage;
