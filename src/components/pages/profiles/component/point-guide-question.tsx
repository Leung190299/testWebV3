import clsx from 'clsx';
import Link from 'next/link';
import Svg from '@/components/icon/svg';
import React from 'react';
const QUESTIONS = [
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '/question-section/sim_1.svg',
    url: ''
  },
  {
    title: 'Mua sắm - Thanh toán',
    description: 'Hướng dẫn chọn sim phong thủy, sim thần số học',
    icon: '/question-section/shopping.svg',
    url: ''
  },
  {
    title: 'Giải trí',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '/question-section/entertainment.svg',
    url: ''
  },
  {
    title: 'Ưu đãi - Voucher',
    description: 'Cách chọn gói cước phù hợp với bản thân',
    icon: '/question-section/gift.svg',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '/question-section/sim_1.svg',
    url: ''
  },
  {
    title: 'Chọn số - Mua sim',
    description: 'Hướng dẫn cách chọn sim số đẹp trên iTel',
    icon: '/question-section/sim.svg',
    url: ''
  }
];

export const PointGuideQuestion = () => {
  return (
    <div className={clsx('bg-neutral-100 w-full')}>
      <div className="container py-20 max-lg:px-10 max-md:px-4 max-md:py-6">
        <h3 className="text-left text-h3 font-itel font-bold max-md:text-xl">HƯỚNG DẪN KHÁC DÀNH CHO BẠN</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-10">
          {QUESTIONS.map((item, index) => (
            <Link href={item.url} key={index} className="flex rounded-xl bg-neutral-0 overflow-hidden col-span-1">
              <div className="min-w-[112px] w-[112px] h-[112px] md:min-w-[136px] md:w-[136px] md:h-[136px]">
                <Svg className="w-full h-full" src={item.icon} />
              </div>
              <div className="flex flex-col py-6 px-3 md:px-6 h-full justify-center">
                <p className="text-neutral-500 text-sm md:text-base">{item.title}</p>
                <p className="mt-1 text-sm md:text-xl font-bold">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
