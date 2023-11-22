import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

// import useSticky from '@/hooks/useSticky';

import Svg from '@/components/icon/svg';
import LayoutImall from '@/components/layout/layout-imall';

import Routers from '@/routes/routers';

import { getBrands } from '@/services/brand/getBrands';
import { getCategories } from '@/services/category/category';
import { getListProduct } from '@/services/product/product';

import useBoolean from '@pit-ui/modules/hooks/useBoolean';

import CardProduct from '@/components/card/card-product';
import SectionProduct from '@/components/section/section-products';

import FilterList from '@/components/filter/filter-list';
import FilterPrice from '@/components/filter/filter-price';
import HeaderWebDefault from '@/components/header/header-web-default';
import ModalImallFilter from '@/components/modal/modal-imall-filter';
import Pagination from '@/components/pagination/Pagination';
import SectionImallBanner from '@/components/section/section-imall-banner';
import { IMALL_PRICE_LIST } from '@/constants/imall.constants';
import useDebounceInput from '@/hooks/useDebounceInput';
import { modal } from '@/libs/modal';
import imallService from '@/services/imallService';
import { Data, Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { Listbox } from '@headlessui/react';
import { AxiosError } from 'axios';
import _ from 'lodash';

export type DevicePageProps = {
  brands: Model.Brand[];
  featured_products: Data.Product[];
};

export type IFormSearch = {
  range: [number, number];
  options: Record<string, string[] | string>;
  category: imallModel.Category;
  supplier: string[];
};

const ImallDevicePage: NextPage<DevicePageProps> = ({ brands, featured_products }) => {
  const loadingData = useBoolean(false);
  const [suggested, setSuggested] = useState<Data.Product[]>([]);
  const methods = useForm<IFormSearch>();
  const [categories, setCategories] = useState<imallModel.Category[]>([]);
  const [categorySelect, setCategorySelect] = useState<imallModel.Category>({});
  const [category, setCategory] = useState<Model.Category[]>([]);
  const [filterConfig, setFilterConfig] = useState<imallModel.filterConfig>({});
  const [products, setProducts] = useState<imallModel.Product[]>([]);
  const [productsActive, setProductsActive] = useState<imallModel.Product[]>([]);
  const [isData, setIsData] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>(20);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const refDiv = useRef<HTMLDivElement>(null);
  const [filterMobie, setFilterMobie] = useState<{ value: any; name: string; type: string }[]>([]);
  const [params, setParams] = useState<imallModel.IPramsProduct>({
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
    pageSize: 20,
    lang: 1
  });

  const handleModalFilter = () => {
    const defaultValues = methods.getValues();
    Object.assign(defaultValues.options, { brands: defaultValues.options.brandMobile });

    modal.open({
      render: (
        <ModalImallFilter
          defaultValues={defaultValues}
          categories={category || []}
          brands={filterConfig.values?.map((item, index) => ({ id: index, name: item })) || []}
          filters={[]}
        />
      ),
      onDone(data: IFormSearch) {
        Object.assign(data.options, { brandMobile: data.options.brands });
        const { options } = data;
        const { category_name, ...rest } = options;
        if (!category_name) {
          return methods.reset({
            ...data,
            options: {
              ...rest
            }
          });
        }
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel md:bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const options = useWatch({ name: 'options', control: methods.control });
  const supplier = useWatch({ name: 'supplier', control: methods.control });
  const Category = useWatch({ name: 'category', control: methods.control });

  const priceRange = useWatch({ name: 'range', control: methods.control });
  const filters = useMemo(() => {
    const data: { value: any; name: string; type: string }[] = [];

    if (supplier) {
      data.push({ type: 'Supplier', name: supplier.join(','), value: supplier });
    }
    if (options) {
      data.push({ type: 'options', value: options.category_name, name: 'options' });
    }

    if (priceRange) {
      data.push({ type: 'priceRange', value: priceRange, name: 'range' });
    }

    return data;
  }, [options, Category, supplier, priceRange]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await imallService.getCategory();
      if (res.code == 200) {
        setCategorySelect(res.result[0]);
        setCategories(res.result);
        const _filterConfig: imallModel.filterConfig[] = JSON.parse(res.result[3].filter_config!);
        setFilterConfig(_filterConfig[0]);
        setCategory(
          res.result[3].childrent?.map(
            (item): Model.Category => ({ id: item.id || 1, name: item.category_name || '', parent_id: item.id || 1 })
          ) || []
        );
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    let Slug: string = categorySelect.slug||'';
    let supplier: string[] = [];
    let options = {};
    let range: [number, number] = [0, 50_000_000];
    filters.forEach((item) => {
      switch (item.type) {
        case 'Supplier':
          supplier = [...(item.value as string[])];
          break;
        case 'options':
          options = item.value;
          break;
        case 'priceRange':
          range = priceRange;
          break;
        default:
          break;
      }
    });
    setParams({
      ...params,
      columnFilters: {
        ...params.columnFilters,
        Slug,
        supplier,
        category_name: options,
        from: range[0],
        to: range[1]
      },
      page: 1
    });
  }, [filters]);

  useEffect(() => {
    getListProduct();
  }, [params]);

  const setPage = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  const getListProduct = async (page: number = 1) => {
    try {
      const res = await imallService.getProducts(params);
      if (res.code == 200) {
        if (isData) {
          setProductsActive(res.result);
        }

        setTotalPage(Math.floor(res.totalRecords / 20));
        setIsData(false);
        setProducts(res.result);
      }
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError?.message || '',
        rejectLable: 'Đóng',
        onDone: close
      });
    }
  };

  const getImage = (json: string): string => {
    return JSON.parse(json)[0].image_url || JSON.parse(json)[0].src;
  };
  const getSlug = (json: string): string => {
    return JSON.parse(json).slug;
  };

  const selectCategory = (cat: imallModel.Category) => {
    setParams({
      ...params,
      columnFilters: {
        ...params.columnFilters,
        Slug: cat.slug,
      },
      page: 1
    });
  };

  const lengthFilters = useMemo(() => {
    let length = 0;
    filters.forEach((item) => {
      if (item.type == 'options' && _.isArray(item.value)) {
        length += item.value.length;
      } else if (item.type == 'options' && !item.value) {
        return;
      } else {
        length += 1;
      }
    });
    return length;
  }, [filters]);

  const listFilters = useMemo(() => {
    let list: { value: any; name: string; type: string }[] = [];
    filters.forEach((item) => {
      if (item.type == 'options' && _.isArray(item.value)) {
        list = [...list, ...item.value.map((_item) => ({ value: _item, name: _item, type: 'options' }))];
      } else if (item.type == 'options' && !item.value) {
        return;
      } else if(item.type=='priceRange'&& _.isArray(item.value)) {
        const { value } = item;
        list.push({...item,name:`${toCurrency(value[0])} - ${toCurrency(value[1])}`})
      } else {
        list.push(item);

      }

    });
    return list;
  }, [filters]);

  const removeFilter = (item: { value: any; name: string; type: string }) => {
    if (item.type == 'options') {
      const option = filters.find((filter) => filter.type == item.type);
      let { value } = option!;
      value = value.filter((_value: string) => _value.toUpperCase() != item.name.toUpperCase());
      return methods.setValue(`options.category_name`, value);
    }
    if (item.type == 'Supplier') {
      //@ts-ignore
      return methods.setValue('supplier', false);
    }
    if (item.type == 'priceRange') {
      const { range, options, ...rest } = methods.getValues();
      const { category_name, ...restOption } = options;

      if (!category_name) {
        return methods.reset({
          ...rest,
          options: {
            ...restOption
          }
        });
      }
      methods.reset({
        ...rest,
        options
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Head>
        <title>Imall - Điện thoại thiết bị</title>
      </Head>
      {/* <HeaderMobileWeb title="Điện thoại thiết bị" /> */}
      <HeaderWebDefault title="Điện thoại thiết bị" withCart withMenu withSearch />
      <div className="container max-md:p-0 flex w-full gap-x-6 pt-4">
        <div className="hidden w-[18.75rem] flex-shrink-0 xl:block">
          <div className="menu overflow-auto rounded-lg border border-neutral-300 px-6 pb-6">
            <ul className="font-bold">
              <li className="menu-title pb-4 pt-6">
                <span className="py-0">Danh mục</span>
              </li>
              {categories.map((cat) => {
                return (
                  <li key={cat.id} className={cat.slug === categorySelect.slug ? 'menu-active' : undefined}>
                    <button
                      type="button"
                      onClick={() => {
                        selectCategory(cat);
                        setCategorySelect(cat);
                      }}
                    >
                      {cat.category_name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 space-y-8 rounded-lg border border-neutral-300 p-6">
            <FilterComponents
              brands={filterConfig.values?.map((item, index) => ({ id: index, name: item })) || []}
              categories={category || []}
              filters={categories[3]?.childrent}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="md:pb-16 xl:-mr-1.5">
            <section className="mobile-container pb-4 md:p-0">
              <SectionImallBanner />
              <div className="md:mt-6 w-full overflow-hidden xl:hidden">
                <ul className="tabs flex-nowrap md:gap-x-4 xl:gap-x-8 overflow-x-auto scrollbar-hide">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={clsx(
                          'tab tab-bordered box-content whitespace-nowrap border-red-500 border-opacity-0 p-4 text-base',
                          cat.slug === categorySelect.slug ? 'tab-active' : ''
                        )}
                        onClick={() => {
                          selectCategory(cat);
                          setCategorySelect(cat);
                        }}
                      >
                        {cat.category_name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 md:pt-4 flex items-center justify-end flex-row-reverse md:flex-row gap-2">
                  <ul className="flex whitespace-nowrap flex-wrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1">
                    {listFilters.length
                      ? listFilters.map((item) => (
                          <li key={item.type + item.value}>
                            <span className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3 my-1">
                              {item.name}
                              <button type="button" onClick={() => removeFilter(item)}>
                                <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                              </button>
                            </span>
                          </li>
                        ))
                      : filterConfig.values?.map((item) => (
                          <li key={item}>
                            <label>
                              <input type="checkbox" className="peer sr-only" hidden value={item} {...methods.register('supplier')} />
                              <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                                {item}
                              </span>
                            </label>
                          </li>
                        ))}
                  </ul>
                  <button
                    type="button"
                    className={clsx(
                      'relative btn-tertiary btn btn-sm btn-square md:btn-lg md:rounded-full flex-shrink-0',
                      lengthFilters > 0 && 'btn-active'
                    )}
                    onClick={handleModalFilter}
                  >
                    <Svg src="/icons/bold/filter.svg" width={24} height={24} />
                    {lengthFilters > 0 ? (
                      <span className="badge z-10 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                        <span>{lengthFilters}</span>
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>
            </section>
            {filters.length || (categorySelect.slug != '' && categorySelect.slug !== 'tat-ca') ? (
              <SectionProduct title="Danh sách sản phẩm" className="mt-2 md:mt-16 xl:mt-20 px-4 py-6 md:p-0">
                {/* <ul className="max-xl:hidden flex whitespace-nowrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1 mt-4">
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
                </ul> */}
                <div className="-mx-1 md:-mt-2 flex xl:-mx-3 flex-wrap">
                  {products.map((product, index) => (
                    <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:w-1/4 xl:px-3">
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
                            sold={999}
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
                    {productsActive.slice(0, 6).map((product, index) => (
                      <div key={product.id} className="mt-6 w-1/2 min-w-[160px]  px-2 md:w-1/3 xl:mt-8 xl:px-3">
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
                              sold={Math.floor(Math.random() * 500)}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>

                <SectionProduct title="Sản phẩm cho bạn" className="mt-2 md:mt-16 xl:mt-20 px-4 pt-6 md:p-0">
                  <div ref={refDiv} className="-mx-1 mt-2 flex flex-wrap xl:-mx-3">
                    {products.map((product, index) => (
                      <div key={product.id} className={'mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:w-1/4 xl:px-3'}>
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
                              sold={Math.floor(Math.random() * 500)}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>
              </>
            )}
            <div className="flex w-full items-center justify-center">
              <div className=" my-3 md:mt-8">
                <Pagination
                  pageCount={totalPage}
                  onPageChange={(page) => {
                    setPage(page.selected + 1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export const FilterComponents = ({
  brands,
  categories,
  filters
}: {
  brands: Model.Brand[];
  categories: Model.Category[];
  filters?: imallModel.Category[];
}) => {
  const methods = useFormContext<IFormSearch>();

  const [selectedPrice, setSelectedPrice] = useState(IMALL_PRICE_LIST[0]);
  const [range, setRange] = useState<[number, number] | null>(null);
  const rangeDebounce = useDebounceInput<[number, number] | null>(range, 500);
  useEffect(() => {
    if (rangeDebounce) {
      methods.setValue('range', rangeDebounce);
    }
  }, [rangeDebounce]);

  return (
    <>
      <FilterPrice
        min={0}
        max={20_000_000}
        step={500_000}
        value={range || [0, 20_000_000]}
        className="space-y-4 py-4 xl:py-0"
        onChange={(e) => {
          setRange(e);
        }}
      >
        <Listbox
          as="div"
          className="relative"
          value={selectedPrice}
          onChange={(v) => {
            setSelectedPrice(v);
            setRange(v.value);
          }}
        >
          <Listbox.Button className={'relative w-full text-left'}>
            <div className="input-bordered input w-full outline-none">{selectedPrice.name}</div>
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
              <Svg src="/icons/bold/down.svg" width={24} height={24} />
            </div>
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 my-2 max-h-60 w-full overflow-auto rounded-md border border-neutral-300 bg-neutral-0 shadow-itel top-full outline-none">
            <ul className="menu p-1">
              {IMALL_PRICE_LIST.map((option) => (
                <li key={typeof option === 'string' ? option : option.id}>
                  <Listbox.Option
                    as="button"
                    type="button"
                    value={option}
                    className={({ active }) =>
                      clsx('relative w-full  select-none py-2 pl-3 pr-9 text-left', active ? 'text-white bg-neutral-300' : 'text-gray-900')
                    }
                  >
                    <span className="block truncate">{option.name}</span>
                  </Listbox.Option>
                </li>
              ))}
            </ul>
          </Listbox.Options>
        </Listbox>
      </FilterPrice>

      <FilterList title="Thương hiệu" options={brands} {...methods.register('supplier')} className="space-y-4 py-4 xl:py-0" />
      <FilterList
        title="Loại sản phẩm"
        options={categories || []}
        {...methods.register('options.category_name')}
        className="space-y-4 py-4 xl:py-0"
      />
      {/* {filters?.length
        ? filters.map((filter) => (
            <div key={filter.id} className="">
              <Accordions>
                <Accordions.Button className="flex h-14 w-full items-center justify-between font-bold xl:h-auto">
                  {({ open }) => (
                    <>
                      <span>{filter.category_name}</span>
                      <Svg
                        className={clsx(open ? 'rotate-180' : '', 'transition-default h-8 w-8 xl:h-6 xl:w-6')}
                        src="/icons/line/chevron-up.svg"
                      />
                    </>
                  )}
                </Accordions.Button>
                <Accordions.Panel>
                  <ul className="pt-2">
                    {filter.childrent?.map((item) => (
                      <li key={item.slug}>
                        <label role="button" className="flex h-12 items-center">
                          <input type="checkbox" value={item.slug} className="mr-2" {...methods.register(`options.Slug`)} />
                          <span>{item.category_name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
            </div>
          ))
        : null} */}
    </>
  );
};

export function Layout(page: any) {
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50" className="md:bg-neutral-0">
        {page}
      </LayoutImall>
      {/* <ChatBoxLazy></ChatBoxLazy> */}
    </>
  );
}
ImallDevicePage.getLayout = Layout;

const getStaticProps = getServerPropsWithTranslation<DevicePageProps>(async () => {
  return {
    props: {
      categories: await getCategories({ parent_id: 1 }),
      brands: await getBrands({}),
      featured_products: await getListProduct({ limit: 6 })
    }
    // revalidate: 8600
  };
});
export { getStaticProps };
export default ImallDevicePage;
