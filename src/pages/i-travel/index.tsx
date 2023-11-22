import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import CardEvent from '@/components/card/card-event';
import CardService from '@/components/card/card-service';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { showVietllot } from '@/components/modal/modal-vietlot';
import SectionContainer from '@/components/pages/services/section-container';
import SectionSupports from '@/components/section/section-supports';
import ContentService from '@/components/service/ContentService';
import { TAB_MENU_SERVICES } from '@/constants/services.constants';
import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import Digitalservice from '@/services/Digitalservice';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';

import BannerAdvertising from '@/components/banner/banner-advertising';
import HeaderWebDefault from '@/components/header/header-web-default';
import { cloneToArray } from '@/utilities/array';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};
export const TabRouterIService = ({ isTop }: { isTop?: boolean }) => {
  const router = useRouter();
  const [isShowVietlott, setIsShowVietlott] = useState(false);

  if (isTop)
    return (
      <HeaderWebDefault title="Dịch vụ số" withMenu withSearch>
        <div className="md:mb-2 border-b border-neutral-200 sm:hidden sticky top-16 bg-neutral-0 z-10">
          <div className="tabs -mb-px flex-nowrap md:gap-x-8  overflow-auto whitespace-nowrap scrollbar-hide">
            {TAB_MENU_SERVICES.reduce(
            //@ts-ignore
              (array, item) => (router.pathname.includes( item.path) ? [item, ...array] : [...array, item]),
              []
              //@ts-ignore
            ).map((tab: { id: number | string; title: string; path: string }) =>
              Routers.IFINANCE_VIETLOTT_SERVIVE === tab.path ? (
                <div
                  onClick={() => showVietllot()}
                  className={clsx(
                    'tab-bordered border-red-500 border-opacity-0 p-3 text-base tab md:pt-4 pt-0',
                    tab.path == router.pathname && 'tab-active'
                  )}
                  key={tab.id}
                >
                  {tab.title}
                </div>
              ) : (
                <Link
                  href={tab.path}
                  scroll={false}
                  className={clsx(
                    'tab-bordered border-red-500 border-opacity-0 p-3 text-base tab md:pt-4 pt-0',
                    tab.path == router.pathname && 'tab-active'
                  )}
                  key={tab.id}
                >
                  {tab.title}
                </Link>
              )
            )}
          </div>
        </div>
      </HeaderWebDefault>
    );
  return (
    <div className="lg:tab lg:py-0 justify-start hidden p-0 px-14 md:flex md:px-0 md:flex-nowrap whitespace-nowrap overflow-auto scrollbar-hide bg-neutral-0">
      {TAB_MENU_SERVICES.map((tab) =>
        Routers.IFINANCE_VIETLOTT_SERVIVE === tab.path ? (
          <div
            onClick={() => showVietllot()}
            className={clsx('p-4 px-8 text-xl font-bold', tab.path == router.pathname ? 'bg-red-500 text-base-100' : 'text-neutral-800')}
            key={tab.id}
          >
            {tab.title}
          </div>
        ) : (
          <Link
            href={tab.path}
            scroll={false}
            className={clsx(
              'p-4 px-8 text-xl font-bold flex flex-col',
              tab.path == router.pathname ? 'bg-red-500 text-base-100 border-b-red-300 border-b-4' : 'text-neutral-800'
            )}
            key={tab.id}
          >
            {tab.title}
          </Link>
        )
      )}
    </div>
  );
};

