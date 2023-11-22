import LayoutProfile from '@/components/layout/layout-profile';
import Banner from '@/components/pages/assets/SaleBanner.png';
import { DiscountNotUsed } from '@/components/pages/profiles/component/voucher/discount-not-used';
import { DiscountUsed } from '@/components/pages/profiles/component/voucher/discount-used';
import { NOT_USED_YET, VOUCHER_USED } from '@/components/pages/profiles/constant/profile.constant';
import { useLoading } from '@/hooks/useLoading';
import itelClubService from '@/services/itelClubService';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const tabs = [
  { id: NOT_USED_YET, label: 'Chưa sử dụng', icon: '' },
  { id: VOUCHER_USED, label: 'Đã dùng/hết hạn', icon: '' }
];

const Discount: NextPage = () => {
  const [tab, setTab] = useState(NOT_USED_YET);
  const [discounts, setDiscounts] = useState<itelClubModel.Content[]>([]);
  const { openLoading, closeLoading } = useLoading();

  useEffect(() => {
    openLoading();
    itelClubService
      .getUboxUser()
      .then((res) => {
        setDiscounts(res.result?.data?.content!);
      })
      .finally(() => closeLoading());
  }, []);
  return (
    <div className="max-md:-mt-4">
      <Head>
        <title>Itel - profile</title>
      </Head>
      <section>
        <div className={'flex items-center max-md:hidden'}>
          <div className={'grow'}>
            <p className={'font-itel font-bold text-h3 text-neutral-800'}>Voucher của tôi</p>
          </div>
          {/* <VoucherFilter /> */}
        </div>
      </section>
      {/* <ProfileTab setTab={setTab} tab={tab} tabs={tabs} />
      <TabFavouriteMobile setTab={setTab} tab={tab} tabs={tabs} /> */}
      <div className="max-md:px-4 max-md:bg-neutral-0 p-4 max-md:pb-0 mt-2 max-md:pb-6 md:px-0 max-md:mb-2">
        {tab === NOT_USED_YET && <DiscountNotUsed data={discounts} />}
        {tab === VOUCHER_USED && <DiscountUsed />}
      </div>
      <div className="mt-16 max-md:hidden">
        <Image src={Banner} alt={''} />
      </div>
    </div>
  );
};

Discount.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Voucher của tôi" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default Discount;
