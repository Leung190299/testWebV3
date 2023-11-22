import LayoutProfile from '@/components/layout/layout-profile';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { FILM_TYPE, GAME_TYPE, PRODUCT_TYPE, VOUCHER_TYPE } from '@/components/pages/profiles/constant/profile.constant';
import { ProfileTab } from '@/components/pages/profiles/component/tab/favourite-tab';
import { HistoryProductGrid } from '@/components/pages/profiles/component/history-product-grid';
import { HistoryFilmGrid } from '@/components/pages/profiles/component/history-film-grid';
import { HistoryGameGrid } from '@/components/pages/profiles/component/history-game-grid';
import HistoryVoucherGrid from '@/components/pages/profiles/component/history-voucher-grid';
import { TabFitContent } from '@/components/pages/profiles/component/tab/tab-fit-content-profile';

const tabs = [
  { id: PRODUCT_TYPE, label: 'Sản phẩm đã xem', icon: '/icons/bold/shopping.svg' },
  { id: VOUCHER_TYPE, label: 'Voucher đã xem', icon: '/icons/bold/voucher.svg' },
  { id: FILM_TYPE, label: 'Phim đã xem', icon: '/icons/bold/movie.svg' },
  { id: GAME_TYPE, label: 'Game đã chơi', icon: '/icons/bold/itel-game.svg' }
];

const History: NextPage = () => {
  const [tab, setTab] = useState(PRODUCT_TYPE);

  return (
    <div className="max-md:-mt-6">
      <Head>
        <title>Itel - profile</title>
      </Head>
      <section className="hidden md:flex bg-neutral-100 mb-[1rem]">
        <h2 className="font-itel text-h3 font-bold">Lịch sử hoạt động</h2>
      </section>
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} />
      <TabFitContent setTab={setTab} tab={tab} tabs={tabs} />
      <div className="max-md:px-4 max-md:bg-neutral-0 p-4 max-md:pb-4 mt-2 md:px-0 max-md:mb-2">
        {tab === PRODUCT_TYPE && <HistoryProductGrid />}
        {tab === VOUCHER_TYPE && <HistoryVoucherGrid />}
        {tab === FILM_TYPE && <HistoryFilmGrid />}
        {tab === GAME_TYPE && <HistoryGameGrid />}
      </div>
    </div>
  );
};

History.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Lịch sử hoạt động" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default History;
