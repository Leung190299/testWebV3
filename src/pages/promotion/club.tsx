import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useRef } from 'react';

import BannerAdvertising from '@/components/banner/banner-advertising';
import CardCoupon from '@/components/card/card-coupon';
import ComboboxesSimple from '@/components/comboboxes/comboboxes-simple';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { toggleModalSelectionList } from '@/components/modal/selection/modal-selection-list';
import Pagination from '@/components/pagination/Pagination';
import SectionInformation from '@/components/section/section-information-for-you';
import SkeletonItelClub from '@/components/skeleton/skeletonItelClub';
import PopupSearchVoucher from '@/components/voucher/PopupSearchVoucher';
import { useGlobalContext } from '@/context/global';
import useDebounceInput from '@/hooks/useDebounceInput';
import useDebounceQuery from '@/hooks/useDebounceQuery';
import itelClubService from '@/services/itelClubService';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data, Model } from '@/types/model';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FILTER_VOUCHER_BY_PPOINT, TAB_CATEGORIES_CLUB } from '../../constants/iwow.constants';

type PageProps = {
  vouchersForYou: Data.Vouchers;
};
export const TabRouterIwow = ({ isTop }: { isTop?: boolean }) => {
  const router = useRouter();
  const activeRef = useRef<null | HTMLAnchorElement>(null);
  const prentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      prentRef.current?.scrollTo({ left: activeRef.current.offsetLeft });
    }
  }, [activeRef]);

  if (isTop)
    return (
      <>
        <HeaderWebDefault title="Ưu đãi iWow" withMenu withSearch withCart />
        <div className="md:mb-2 border-b border-neutral-200 md:hidden sticky top-16 bg-neutral-0 z-10">
          <div className="tabs -mb-px flex-nowrap md:gap-x-8 gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide" ref={prentRef}>
            {/* {TAB_MENU_IWOW.map((tab) => (
              <Link
                href={tab.path}
                scroll={false}
                className={clsx(
                  'tab-bordered border-red-500 border-opacity-0 p-4 text-base tab pt-1',
                  tab.path == router.pathname && 'tab-active'
                )}
                key={tab.id}
                ref={tab.path == router.pathname ? activeRef : null}
              >
                {tab.title}
              </Link>
            ))} */}
          </div>
        </div>
      </>
    );
  return (
    <div className="justify-center max-md:hidden p-0 px-14 flex bg-neutral-0">
      {/* {TAB_MENU_IWOW.map((tab) => (
        <Link
          href={tab.path}
          scroll={false}
          className={clsx(
            'pt-6 pb-5 px-8 text-xl',
            tab.path == router.pathname ? 'bg-red-500 text-base-100 border-b-4 border-red-300' : 'text-neutral-800'
          )}
          key={tab.id}
        >
          <b> {tab.title}</b>
        </Link>
      ))} */}
    </div>
  );
};
const IWowClubPage: NextPage<PageProps> = ({ vouchersForYou }) => {
  const { user,info } = useGlobalContext();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listVouchersForYou, setListVouchersForYou] = useState<Model.Voucher[]>(vouchersForYou.data);
  const [pageForYou, setPageForYou] = useState<number>(1);
  const [isMoreForYou, setIsMoreForYou] = useState(true);
  const [filter, setFilter] = useState<{ id: number; name: string }>(FILTER_VOUCHER_BY_PPOINT[0]);
  const [vouchers, setVouchers] = useState<itelClubModel.Voucher[]>([]);
  const [vouchersResult, setVouchersResult] = useState<itelClubModel.VoucherResult>({});
  const [vouchersVipResult, setVouchersVipResult] = useState<itelClubModel.VoucherResult>({});
  const [vouchersVip, setVouchersVip] = useState<itelClubModel.Voucher[]>([]);
  const [categories, setCategories] = useState<itelClubModel.Category[]>([]);

  const [banner, setBanner] = useState<itelClubModel.Banner>();
  const [payload, setPayload] = useState<itelClubModel.paramFilter>({
    rankId: 0,
    voucherId: 0,
    title: ''
  });
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);
  const showSearch = useBoolean(false);
  const [isLoad, setIsLoad] = useState(false);
  const textSearch = useDebounceInput<string>(searchText, 1000);
  const [queryDebounced, setTextDebounced, forceDebouced] = useDebounceQuery(300, true);

  const [activeCategory, setActiveCategory] = useState<number | string>(TAB_CATEGORIES_CLUB[0].id);
  const handleSelectFilter = () => {
    toggleModalSelectionList({
      title: 'Mức điểm',
      defaultValue: filter,
      withReject: true,
      options: FILTER_VOUCHER_BY_PPOINT
    }).then((d) => {
      if (d) setFilter(d);
    });
  };
  const handleChangeCategory = (id: number | string) => {
    setPayload({
      ...payload,
      categoryId: id
    });
    setActiveCategory(id);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      if (!isMoreForYou) return;
      const pageNext = pageForYou + 1;
      const vouchersMore = await vouchersServices.getListVoucher({ limit: 4, page: pageNext });
      if (!vouchersMore.data.length) {
        setIsMoreForYou(false);
        return;
      }
      setListVouchersForYou([...listVouchersForYou, ...vouchersMore.data]);
      setPageForYou(pageNext);
    } finally {
      setIsLoading(false);
    }
  };

  const getListVoucher = async (page: number = 1) => {
    const param: Pick<itelClubModel.Params, 'page' | 'pageSize'> = {
      page,
      pageSize: 12
    };
    setIsLoad(false);
    const res = itelClubService.getFilterVoucher(payload, param);
    await res.then((data) => {
      if (data.code == 200) {
        setIsLoad(true);
      }
      if (data.result.error) {
        setError(data.result.error);
      }
      setVouchers(data.result?.data?.content || []);
      setVouchersResult({ ...data.result.data, content: [] });
    });
    handleScroll();
  };
  const getListVoucherVip = async () => {
    const param: Pick<itelClubModel.Params, 'page' | 'pageSize'> = {
      page: 1,
      pageSize: 4
    };

    const res = itelClubService.getVipVoucher(param);
    await res.then((data) => {
      setVouchersVip(data.result?.data?.content || []);
      setVouchersVipResult({ ...data.result.data, content: [] });
    });
  };


  const getCategory = async () => {
    const res = itelClubService.getCategories();
    await res.then((data) => {
      setCategories(data.result);
    });
  };
  const getBanner = async () => {
    const param: itelClubModel.Params = {
      columnFilters: {},
      sort: [],
      page: 1,
      pageSize: 1000,
      lang: 1
    };
    const res = itelClubService.getBannerLoyalty(param);
    await res.then((data) => {
      return setBanner(data.result.BannerMain);
    });
  };

  const handleScroll = () => {
    if (divRef.current) {
      window.scrollTo({
        top: divRef.current.offsetTop - 200,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {

    getBanner();
    getCategory();
    getListVoucherVip();
  }, [user]);

  useEffect(() => {
    getListVoucher();
  }, [payload]);

  useEffect(() => {
    if (!searchText) return;
    setPayload({
      ...payload,
      title: textSearch
    });
  }, [textSearch]);
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>

      <TabRouterIwow isTop />
      <BannerAdvertising
        type="tertiary"
        data={[
          {
            id: 1,
            media: {
              desktop: banner?.Thumbnail || '/images/iwow/clubBanner.png',
              tablet: banner?.Thumbnail || ' /images/iwow/clubBanner.png',
              mobile: banner?.ThumbnailMobile || '/images/iwow/clubBanner.png'
            },
            title: ''
          }
        ]}
      />
      <TabRouterIwow />

      {!!user && (
        <section className="container py-4 md:py-8 space-y-4 md:space-y-6">
          <div className="px-6 md:px-10">
            <h1 className="text-center text-xl md:text-[32px] leading-tight">
              <b>Xin chào {info.fullName}</b>
            </h1>
            <p className="mt-1 text-center text-sm text-neutral-500 md:text-base">
              Tận hưởng loạt ưu đãi cực hot dành riêng cho thuê bao của bạn!
            </p>
          </div>
          <div className="flex w-full gap-3 overflow-auto scrollbar-hide xl:justify-center">
            <div className="w-[185px] md:w-1/3 xl:w-[17.5rem] flex-shrink-0">
              <div className="w-full flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-rank p-4 text-center text-neutral-0">
                <img alt="" src="/images/iwow/silver.svg" className="h-8 w-8 md:h-12 md:w-12" />
                <h1 className="pt-1 font-itel text-xl md:text-2xl">{info.rankName}</h1>
                <p className="pt-1 text-xs">{/* Điểm cần để lên hạng Vàng: <b>234</b> */}</p>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Quyền lợi hội viên
                </button>
              </div>
            </div>
            <div className="w-[185px] md:w-1/3 xl:w-[17.5rem] flex-shrink-0">
              <div className="w-full flex h-full flex-col items-center justify-center rounded-2xl bg-neutral-0 p-4 text-center">
                <div className="bg-neutral-50 w-full h-full flex flex-col justify-center rounded-2xl">
                  <b className="pt-1 text-2xl text-orange md:text-[32px]">{info.currentPoint}</b>
                  <p className="pt-1 text-sm text-neutral-500">điểm iTel Club</p>
                </div>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Lịch sử tích điểm
                </button>
              </div>
            </div>
            <div className="w-[185px] md:w-1/3 xl:w-[17.5rem] flex-shrink-0">
              <div className="w-full flex h-full flex-col items-center justify-center rounded-2xl bg-neutral-0 p-4 text-center">
                <div className="bg-neutral-50 w-full h-full flex flex-col justify-center rounded-2xl">
                  <b className="pt-1 text-2xl text-orange md:text-[32px]">0</b>
                  <p className="pt-1 text-sm text-neutral-500">Ưu đãi đang có</p>
                </div>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Ưu đãi của tôi
                </button>
              </div>
            </div>
          </div>
          {/* <p className="text-center text-sm text-neutral-800">
            <b className="font-medium">Dùng ngay! 36 điểm sẽ hết hạn vào 12/03/2023</b>
          </p> */}
        </section>
      )}
      <section className="mobile-container xl:pt-16 md:pt-16 pt-4 bg-neutral-0">
        <div className="container max-md:px-0">
          <div>
            <div className="xl:px-10 text-center">
              <h1 className="xl:text-5xl text-2xl text-neutral-800 font-itel md:text-5xl">
                <b>Ưu đãi</b> <b className="text-red-500">iTel Club</b>
              </h1>
              <p className="text-neutral-500 text-sm md:text-base xl:pb-0 md:pb-10 pb-4">
                Đổi điểm nhận quà, quẩy tiệc mỗi ngày với hàng <br className="md:hidden" />
                ngàn ưu đãi
              </p>
              <div className="flex md:hidden tabs -mb-px flex-nowrap overflow-auto whitespace-nowrap scrollbar-hide">
                <div className="w-10 xl:hidden" />
                <button
                  onClick={() => handleChangeCategory('')}
                  className={clsx('tab tab-bordered border-neutral-100 p-4 text-base', activeCategory == '' && 'tab-active border-red-500')}
                >
                  Tất cả
                </button>
                {categories.map((tab) => (
                  <button
                    onClick={() => handleChangeCategory(tab.id || 1)}
                    className={clsx(
                      'tab tab-bordered border-neutral-100 p-4 text-base',
                      tab.id == activeCategory && 'tab-active border-red-500'
                    )}
                    key={tab.id}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="xl:mt-10 mt-3 flex w-full gap-4 xl:justify-center">
                <div className="relative flex w-full md:rounded-full rounded-lg bg-neutral-100 xl:w-[624px]">
                  <div className="flex h-full items-center md:p-4 p-2">
                    <Svg src="/icons/bold/vector.svg" className="block md:h-6 md:w-6 w-5 h-5" />
                  </div>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setSearchText(e.target.value);
                    }}
                    placeholder="Tìm kiếm"
                    className="peer w-full bg-transparent md:p-4 p-2 outline-none md:block hidden"
                    value={searchText}
                  />
                  <div className="relative w-full md:hidden">
                    <div className="absolute w-full h-full" onClick={showSearch.setTrue} />
                    <input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setSearchText(e.target.value);
                      }}
                      placeholder="Tìm kiếm"
                      className="peer w-full bg-transparent md:p-4 p-2 outline-none md:hidden block"
                      value={searchText}
                    />
                    {searchText && (
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSearchText('');
                        }}
                      >
                        <Svg src="/icons/line/close.svg" className="block" width={20} height={20} />
                      </div>
                    )}
                  </div>
                  <PopupSearchVoucher
                    onChange={(v) => {
                      setSearchText(v);
                      setPayload({
                        ...payload,
                        title: v
                      });
                    }}
                    open={showSearch.value}
                    setOpen={showSearch.setValue}
                    handleClose={showSearch.setFalse}
                  />
                </div>
                <div className="xl:hidden hidden md:block">
                  <ComboboxesSimple
                    className="rounded-full whitespace-nowrap pr-8 font-bold w-[166px]"
                    classNameOptions="w-max right-0"
                    options={FILTER_VOUCHER_BY_PPOINT}
                    onChange={(e) => setFilter(e)}
                    displayValue={(item) => item?.name}
                    value={filter}
                    placeholder="Mức điểm"
                    disableInput
                  />
                </div>
                <div className="hidden">
                  <div className="relative">
                    <Svg
                      src="/icons/bold/filter.svg"
                      className={clsx(filter.id !== -1 && 'text-red-500', 'w-10 h-10 p-2 bg-neutral-100 rounded-lg')}
                      onClick={handleSelectFilter}
                    />
                    <div
                      className={clsx(
                        filter?.id !== FILTER_VOUCHER_BY_PPOINT[0].id && 'w-4 h-4 bg-red-500 rounded-full absolute -top-2 -right-2'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:my-10 flex justify-between border-b border-transparent">
              <div className="md:flex hidden tabs -mb-px flex-nowrap gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide">
                <button
                  onClick={() => handleChangeCategory('')}
                  className={clsx('tab tab-bordered border-neutral-100 p-3 text-base', activeCategory == '' && 'tab-active border-red-500')}
                >
                  Tất cả
                </button>
                {categories.map((tab) => (
                  <button
                    onClick={() => handleChangeCategory(tab.id || '')}
                    className={clsx(
                      'tab tab-bordered border-red-500 border-opacity-0 p-3 text-base',
                      tab.id == activeCategory && 'tab-active'
                    )}
                    key={tab.id}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="hidden  ">
                <ComboboxesSimple
                  className="rounded-full pr-9 font-bold"
                  classNameOptions="w-max right-0 font-bold"
                  options={FILTER_VOUCHER_BY_PPOINT}
                  onChange={(e) => setFilter(e)}
                  displayValue={(item) => item?.name}
                  value={filter}
                  placeholder="Mức điểm"
                  disableInput
                />
              </div>
            </div>
            {!isLoad ? (
              <SkeletonItelClub />
            ) : (
              <div ref={divRef} className="mt-3 grid grid-cols-2 xl:gap-6 md:gap-6 gap-3 xl:grid-cols-4">
                {vouchers.length > 0 ? (
                  vouchers.map((voucher, index) => (
                    <CardCoupon
                      data={voucher}
                      id={voucher.voucher_id || ''}
                      key={voucher.id}
                      img={voucher.images_rectangle?.[320] || ''}
                      logo={voucher.brandLogoLoyalty || ''}
                      title={voucher.title || ''}
                      redemptionDeadline={voucher.expire_duration || ''}
                      point={voucher.point || 0}
                      className={clsx(
                        'md:bg-neutral-50 border border-neutral-200 md:border-none',
                        index > 9 ? 'max-xl:hidden' : index > 5 && 'max-md:hidden'
                      )}
                    />
                  ))
                ) : (
                  <p className="text-lg col-span-2">Rất tiếc!!! Chưa tìm thấy kết quả phù hợp, vui lòng thử lại</p>
                )}
              </div>
            )}

            {/* {!error.includes('SUCCESS') && <p className="text-base text-neutral-500">{error}</p>} */}
            {vouchers.length > 0 && (
              <div className=" mt-3 md:mt-8">
                <Pagination
                  pageCount={vouchersResult.totalPages || 1}
                  onPageChange={(page) => {
                    getListVoucher(page.selected + 1);
                  }}
                />
              </div>

            )}
          </div>
          <SectionProduct
            title="Ưu đãi dành riêng cho VIP"
            className="container py-10 overflow-auto overflow-x-hidden md:py-20"
            classTitle="text-xl"
          >
            {!isLoad ? (
              <div className="mt-10">
                <SkeletonItelClub />
              </div>
            ) : (
              <div className="mt-4 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 xl:grid-cols-4">
                {vouchersVip.map((voucher) => (
                  <CardCoupon
                    data={voucher}
                    id={voucher.voucher_id || ''}
                    key={voucher.id}
                    img={voucher.images_rectangle?.[320] || ''}
                    logo={voucher.brandImage || ''}
                    title={voucher.title || ''}
                    redemptionDeadline={voucher.expire_duration || ''}
                    point={voucher.point || 0}
                    className="md:bg-neutral-50 border border-neutral-200 md:border-none"
                  />
                ))}
              </div>
            )}
            <div className="mt-10 flex justify-center">
              {vouchersVipResult.totalPages && vouchersVipResult.totalPages > 1 ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={clsx(
                    'transition-default btn-secondary btn w-27 md:btn-sm md:w-52 rounded-full px-0',
                    isLoading && 'cursor-wait opacity-5'
                  )}
                >
                  Xem Thêm
                </button>
              ) : (
                <p className="text-base text-neutral-500">Bạn đã đến cuối của danh sách</p>
              )}
            </div>
          </SectionProduct>
        </div>
      </section>
      <div className="md:mb-16">
        <SectionInformation classSection="md:!bg-neutral-100 !bg-neutral-0 pb-8" />
      </div>
      <SectionSupports />
    </>
  );
};

IWowClubPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchersForYou
    }
    // revalidate: 8600
  };
});

export default IWowClubPage;
export { getStaticProps };
