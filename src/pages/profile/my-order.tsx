import LayoutProfile from '@/components/layout/layout-profile';
import OrderDelivered from '@/components/pages/profiles/component/order-delivered';
import OrderPaid from '@/components/pages/profiles/component/order-paid';
import OrderPending from '@/components/pages/profiles/component/order-pending';
import OrderShipping from '@/components/pages/profiles/component/order-shipping';
import { ProfileTab } from '@/components/pages/profiles/component/tab/favourite-tab';
import { TabFitContent } from '@/components/pages/profiles/component/tab/tab-fit-content-profile';
import {
  NOTIFICATION_CANCEL,
  NOTIFICATION_DELIVERED,
  NOTIFICATION_PAID,
  NOTIFICATION_PENDING,
  NOTIFICATION_SHIPPING
} from '@/components/pages/profiles/constant/profile.constant';
import OrderCancel from '@/components/pages/profiles/component/order-cancel';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const tabs = [
  { id: NOTIFICATION_PENDING, label: 'Chờ thanh toán', icon: '/icons/bold/order-pending.svg' },
  { id: NOTIFICATION_PAID, label: 'Đã thanh toán', icon: '/icons/bold/order-paid.svg' },
  { id: NOTIFICATION_SHIPPING, label: 'Đang vận chuyển', icon: '/icons/bold/order-shipping.svg' },
  { id: NOTIFICATION_DELIVERED, label: 'Đã giao', icon: '/icons/bold/order-delivered.svg' },
  { id: NOTIFICATION_CANCEL, label: 'Đã hủy', icon: '/icons/bold/order-cancel.svg' }
];
const MyOrder: NextPage = () => {
  const [tab, setTab] = useState(NOTIFICATION_PENDING);

  return (
    <>
      <Head>
        <title>Itel - Thông tin tài khoản</title>
      </Head>
      <section className="hidden md:flex bg-neutral-100 mb-[1rem]">
        <h2 className="font-itel text-h3 font-bold">Đơn hàng của tôi</h2>
      </section>
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} />
      <TabFitContent setTab={setTab} tab={tab} tabs={tabs} removeMargin customClass="!-mt-2 bg-neutral-0" />
      {tab === NOTIFICATION_PENDING && <OrderPending />}
      {tab === NOTIFICATION_PAID && <OrderPaid />}
      {tab === NOTIFICATION_SHIPPING && <OrderShipping />}
      {tab === NOTIFICATION_DELIVERED && <OrderDelivered />}
      {tab === NOTIFICATION_CANCEL && <OrderCancel />}
    </>
  );
};
MyOrder.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Đơn hàng của tôi" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default MyOrder;
