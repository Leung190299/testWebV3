import HeaderWebDefault from '@/components/header/header-web-default';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import VoucherContent from '@/components/pages/voucher/voucher-content';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BannerAdvertising from '@/components/banner/banner-advertising';
import CardCoupon from '@/components/card/card-coupon';
import SkeletonDetailClub from '@/components/skeleton/skeletonDetailClub';
import SkeletonItelClub from '@/components/skeleton/skeletonItelClub';
import { modal } from '@/libs/modal';
import itelClubService from '@/services/itelClubService';
import { useRouter } from 'next/router';

type PageProps = {
  vouchers: Data.Vouchers;
};

const VoucherDetailPage: NextPage<PageProps> = () => {
  const [status, setStatus] = useState<itelClubModel.status>('CHANGE');
  const [detailVoucher, setDetailVoucher] = useState<itelClubModel.DetailVoucher>({});
  const router = useRouter();
  const { id, category } = router.query;
  const [vouchers, setVouchers] = useState<itelClubModel.Voucher[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  const getDetailVoucher = async (id: string | number) => {
    const res = itelClubService.getDetailVoucher(id);
    await res
      .then((data) => {
        setDetailVoucher(data.result.data || {});
      })
      .catch((e) => {
        return modal.confirm({
          title: 'Thông báo',
          content: <p data-theme="light">{e.response.data.result.error}</p>,
          confirmLable: 'Xác nhận',
          onDone: () => {
            router.push(Routers.PROMOTION_ICLUB);
          }
        });
      });
  };
  const getListVoucher = async (page: number = 1) => {
    const payload: itelClubModel.paramFilter = {
      rankId: 0,
      voucherId: id as string,
      title: '',
      categoryId: category as string
    };
    const param: Pick<itelClubModel.Params, 'page' | 'pageSize'> = {
      page,
      pageSize: 4
    };
    setIsLoad(false);
    const res = itelClubService.getFilterVoucher(payload, param);
    await res.then((data) => {
      if (data.code == 200) {
        setIsLoad(true);
      }
      setVouchers(data.result?.data?.content || []);
    });
  };
  useEffect(() => {
    if (id && category) {
      getDetailVoucher((id as string) || '');
      getListVoucher();
    }
  }, [id, category]);
  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi - ${detailVoucher.title} `}</title>
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
                <Link href={Routers.PROMOTION_ICLUB}>Ưu đãi iWow</Link>
              </li>
              <li>
                <Link href={Routers.PROMOTION_ICLUB}>Ưu đãi iTel Club</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={''}>Chi tiết voucher</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 py-6 md:pt-10 md:pb-16 xl:pb-20">
        {!isLoad ? (
          <SkeletonDetailClub />
        ) : (
          <VoucherContent
            data={detailVoucher}
            isReceived={status === 'RECEIVED'}
            isRequiredPoint={status === 'CHANGE'}
            isShowDebug={false}
          />
        )}
      </section>

      <SectionProduct
        title="Ưu đãi tương tự"
        className="container py-4 md:py-10 xl:py-20 overflow-x-hidden"
        classSection="bg-neutral-50"
        isOdd={null}
      >
        {!isLoad ? (
          <SkeletonItelClub />
        ) : (
          <div className="mt-4 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 xl:grid-cols-4">
            {vouchers.map((voucher) => (
              <CardCoupon
                data={voucher}
                classButton="max-md:hidden"
                id={voucher.voucher_id || ''}
                key={voucher.id}
                img={voucher.images_rectangle?.[320] || ''}
                logo={voucher.brandImage || ''}
                title={voucher.title || ''}
                redemptionDeadline={voucher.expire_duration || ''}
                point={voucher.point || 0}
                className="bg-neutral-0 xl:pb-6"
              />
            ))}
          </div>
        )}
      </SectionProduct>
      <SectionSupports />
      {/* <DebugUI className="bg-neutral-0 rounded-lg shadow-itel" title="Trạng thái">
        <DebugUI.OptionsList
          options={[
            { value: 'RECEIVED', name: 'Đã nhận' },
            { value: 'CHANGE', name: 'Đổi' },
            { value: 'GET', name: 'Nhận' }
          ]}
          onChange={(v) => setStatus(v.value as itelClubModel.status)}
          checkedValue={status}
        />
      </DebugUI> */}
    </>
  );
};

VoucherDetailPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers
    }
  };
});

export { getStaticProps };
export default VoucherDetailPage;
