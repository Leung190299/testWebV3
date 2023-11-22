import LayoutProfile from '@/components/layout/layout-profile';
import NotificationAll from '@/components/pages/profiles/component/notification-all';
import NotificationOrder from '@/components/pages/profiles/component/notification-order';
import NotificationPromote from '@/components/pages/profiles/component/notification-promote';
import NotificationSystem from '@/components/pages/profiles/component/notification-system';
import { ProfileTab } from '@/components/pages/profiles/component/tab/favourite-tab';
import { TabFitContent } from '@/components/pages/profiles/component/tab/tab-fit-content-profile';
import {
  NOTIFICATION_ALL,
  NOTIFICATION_ANOTHER,
  NOTIFICATION_ORDER,
  NOTIFICATION_PROMOTE,
  NOTIFICATION_SYSTEM
} from '@/components/pages/profiles/constant/profile.constant';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const tabs = [
  { id: NOTIFICATION_ALL, label: 'Tất cả', icon: '/icons/bold/notification.svg' },
  { id: NOTIFICATION_SYSTEM, label: 'Hệ thống', icon: '/icons/bold/sim.svg' },
  { id: NOTIFICATION_ORDER, label: 'Đơn hàng', icon: '/icons/bold/cart-bold.svg' },
  { id: NOTIFICATION_PROMOTE, label: 'Ưu đãi & Khuyến mãi', icon: '/icons/bold/voucher.svg' },
  { id: NOTIFICATION_ANOTHER, label: 'Khác', icon: '/icons/bold/about-spam.svg' }
];
const Notification: NextPage = () => {
  const [tab, setTab] = useState(NOTIFICATION_ALL);

  return (
    <div className="relative">
      <Head>
        <title>Itel - Thông Báo</title>
      </Head>
      <section className="hidden md:flex bg-neutral-100 mb-[1rem]">
        <h2 className="font-itel text-h3 font-bold">Thông Báo</h2>
      </section>
      <TabFitContent setTab={setTab} tab={tab} tabs={tabs} removeMargin customClass="!-mt-2 bg-neutral-0" />
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} />
      {tab === NOTIFICATION_ALL && <NotificationAll />}
      {tab === NOTIFICATION_SYSTEM && <NotificationSystem />}
      {tab === NOTIFICATION_ORDER && <NotificationOrder />}
      {tab === NOTIFICATION_PROMOTE && <NotificationPromote />}
    </div>
  );
};
Notification.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Thông báo" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default Notification;