const pages = [

  { name: `iTel Du lịch & di chuyển`, href: '#', current: true }
];
const ITravelServicePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const listTravel: digitalservice.itemService[] = [
    {
      id: 1,
      img: '/images/service/vexere.png',
      title: 'Mua vé xe rẻ',
      onClick: () => router.push(Routers.ITRAVEL_VEXERE_SERVIVE),
      label: 'iTel Du lịch & di chuyển'
    },
    {
      id: 2,
      label: 'iTel Du lịch & di chuyển',
      img: '/images/service/vntrip.png',
      title: 'Du lịch',
      description:
        'Bạn sẽ được chuyển đến màn hình đặt phòng, vé máy bay của Công ty TNHH Công nghệ VNTRIP. Chính sách giá sẽ áp dụng theo chính sách hiện hành của Công ty VNTRIP. Trân trọng!',
      onClick: () => {
        setSelectTravel(listTravel[1]);
        setIsShowVnTrip(true);
      },
      linkApi: 'https://itel.vn/api/web/vntrip/getlink/flight'
    },
    {
      id: 3,
      label: 'iTel Du lịch & di chuyển',
      img: '/images/service/abtrip.png',
      title: 'Vé máy bay online',
      description:
        'Bạn sẽ được chuyển đến màn hình mua vé máy bay của Công ty TNHH Thương mại Du lịch và Dịch vụ Hàng không ABTRIP. <br> Giá vé sẽ áp dụng theo chính sách hiện hành của Công ty ABTRIP. Trân trọng!',
      onClick: () => {
        setSelectTravel(listTravel[2]);
        setIsShowVnTrip(true);
      },
      link: 'https://abtrip.vn/itel'
    }
  ];
  const router = useRouter();
  const [isShowVnTrip, setIsShowVnTrip] = useState<boolean>(false);
  const [selectTravel, setSelectTravel] = useState<digitalservice.itemService>(listTravel[0]);
  const [listPost, setListPost] = useState<digitalservice.post[]>([]);

  useEffect(() => {
    const getPost = async () => {
      let res = await Digitalservice.getlistPost({
        columnFilters: {
          BlogCategoryId: 14
        },
        sort: [],
        page: 1,
        pageSize: 1000,
        lang: 1
      });
      if (res.code == 200) {
        setListPost(res.result.BlockBlog);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    if (isShowVnTrip) {
      modal.open({
        render(props) {
          return (
            <div className="container p-0 md:pt-12 md:px-20 lg:p-0 relative bg-neutral-0" style={{ minHeight: '17.125rem' }}>
              <div className="flex items-center relative">
                <ContentService itemService={selectTravel} />
                <button onClick={props.close}>
                  <Svg
                    src="/icons/line/close.svg"
                    className="md:h-14 md:w-14 cursor-pointer rounded-full bg-neutral-100 md:p-4 z-10 left-2 top-3 w-10 h-10 p-2 fixed lg:absolute md:top-14 md:right-4 md:left-auto lg:top-4 lg:right-4"
                  />
                </button>
              </div>
            </div>
          );
        },
        transition: false,
        closeButton: false,
        className: 'modal-box shadow-itel !bg-neutral-50 w-full lg:w-fit lg:relative lg:!overflow-hidden lg:!rounded-2xl',
        classNameContainer: 'modal-full md:modal-bottom-sheet lg:flex lg:items-center lg:h-[-webkit-fill-available] lg:bg-transparent',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        onClose: () => setIsShowVnTrip(false)
      });
      return;
    }
  }, [isShowVnTrip]);

  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <div className="bg-neutral-100">
        <Breadcrumbs breadcrumbs={pages} />
      </div>
      <TabRouterIService isTop />
      <BannerAdvertising
        type="tertiary"
        withOverLay
        data={cloneToArray(
          {
            id: 1,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'BANNER QUẢNG CÁO',
            // mobileTitle: 'BANNER QUẢNG CÁO',
            desc: 'Thỏa sức chọn sim phong thủy, thần số học.\nTuyệt chiêu hút lộc, giải ế đổi vận. Triệu hồi ngay thần Sim phong thủy ITel!',
            actionTitle: 'Trải nghiệm ngay'
          },
          4
        )}
      />
      <TabRouterIService />

      <section className="container max-md:px-0 md:pt-20 md:pb-16 xl:pb-6">
        <SectionContainer>
          <h1 className="font-itel md:text-h-lg xl:text-h1 text-h-xxs md:text-center">
            <b>iTel Du lịch & di chuyển</b>
          </h1>
          {/* <div className="md:mt-4 xl:mt-0 divide-y divide-neutral-100 md:divide-y-0">
            {listTravel.map((item) => (
              <div key={item.id} className="md:mt-6 xl:mt-14">
                <CardServiceNew
                  desc="Chương trình ưu đãi dành cho các khách hàng đăng ký mở thẻ Visa Platinum, Visa Platinum Cashback và nhiều dòng thẻ phổ thông khác tại Sacombank."
                  title={item.title}
                  image={item.img}
                  onClick={item.onClick}
                />
              </div>
            ))}
          </div> */}

          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10 lg:mt-14">
            <div className="mt-3 grid md:grid-cols-1 gap-4 lg:gap-14 md:gap-6">
              {listTravel.map((voucher, i) => (
                <Fragment key={voucher.id}>
                  <CardService
                    onClick={voucher?.onClick}
                    classNameTitle="text-sm md:text-lg"
                    classNameDesc="hidden md:block"
                    classButton="md:text-base text-sm"
                    className="md:grid lg:grid-cols-3 md:grid-cols-5 md:rounded-2xl rounded-none"
                    classRight="!pl-4 lg:col-span-2 md:col-span-3 md:!px-4 md:!py-6 !p-0 lg:!p-10 lg:!py-10 md:justify-normal justify-center w-fit"
                    classLeft="lg:col-span-1 md:col-span-2 aspect-[2/1] md:aspect-photo rounded-md md:max-w-full max-w-[112px] lg:rounded-r-none"
                    img={voucher.img}
                    title={voucher.title}
                    desc={'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel.'}
                  />
                  <div className={clsx(i >= 0 && i < listTravel.length - 1 && 'h-[1px] w-full bg-neutral-100', 'md:hidden')} />
                </Fragment>
              ))}
            </div>
          </div>
        </SectionContainer>
        <div className="md:hidden flex w-full h-2 bg-neutral-100 mt-4" />
        <div className="md:py-20 py-4">
          <div className="lg:px-10 px-4 md:text-center">
            <h1 className="md:text-[40px] text-lg font-itel text-neutral-800">
              <b>Chương trình hấp dẫn</b>
            </h1>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10">
            <div className="mt-3 lg:hidden grid md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-4 grid-cols-2">
              {listPost.slice(0, 4).map((post) => (
                <Link key={post.Id} href={`${Routers.NEWS}/${post.Slug}`}>
                  <CardEvent
                    className="lg:!rounded-2xl !rounded-none"
                    img={post.Thumbnail || ''}
                    title={post.Title || ''}
                    desc={post.Brief || ''}
                  />
                </Link>
              ))}
            </div>
            <div className="mt-3 hidden lg:grid md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
              {listPost.slice(0, 3).map((post) => (
                <Link key={post.Id}  href={`${Routers.NEWS}/${post.Slug}`}>
                  <CardEvent key={post.Id} img={post.Thumbnail || ''} title={post.Title || ''} desc={post.Brief || ''} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SectionSupports />
    </>
  );
};

ITravelServicePagge.displayName = 'ITravelServicePagge';

ITravelServicePagge.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 10 });
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers,
      vouchersForYou
    }
    // revalidate: 8600
  };
});

export default ITravelServicePagge;
export { getStaticProps };
