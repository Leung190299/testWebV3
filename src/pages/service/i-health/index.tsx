import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';

import BannerAdvertising from '@/components/banner/banner-advertising';
import CardEvent from '@/components/card/card-event';
import CardServiceNew from '@/components/card/card-service-new';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { showModalBanner } from '@/components/modal/modal-adventise';
import SectionContainer from '@/components/pages/services/section-container';
import SectionSupports from '@/components/section/section-supports';
import Routers from '@/routes/routers';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { cloneToArray } from '@/utilities/array';

import HeaderService from '@/components/header/header-service';
import clsx from 'clsx';
import Link from 'next/link';
import { TabRouterIService } from '../../i-travel';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const IHealthServicePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const listFinace = [
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 1,
      logo: '/images/service/vexere.png',
      img: '/images/service/health/1.png',
      long: '22 ngày',
      point: 200,
      title: 'Khám bệnh online tại đối tác ABC'
    },
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 2,
      logo: '/images/service/vntrip.png',
      img: '/images/service/vexere.png',
      long: '22 ngày',
      point: 200,
      title: 'Deal khủng mùa Thu – Vi vu khắp chốn cùng iTel x Vntrip'
    }
  ];
  const listHotEvents = [
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 1,
      logo: '/images/service/vexere.png',
      img: '/images/service/eventHot/1.png',
      long: '22 ngày',
      point: 200,
      title: ''
    },
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 2,
      logo: '/images/service/vntrip.png',
      img: '/images/service/eventHot/2.png',
      long: '22 ngày',
      point: 200,
      title: ''
    },
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 3,
      logo: '/images/service/vntrip.png',
      img: '/images/service/eventHot/3.png',
      long: '22 ngày',
      point: 200,
      title: ''
    },
    {
      deadline: '5/6/2023, 3:47:03 PM',
      from: '4/5/2023, 3:47:03 PM',
      id: 4,
      logo: '/images/service/vntrip.png',
      img: '/images/service/eventHot/4.png',
      long: '22 ngày',
      point: 200,
      title: ''
    }
  ];
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>

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
      <HeaderService />

      <section className="container max-md:px-0 md:pt-20 md:pb-16 xl:pb-6">
        <SectionContainer>
          <h1 className="font-itel md:text-h-lg xl:text-h1 text-h-xxs md:text-center">
            <b>iTel Y tế & sức khỏe</b>
          </h1>
          <div className="md:mt-4 xl:mt-0 divide-y divide-neutral-100 md:divide-y-0">
            {listFinace.map((item) => (
              <div key={item.id} className="md:mt-6 xl:mt-14">
                <CardServiceNew
                  desc="Chương trình ưu đãi dành cho các khách hàng đăng ký mở thẻ Visa Platinum, Visa Platinum Cashback và nhiều dòng thẻ phổ thông khác tại Sacombank."
                  title={item.title}
                  image={item.img}
                  onClick={() => showModalBanner('bank')}
                />
              </div>
            ))}
          </div>
        </SectionContainer>
        <SectionContainer className="md:mt-20 mt-2">
          <h2 className="font-itel md:text-h-md text-xxs md:text-center">
            <b>Chương trình hấp dẫn</b>
          </h2>
          <div className="-mt-1 md:mt-0 flex flex-wrap -mx-1.5 md:-mx-3">
            {listHotEvents.map((voucher, index) => (
              <Link
                className={clsx('w-1/2 px-1.5 md:px-3 xl:w-1/3 mt-4 md:mt-10', index > 2 && 'xl:hidden')}
                key={voucher.id}
                href={{ pathname: Routers.ITRAVEL_SERVIVE_DETAIL, query: { id: 1 } }}
              >
                <CardEvent
                  img={voucher.img}
                  title="Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới Lấy việc giúp đỡ người khác làm mục tiêu sống"
                  desc={'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'}
                />
              </Link>
            ))}
          </div>
        </SectionContainer>
      </section>
      <SectionSupports />
    </>
  );
};

IHealthServicePagge.displayName = 'IHealthServicePagge';

IHealthServicePagge.getLayout = LayoutWithChatBox;

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

export default IHealthServicePagge;
export { getStaticProps };
