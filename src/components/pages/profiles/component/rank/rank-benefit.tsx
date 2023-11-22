import * as React from 'react';
import { ProfileTab } from '@/components/pages/profiles/component/tab/favourite-tab';
import { DIAMOND_MEMBER, GOLDEN_MEMBER, SLIVER_MEMBER, STANDARD_MEMBER } from '@/components/pages/profiles/constant/profile.constant';
import { useState } from 'react';
import Svg from '@/components/icon/svg';
import clsx from 'clsx';
import { TabRankMobile } from '@/components/pages/profiles/component/tab/tab-rank-mobile';

const tabs = [
  { id: STANDARD_MEMBER, label: 'Thân thiết', icon: '/images/iwow/standard-member.svg' },
  { id: SLIVER_MEMBER, label: 'Bạc', icon: '/images/iwow/silver.svg' },
  { id: GOLDEN_MEMBER, label: 'Vàng', icon: '/images/iwow/golden.svg' },
  { id: DIAMOND_MEMBER, label: 'Kim cương', icon: '/images/iwow/diamond.svg' }
];

const RenderContent = (id: string) => {
  const indexTab = tabs.find((item) => item.id == id);
  if (!indexTab) [];
  return [
    {
      title: 'Ưu đãi hấp dẫn',
      content: (
        <div className="text-xs text-neutral-400 leading-4">
          <p>Hội viên được sử dụng điểm để đổi các ưu đãi hấp dẫn dành riêng cho Hội viên {indexTab!.label}.</p>
          <p>Nhận nhiều ưu đãi hấp dẫn khác trên Website và ứng dụng My iTel.</p>
        </div>
      ),
      icon: '/icons/bold/tag-hot.svg'
    },
    {
      title: 'Trải nghiệm trọn vẹn',
      content: (
        <div className="text-xs text-neutral-400 leading-4">
          <p>Sử dụng toàn bộ các tính năng xem phim, chơi game trên Website & ứng dụng My iTel.</p>
          <p>Tham dự các chương trình tích điểm, nhận quà trên Website & ứng dụng My iTel.</p>
        </div>
      ),
      icon: '/icons/bold/star.svg'
    },
    {
      title: 'Dịch vụ tận tâm',
      content: 'Nhận đầy đủ các dịch vụ chăm sóc khách hàng của Mạng di động iTel.',
      icon: '/icons/bold/membership.svg'
    }
  ];
};

const MemberItem = ({ title, icon, content, isFinal = false }: any) => {
  return (
    <div className={clsx(`flex text-neutral-200 py-6 max-md:py-4 border-b ${isFinal ? 'max-lg:border-hidden' : 'border-b'}`)}>
      <div className={' text-neutral-800 flex justify-center items-center'}>
        <div className={'bg-neutral-200 w-12 h-12 text-center relative rounded-full'}>
          <Svg src={icon} className={'inline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} width={23} height={23} />
        </div>
      </div>
      <div className="ml-4">
        <div className={'text-neutral-800 font-medium'}>{title}</div>
        <div className={'mt-1 text-neutral-500 text-xs'}>{content}</div>
      </div>
    </div>
  );
};

export const RankBenefit = () => {
  const [tab, setTab] = useState(STANDARD_MEMBER);
  const indexTab = tabs.findIndex((item) => item.id == tab);
  return (
    <div className="flex h-full flex-col rounded-2xl bg-neutral-0 p-6 max-md:p-4 max-md:pb-2 pt-4 text-neutral-0 w-full">
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} removeMargin />
      <TabRankMobile setTab={setTab} tab={tab} tabs={tabs} removeMargin />
      <div className="mt-6 max-lg:mt-4">
        <p className="text-neutral-800 font-bold text-xl">Quyền lợi hạng {tabs[indexTab].label}</p>
        <div className="flex flex-col">
          {RenderContent(tab).map((memberItem, index) => {
            return (
              <MemberItem
                title={memberItem.title}
                content={memberItem.content}
                icon={memberItem.icon}
                key={memberItem.title}
                isFinal={index === 3}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
