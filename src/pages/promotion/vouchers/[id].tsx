import HeaderWebDefault from '@/components/header/header-web-default';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import vouchersServices, { VouchersServices } from '@/services/vouchers/vouchers';
import { Data, Model } from '@/types/model';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import BannerAdvertising from '@/components/banner/banner-advertising';
import DebugUI from '@/components/common/debug';

type PageProps = {
  voucher: Model.Voucher;
  vouchers: Data.Vouchers;
};

enum DemoStatus {
  Change,
  Get,
  Received
}

const VoucherDetailPage: NextPage<PageProps> = ({ vouchers, voucher, router }) => {
  const [status, setStatus] = useState(DemoStatus.Change);
  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi - ${voucher.title}`}</title>
      </Head>
      <HeaderWebDefault className="bg-neutral-100" title="Voucher" withSearch withMenu />
      <BannerAdvertising
        type="secondary"
        data={[
          {
            id: 1,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'Banner quảng cáo',
            mobileTitle: 'Banner \nquảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm \nsố thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay'
          },
          {
            id: 2,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'Banner quảng cáo',
            mobileTitle: 'Banner \nquảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm \nsố thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay'
          },
          {
            id: 3,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'Banner quảng cáo',
            mobileTitle: 'Banner \nquảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm \nsố thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay'
          },
          {
            id: 4,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'Banner quảng cáo',
            mobileTitle: 'Banner \nquảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm \nsố thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay'
          }
        ]}
      />
      <section>
        <div className="container">
          <div className="breadcrumbs text-xs md:text-sm text-neutral-500 py-3 md:py-4">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}>Trang chủ</Link>
              </li>
              <li>
                <Link href={Routers.PROMOTION_ICLUB}>iWow</Link>
              </li>
              <li>
                <Link href={Routers.PROMOTION_ICLUB}>Ưu đãi iTel Club</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>Chi tiết voucher</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 py-6 md:pt-10 md:pb-16 xl:pb-20">
        {/* <VoucherContent data={voucher} isReceived={status === DemoStatus.Received} isRequiredPoint={status === DemoStatus.Change} /> */}
      </section>

      <SectionProduct
        title="Ưu đãi tương tự"
        className="container py-4 md:py-10 xl:py-20 overflow-x-hidden"
        classSection="bg-neutral-50"
        isOdd={null}
      >
        <div className="mt-4 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 xl:grid-cols-4">
          {/* {vouchers.data.map((voucher) => (
            <CardCoupon
              classButton="max-md:hidden"
              id={voucher.id}
              key={voucher.id}
              img={voucher.banner}
              logo={voucher.brand.thumbnail}
              title={voucher.title}
              redemptionDeadline={voucher.long}
              point={voucher.point}
              className="bg-neutral-0 xl:pb-6"
            />
          ))} */}
        </div>
      </SectionProduct>
      <SectionSupports />
      <DebugUI className="bg-neutral-0 rounded-lg shadow-itel" title="Trạng thái">
        <DebugUI.OptionsList
          options={[
            { value: DemoStatus.Received, name: 'Đã nhận' },
            { value: DemoStatus.Change, name: 'Đổi' },
            { value: DemoStatus.Get, name: 'Nhận' }
          ]}
          onChange={(v) => setStatus(v.value)}
          checkedValue={status}
        />
      </DebugUI>
    </>
  );
};

VoucherDetailPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id;
  if (!id) return { notFound: true };
  const voucher = await VouchersServices.find({ id: Number(id) });
  const vouchers = await vouchersServices.getListVoucher({ limit: 4 });

  if (!voucher) return { notFound: true };

  return {
    props: {
      voucher,
      vouchers
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}
export { getStaticProps };
export default VoucherDetailPage;
