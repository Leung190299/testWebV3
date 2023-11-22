import { ProfileTab } from '../tab/favourite-tab';
import React, { useState } from 'react';
import { POINTS_RECEIVED, POINTS_USED } from '@/components/pages/profiles/constant/profile.constant';
import phone1 from '@/components/pages/assets/phone-1.png';
import Image from 'next/image';
import clsx from 'clsx';
import { TabFitContent } from '@/components/pages/profiles/component/tab/tab-fit-content-profile';

const tabs = [
  { id: POINTS_RECEIVED, label: 'Điểm đã nhận', icon: '' },
  { id: POINTS_USED, label: 'Điểm đã dùng', icon: '' }
];

const pointList = (date: string) => {
  const initArray = Array.from(Array(10).keys());
  return initArray.map((item) => {
    return {
      title: 'Bạn nhận được 26 điểm từ iMall',
      content: 'Bạn đã được tích điểm khi mua sản phẩm',
      productName: 'OPPO Reno8 T 5G',
      img: phone1,
      date,
      point: '26'
    };
  });
};

const HistoryItems = ({ isUsed = false }) => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const days = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateString = `${hour}:${minutes} ${days}/${month}/${year}`;

  return (
    <div className='mb-8 max-md:mb-8'>
      {pointList(dateString).map((pointItem) => {
        return (
          <div
            key={pointItem.title}
            className="flex h-full items-center rounded-2xl bg-neutral-0 p-6 max-md:p-4 px-8 max-lg:p-4 max-lg:px-6  max-lg:mt-4 text-neutral-0 w-full mt-3"
          >
            <div className="w-20 h-20">
              <Image src={pointItem?.img} className="" alt="123" />
            </div>
            <div className="ml-6 flex flex-col grow">
              <p className="text-neutral-800 font-bold max-md:text-sm max-md:mb-1">{pointItem.title}</p>
              <div className="text-neutral-500 text-sm max-md:text-neutral-700">
                {pointItem.content}&nbsp;
                <span className="text-neutral-700 font-bold max-md:font-normal max-md:text-sm">{pointItem.productName}</span>
              </div>
              <div className="mt-2 max-md:flex max-md:items-center">
                <span className={'text-neutral-500 text-xs max-md:grow'}>{pointItem.date}</span>{' '}
                <span className={clsx('font-bold md:hidden max-md:text-sm', isUsed ? 'text-red-500' : 'text-green-600')}>
                  {isUsed ? '-' : '+'}
                  {pointItem.point} điểm
                </span>
              </div>
            </div>
            <div className="max-md:hidden">
              <span className={clsx('font-bold', isUsed ? 'text-red-500' : 'text-green-600')}>
                {isUsed ? '-' : '+'}
                {pointItem.point} điểm
              </span>
            </div>
          </div>
        );
      })}
      <div className="w-full text-center mt-6 max-md:mt-4">
        <button className="btn-secondary btn py-3 px-10	max-md:px-4 max-md:pt-2.5 rounded-full" onClick={() => {}}>
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export const RankPointHistory = () => {
  const [tab, setTab] = useState(POINTS_RECEIVED);
  return (
    <div className="max-md:px-4">
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} removeMargin />
      <TabFitContent setTab={setTab} tab={tab} tabs={tabs} customClass={' !pl-0 '} />
      <HistoryItems isUsed={tab === POINTS_USED} />
    </div>
  );
};
