import CoupleSimAdvertising from '@/components/banner/couple-sim-advertising';
import CardSimCouple from '@/components/card/card-sim-couple';
import SearchInput from '@/components/form/SearchInput';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import PrimaryTabs from '@/components/tabs/primary-tabs';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useState } from 'react';

import CardSimLottery from '@/components/card/card-sim-lottery';
import HeaderWebDefault from '@/components/header/header-web-default';
import PaginationSimple from '@/components/pagination/pagination-simple';
import TagSim from '@/components/tag-chip/tag-sim';
import TagVip from '@/components/tag-chip/tag-vip';
import Tooltip from '@/components/tooltip/tooltip';
import Routers from '@/routes/routers';
import { generateSimNumber } from '@/services/sim';
import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { formatNumber } from '@/utilities/number';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';

const tabs = [
  { id: 1, label: 'Ưu đãi Sim đôi' },
  { id: 2, label: 'Mua Sim tặng quà' }
];

const cardGift = [
  { id: 1, name: 'Oppo A16 4GB', price: 6_999_999, discountPrice: 0, image: '/images/gift-image-1.png', restProduct: '5' },
  { id: 2, name: 'Oppo A16 4GB', price: 6_999_999, discountPrice: 0, image: '/images/gift-image-2.png', restProduct: '5' },
  { id: 3, name: 'Oppo A16 4GB', price: 6_999_999, discountPrice: 0, image: '/images/gift-image-3.png', restProduct: '5' },
  { id: 4, name: 'Oppo A16 4GB', price: 6_999_999, discountPrice: 0, image: '/images/gift-image-4.png', restProduct: '5' }
];
type SimCoupleData = {
  id: number;
  image: string;
  sims: Array<Model.Sim & { pack: Model.PackOfData }>;
  gift?: Model.Gift | null;
};
type PageProps = {
  data: Array<SimCoupleData>;
};
const SimCouple: NextPage<PageProps> = ({ router, data }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);

  const pack: Model.PackOfData = { data: 5_000_000, data_type: 'day', id: 1, name: 'ITEL149', price: 99_999, price_type: 'month' };
  const tags = ['Tam hoa', 'Tài lộc', 'Lộc phát'];
  function handleRandomSim() {
    setSelected(Math.floor(Math.random() * data.length));
  }
  const sim = data[selected].sims[0];

  return (
    <>
      <HeaderWebDefault title="Sim số" withMenu withSearch />
      <Tab.Group as={Fragment} selectedIndex={tabIndex} onChange={setTabIndex}>
        <Head>
          <title>Itel - Ưu đãi sim đôi</title>
        </Head>
        <section className="max-md:hidden xl:bg-neutral-0">
          <div className="container">
            <div className="breadcrumbs text-sm text-neutral-500">
              <ul aria-label="Breadcrumb">
                <li>
                  <Link href={Routers.HOME}>Trang chủ</Link>
                </li>
                <li>
                  <Link href={Routers.SIM}>Chọn số mua sim</Link>
                </li>
                <li className="text-neutral-800">
                  <Link href={router.asPath}>Sim ưu đãi</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="sticky top-16 flex md:hidden items-center justify-center gap-5 bg-neutral-0 z-20">
          <div className="border-b border-neutral-200 w-full container">
            <Tab.List className="tabs -mb-px flex-nowrap overflow-auto whitespace-nowrap scrollbar-hide">
              {tabs.map((tab) => (
                <Tab
                  type="button"
                  key={tab.id}
                  className={({ selected }) =>
                    clsx('tab-bordered outline-none w-1/2 border-red-500 border-opacity-0 p-4 text-base tab', selected && 'tab-active')
                  }
                >
                  {tab.label}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </section>
        <section className="mt-2 md:mt-0">
          <CoupleSimAdvertising
            autoplay
            data={[
              {
                id: 1,
                img: '/images/gift-sim-banner-1.png',
                title: 'Ưu đãi Sim đôi\nmua hai giá một',
                actionTitle: 'Ưu đãi lên đến 50% khi mua Sim theo cặp tại iTel'
              },
              {
                id: 2,
                img: '/images/gift-sim-banner-2.png',
                title: 'QUÀ LIỀN TAY\nMUA SIM LÀ CÓ',
                actionTitle: 'Mua một Sim, nhận một quà, may mắn trên iTel, vào nhanh mà nhận!'
              },
              {
                id: 3,
                img: '/images/gift-sim-banner-2.png',
                title: 'QUÀ LIỀN TAY\nMUA SIM LÀ CÓ',
                actionTitle: 'Mua một Sim, nhận một quà, may mắn trên iTel, vào nhanh mà nhận!'
              }
            ]}
          />
        </section>
        <section className="max-md:hidden flex items-center justify-center gap-5 bg-neutral-0 ">
          {tabs.map((tab, index) => (
            <PrimaryTabs key={tab.id} label={tab.label} onClick={() => setTabIndex(index)} isActive={tabIndex === index} />
          ))}
        </section>
        <Tab.Panels as="section" className="bg-neutral-0 md:bg-transparent">
          <Tab.Panel as="div" className="container pt-2 pb-6 md:py-16 xl:py-28">
            <div className="max-md:hidden text-center">
              <div className="mb-1 font-itel font-bold text-neutral-700 md:text-h2 xl:text-h1">Ưu đãi Sim đôi</div>
              <div className="text-base font-normal text-neutral-700">Sim theo đôi, ưu đãi gấp bội</div>
            </div>
            <div className="max-md:hidden container">
              <div className="relative mt-10 md:w-full xl:w-3/5 mx-auto">
                <SearchInput isBackgroundWhite size="small" />
              </div>
            </div>
            <div className="md:mt-10 grid xl:grid-cols-2 md:gap-6 grid-cols-1 -mx-4 md:mx-auto">
              {data.map((item, index) => (
                <CardSimCouple key={item.id} sims={item.sims} image={item.image} pack={item.sims[0]?.pack || {}} />
              ))}
            </div>
            <div className="w-full">
              <div className="max-md:hidden mt-3 md:mt-8 xl:mt-10">
                <PaginationSimple totalPage={100} adjacent={4} />
              </div>
              <div className="md:hidden mt-3 md:mt-8 xl:mt-10">
                <PaginationSimple totalPage={100} adjacent={[3, 1]} />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel as="div" className="container py-6 md:py-20">
            <div className="max-md:hidden text-center">
              <div className="mb-1 font-itel font-bold text-neutral-700 md:text-h2 xl:text-h1">Mua Sim tặng quà</div>
              <div className="text-base font-normal text-neutral-700">Quà tặng liền tay, mua Sim là có!</div>
            </div>
            <div className="md:bg-neutral-0 relative md:mt-8 xl:mt-14 w-full rounded-2xl md:px-6 md:py-10 xl:px-10">
              <div className="bg-dark-blue md:bg-transparent text-neutral-0 md:text-base-content p-4 md:p-0 rounded-2xl relative">
                <div className="absolute -top-3 -right-2 md:-top-10 xl:top-0 xl:-right-10 z-10">
                  <div className="w-[8.5rem] md:w-[12.5rem] xl:w-[17.5rem]">
                    <div className="block-img block-tivi">
                      <img src="/images/money.png" alt="chat-icon" className="object-cover scale-110 object-bottom" />
                    </div>
                  </div>
                </div>
                <p className="relative hidden md:block">
                  <b>Tadaa! Số may mắn dành riêng cho bạn là:</b>
                </p>
                <p className="md:hidden relative text-sm font-medium">Số may mắn dành cho bạn!</p>
                <div className="mt-2 md:mt-6">
                  <CardSimLottery.Content className="bg-dark-blue gap-3 md:gap-6 xl:gap-10 xl:pr-[17rem] text-neutral-0 flex flex-wrap md:flex-nowrap relative md:px-8 md:p-6 rounded-2xl xl:mt-6 md:z-10 xl:z-0">
                    {/* Base info */}
                    <div className="w-full md:w-auto">
                      <p className="flex items-center gap-1 text-h-xs xl:text-h-md">
                        <b className="font-itel">{formatPhoneNumber(sim.phone)}</b>
                        {sim.is_vip ? <TagVip className="h-8 w-8 xl:w-10 xl:h-10" /> : <TagSim className="h-8 w-8 xl:w-10 xl:h-10" />}
                      </p>
                      <ul className="flex mt-1 xl:mt-2 space-x-1">
                        {tags.map((label) => (
                          <li key={label} className="tag tag-primary md:bg-base-100/[0.15] md:border-transparent md:text-neutral-0">
                            {label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Pack of data infomation */}
                    <div className="flex items-center md:block md:flex-1 w-full md:w-auto">
                      <div className="flex items-center gap-1 md:mb-1">
                        <p className="text-base xl:text-xl">
                          <b>{pack.name}</b>
                        </p>
                        <Tooltip
                          content={<b>Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.</b>}
                        >
                          <Svg src="/icons/line/information.svg" className="h-5 w-5 mr-1" />
                        </Tooltip>
                      </div>
                      <div className="text-sm">
                        <b>{formatNumber(pack.data, ['B', 'KB', 'GB'])}</b>
                        /ngày | <b>{formatNumber(pack.price)}</b>/tháng
                      </div>
                    </div>
                    <CardSimLottery.RightContent>
                      <CardSimLottery.Price price={sim.price} discountPrice={sim.discount_price} discountPercentage />
                      {/* Action */}
                      <div className="md:hidden xl:flex gap-4">
                        <button className="max-xl:hidden btn btn-secondary rounded-full btn-lg" onClick={handleRandomSim}>
                          <Svg src="/icons/bold/refresh.svg" className="mr-2 inline h-5 w-5" />
                          Chọn lại
                        </button>
                        <button className="md:hidden btn btn-primary btn-sm rounded-full" onClick={handleRandomSim} data-theme="dark">
                          <Svg src="/icons/bold/refresh.svg" className="mr-2 inline h-5 w-5" />
                          Chọn lại
                        </button>
                      </div>
                    </CardSimLottery.RightContent>
                  </CardSimLottery.Content>
                </div>
                <div className="max-md:hidden xl:hidden mt-4 text-center">
                  <button className="btn btn-secondary btn-sm rounded-full" onClick={handleRandomSim}>
                    <Svg src="/icons/bold/refresh.svg" className="mr-2 h-5 w-5" />
                    Chọn lại
                  </button>
                </div>
              </div>

              <div className="my-6 text-xl font-bold text-neutral-wf-900">Chọn quà tặng</div>
              <div className="flex w-full select-none overflow-auto scrollbar-hide -mx-2">
                {cardGift.map((item, index) => (
                  <div key={`gift-${index}`} className="xl:w-1/4 flex-shrink-0">
                    <div className="px-2 xl:px-3 w-36 md:w-[11.75rem] xl:w-auto box-content">
                      <label className="relative block cursor-pointer">
                        <div className="card bg-neutral-50 shadow-xl">
                          <figure className="block-img block-square overflow-hidden">
                            <img src={item.image} alt="promotion image" className="object-cover" />
                          </figure>
                          <div className="card-body px-3 py-2 md:p-4 gap-1.5 md:gap-1">
                            <h5 className="card-title text-sm font-bold md:text-base xl:text-xl">{item.name}</h5>
                            <p className="text-sm md:text-base">
                              <b>{toCurrency(item.discountPrice ?? item.price)}</b>
                              {typeof item.discountPrice === 'number' && (
                                <span className="inline-block text-xs text-neutral-500 md:text-sm ml-1 md:ml-2">
                                  <s>{toCurrency(item.price)}</s>
                                </span>
                              )}
                            </p>
                            <p className="text-xs md:text-sm text-neutral-500">Chỉ còn 5 sản phẩm</p>
                          </div>
                        </div>
                        <input type="radio" className="peer !absolute right-4 top-4 !bg-neutral-0" name="gift" />
                        <span className="pointer-events-none peer-checked:border-red-500 border-transparent absolute inset-0 border rounded-2xl"></span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center -mx-2">
                <div className="px-2 w-1/2 md:w-[13rem]">
                  <button className="btn-secondary btn w-full btn-md md:btn-lg rounded-full">Thêm vào giỏ</button>
                </div>
                <div className="px-2 w-1/2 md:w-[13rem]">
                  <button className="btn-primary btn w-full btn-md md:btn-lg rounded-full">Mua ngay</button>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
        <SectionSupports />
      </Tab.Group>
    </>
  );
};

SimCouple.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation(() => {
  const images = [
    '/images/sim-couple-image-1.png',
    '/images/sim-destiny-2.png',
    '/images/sim-numerology-1.png',
    '/images/sim-couple-image-1.png',
    '/images/sim-destiny-2.png',
    '/images/sim-numerology-1.png',
    '/images/sim-couple-image-1.png',
    '/images/sim-destiny-2.png',
    '/images/sim-numerology-1.png',
    '/images/sim-couple-image-1.png'
  ];
  const data = generateSimNumber({ limit: 20 });
  const d: Array<SimCoupleData> = [];
  let item: SimCoupleData = {
    id: '',
    sims: [],
    gift: null
  } as any;
  d.push(item);
  data.forEach((sim) => {
    if (item.sims.length >= 2) {
      item = { sims: [], gift: null } as any;
      d.push(item);
    }
    item.sims.push(sim);
    sim.gift && (item.gift = sim.gift ?? null);
    item.image = images[Math.floor(Math.random() * images.length)];
    item.id = sim.id;
  });

  return {
    props: {
      data: d
    }
  };
});
export { getStaticProps };

export default SimCouple;
