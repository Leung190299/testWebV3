import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';

import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { Data } from '@/types/model';

import BannerAdvertising from '@/components/banner/banner-advertising';
import NewsCardShort from '@/components/card/card-news-short';
import CardVoucherHot from '@/components/card/card-voucher-hot';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionProduct from '@/components/section/section-products';
import Routers from '@/routes/routers';
import vouchersServices from '@/services/vouchers/vouchers';
import { cloneToArray } from '@/utilities/array';
import { useState } from 'react';
import { TabRouterIwow } from './club';
import CardPromotion from '@/components/card/card-promotion';
import Link from 'next/link';
import CardNews from '@/components/card/card-news';
import PaginationSimple from '@/components/pagination/pagination-simple';

type PageProps = {
  vouchers: Data.VouchersHOT;
  vouchersHOT: Data.VouchersHOT;
  shorts: Data.Shorts;
};
const IWowHotPage: NextPage<PageProps> = ({ vouchers, vouchersHOT, shorts }) => {
  const [isShowShorts, setIsShowShorts] = useState(false);
  return (
    <>
      <Head>
        <title>Itel - HOT</title>
      </Head>
      <TabRouterIwow isTop />
      <BannerAdvertising
        type="tertiary"
        data={cloneToArray(
          {
            id: 1,
            media: {
              desktop: '/images/iwow/hotBanner.png',
              tablet: '/images/iwow/hotBanner.png',
              mobile: '/images/iwow/hotBanner.png'
            },
            title: 'Bội thực deal ngon \nTại iTel club',
            mobileTitle: '',
            actionTitle: 'Khám phá ngay'
          },
          4
        )}
      />
      <TabRouterIwow />

      <div className="md:bg-neutral-100 bg-neutral-0 pt-4 md:pt-16 xl:pt-20">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl text-[32px] uppercase text-neutral-800 font-itel">
            <b>Chương trình</b> <b className="text-red-500">HOT</b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-2">Hàng ngàn voucher, ưu đãi, đổi điểm nhận quà</p>
        </div>
        <div className="container mt-5 md:mt-14 md:px-10 pb-4 md:pt-0">
          <div className="md:mt-10 grid md:gap-6 gap-3 lg:grid-cols-3">
            {vouchersHOT.data.slice(0, 1).map((voucher, i) => (
              <CardVoucherHot
                classWrap="lg:px-0"
                classNameTitle="line-clamp-1"
                key={voucher.id}
                {...voucher}
                className={clsx(i === 0 && 'col-span-2 row-span-2 rounded-none lg:rounded-2xl', i > 0 && 'lg:rounded-xl')}
                iShowButton={false}
                classNameFrame={clsx(i === 0 ? 'aspect-photo' : ' aspect-video', 'lg:rounded-2xl rounded-xl', i > 0 && 'rounded-xl')}
              />
            ))}
            <div className="col-span-1 grid-cols-2 grid gap-3 lg:grid-cols-1">
              {vouchersHOT.data.slice(1, 3).map((voucher, i) => (
                <CardVoucherHot
                  classWrap="lg:px-0"
                  classNameTitle="line-clamp-1"
                  key={voucher.id}
                  {...voucher}
                  className={clsx('lg:rounded-xl !rounded-none')}
                  iShowButton={false}
                  classNameFrame={clsx('aspect-video lg:aspect-cinema', 'rounded-xl')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionProduct
        isOdd={null}
        classSection="bg-neutral-0 md:bg-neutral-100"
        classTitle="md:text-h4 text-xl"
        title="Khuyến mại hot"
        className="container py-4 md:pb-16 md:py-20"
      >
        <div className="flex overflow-auto flex-wrap -mx-1.5 md:-mx-3">
          {vouchers.data.map((voucher, index) => (
            <Link
              href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: voucher.id } }}
              key={voucher.id}
              className="mt-3 md:mt-10 px-1.5 md:px-3 w-1/2 xl:w-1/3"
            >
              <CardPromotion
                img={voucher.img}
                title={'Phim mới ra mắt: ' + voucher.title}
                className="bg-neutral-0"
                imageClassName="block-photo md:block-video"
                hideActionOnMobile
              />
            </Link>
          ))}
        </div>
        <div className="max-md:hidden mt-10">
          <PaginationSimple adjacent={4} totalPage={15} />
        </div>
        <div className="md:hidden mt-3">
          <PaginationSimple adjacent={[3, 1]} totalPage={15} />
        </div>
      </SectionProduct>
      <SectionProduct
        title="Shorts nổi bật"
        classTitle="md:text-h4 text-xl"
        className="container py-4 md:py-16 xl:py-20"
        onClickHref={() => {
          setIsShowShorts(true);
        }}
      >
        <div className="mt-3 md:mt-10 gap-3 grid md:hidden lg:grid lg:grid-cols-4 grid-flow-col overflow-auto md:gap-6 scrollbar-hide">
          {shorts.data.slice(0, 4).map((short, i) => (
            <NewsCardShort
              autoShowPopup={i === 0 && isShowShorts}
              handleClose={() => setIsShowShorts(false)}
              short={short}
              key={short.id}
              shorts={shorts}
            />
          ))}
        </div>
        <div className="mt-3 md:mt-10 gap-6 md:grid-cols-3 lg:hidden hidden md:grid">
          {shorts.data.slice(0, 3).map((short) => (
            <NewsCardShort short={short} key={short.id} shorts={shorts} />
          ))}
        </div>
      </SectionProduct>
      <SectionProduct
        isOdd={null}
        classSection="bg-neutral-0 md:bg-neutral-100"
        title="Phim hot"
        classTitle="md:text-h4 text-xl"
        className="container py-4 md:py-16 xl:py-20"
        href={Routers.IFILM}
      >
        <div className="flex overflow-auto md:flex-wrap -mx-1.5 md:-mx-3 scrollbar-hide">
          {vouchers.data.slice(0, 4).map((voucher, index) => (
            <Link
              href={{ pathname: Routers.IFILM }}
              key={voucher.id}
              className={clsx('mt-3 md:mt-10 px-1.5 md:px-3 w-36 md:w-1/2 xl:w-1/3 flex-shrink-0', index > 2 ? 'xl:hidden' : undefined)}
            >
              <CardNews className="md:hidden" title={voucher.title} img={voucher.img} subDesc="iTel Phim • 12/2/2023" />
              <CardPromotion
                img={voucher.img}
                title={voucher.title}
                className="max-md:hidden bg-neutral-50"
                imageClassName="block-photo md:block-video"
              />
            </Link>
          ))}
        </div>
      </SectionProduct>
      <SectionProduct title="Game hot" classTitle="md:text-h4 text-xl" className="container py-4 md:py-16 xl:py-20" href={Routers.IGAME}>
        <div className="flex overflow-auto md:flex-wrap -mx-1.5 md:-mx-3 scrollbar-hide">
          {vouchers.data.slice(0, 4).map((voucher, index) => (
            <Link
              href={{ pathname: Routers.IGAME_DETAIL, query: { id: voucher.id } }}
              key={voucher.id}
              className={clsx('mt-3 md:mt-10 px-1.5 md:px-3 w-36 md:w-1/2 xl:w-1/3 flex-shrink-0', index > 2 ? 'xl:hidden' : undefined)}
            >
              <CardNews
                className="md:hidden"
                title={voucher.title}
                img={voucher.img}
                subDesc={
                  <span>
                    <span className="max-md:hidden">iTel Phim • </span>12/2/2023
                  </span>
                }
              />
              <CardPromotion
                img={voucher.img}
                title={voucher.title}
                className="max-md:hidden bg-neutral-50"
                imageClassName="block-photo md:block-video"
              />
            </Link>
          ))}
        </div>
      </SectionProduct>
      <BannerAdvertising
        type="secondary"
        data={cloneToArray(
          {
            id: 1,
            media: {
              desktop: '/images/iwow/bannerSmall.png',
              tablet: '/images/iwow/bannerSmall.png',
              mobile: '/images/iwow/bannerSmall.png'
            },
            title: 'Gói may đột phá \nbá chủ data',
            mobileTitle: 'Banner \nquảng cáo',
            hideBtnOnTablet: true,
            desc: '4GB/ ngày 77K/ tháng \nMiễn phí gọi nội mạng iTel & Vinaphone',
            actionTitle: 'Trải nghiệm ngay'
          },
          4
        )}
      />
      <SectionSupports />
    </>
  );
};

IWowHotPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchersHOT = await vouchersServices.getListVoucherHOT({ limit: 3 });
  const vouchers = await vouchersServices.getListVoucherHOT({ limit: 6 });
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  return {
    props: {
      vouchersHOT,
      vouchers,
      shorts
    },
    // revalidate: 8600
  };
});

export default IWowHotPage;
export { getStaticProps };
