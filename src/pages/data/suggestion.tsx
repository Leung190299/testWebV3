import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { useTranslation } from '@/libs/i18n';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import LayoutDefault from '@/components/layout/layout-default';

import CardDataPack from '@/components/card/card-data-pack';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderAppDefault from '@/components/header/header-app-default';
import Svg from '@/components/icon/svg';
import {
  Option,
  dataUsedOption,
  minutesAmountOption,
  priceUsedOption,
  toggleModalDataSuggest
} from '@/components/modal/modal-suggest-data';
import FeaturedPackData from '@/components/pages/pack-data/featured-pack';
import { useDataModal } from '@/components/pages/pack-data/hooks';
import useIsSticky from '@/hooks/useIsSticky';
import { useLoading } from '@/hooks/useLoading';
import Routers from '@/routes/routers';
import dataService from '@/services/dataService';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PageProps = {};

const DataSuggestion: NextPage<PageProps> = () => {
  const { t } = useTranslation('common');
  const { query, asPath } = useRouter();
  const _data = query.data as string;
  const _minutes = query.minutes as string;
  const _price = query.price as string;

  const ref = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(ref, { rootMargin: '-65px 200px 0px 200px' });
  const [dataUsed, setDataUsed] = useState<Option>(dataUsedOption[4]);
  const [minutesCall, setMinutesCall] = useState<Option>(minutesAmountOption[2]);
  const [price, setPrice] = useState<Option>(priceUsedOption[3]);
  const [dataNew, setDataNew] = useState<dataModel.Pack[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isReached = useIsSticky(buttonRef, { rootMargin: '-65px 200px 0px 200px' });
  const [packs, setPacks] = useState<dataModel.Pack[]>([]);
  const { openLoading, closeLoading } = useLoading();

  const data = [
    {
      id: 1,
      title: 'Số Data sử dụng/ tháng',
      options: dataUsedOption,
      value: dataUsed,
      onChange: setDataUsed,
      placeholder: 'Chọn mức data'
    },
    {
      id: 2,
      title: 'Số phút gọi/ tháng',
      options: minutesAmountOption,
      value: minutesCall,
      onChange: setMinutesCall,
      placeholder: 'Chọn số phút'
    },
    {
      id: 3,
      title: 'Số tiền/ tháng',
      options: priceUsedOption,
      value: price,
      onChange: setPrice,
      placeholder: 'Chọn mức tiền'
    }
  ];

  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();

  const handleToggleModalSuggest = () => {
    toggleModalDataSuggest(({ data, minutes, price }) => {
      setDataUsed(data);
      setMinutesCall(minutes);
      setPrice(price);
    });
  };
  let total = 0;
  dataUsed && (total += 1);
  price && (total += 1);
  minutesCall && (total += 1);

  const getParam = (dataUsed: Option, minutesCall: Option, price: Option): dataModel.paramSuggestion => ({
    dataFrom: typeof dataUsed.values != 'number' ? dataUsed.values![0] : 0,
    dataTo: typeof dataUsed.values != 'number' ? dataUsed.values![1] : Infinity,
    minuteFrom: typeof minutesCall.values == 'number' ? minutesCall.values : 0,
    priceFrom: typeof price.values != 'number' ? price.values![0] : 0,
    priceTo: typeof price.values != 'number' ? price.values![1] : Infinity
  });

  const getListPack = async (param: dataModel.paramSuggestion) => {
    try {
      openLoading();

      const res = await dataService.suggestion(param);
      if (res.code === 200) {
        setPacks(res.result!);
      }
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  const getListPackNew = async () => {
    try {
      const res = await dataService.getListPackNew();
      if (res.code == 200) {
        setDataNew(res.result!);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (_data && _minutes && _price) {
      const data = dataUsedOption.find((item) => item.id == Number(_data)) || dataUsedOption[4];
      const minute = minutesAmountOption.find((item) => item.id == Number(_minutes)) || minutesAmountOption[2];
      const price = priceUsedOption.find((item) => item.id == Number(_price)) || priceUsedOption[3];

      setDataUsed(data);
      setMinutesCall(minute);
      setPrice(price);
      getListPack(getParam(data, minute, price));
    }
  }, [_data, _minutes, _price]);
  useEffect(() => {
    getListPackNew();
  }, []);
  return (
    <>
      <Head>
        <title>{`Itel - Gợi ý gói cước`}</title>
      </Head>
      <HeaderAppDefault title="Gói cước cho riêng bạn" type="fixed" theme="light" />
      <section className="max-md:hidden" id="change">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}> Trang chủ </Link>
              </li>
              <li>
                <Link href={Routers.DATA}>Gói cước</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={asPath}>Gợi ý gói cước</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="z-10 block-img xl:h-[21.25rem] md:h-[36rem] h-[31.25rem] relative" data-theme="dark">
        <img
          src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685194687/itel/images/bg-sim_1_r1xj1z.png"
          alt="bg"
          className="object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-radial from-20% from-neutral-900 to-neutral-900/0" />
        <div className="relative container">
          <div className="pt-20 md:pt-[5.625rem] xl:pt-[3.25rem]">
            <h1 className="font-itel text-center text-h-xs md:text-h-sm xl:text-h-md">
              <b>Gợi ý gói cước phù hợp</b>
            </h1>
            <div className="flex flex-wrap md:-mx-2 bg-transparent gap-y-4 mt-6 md:mt-8 xl:mt-6" data-theme="light">
              {data.map((data) => (
                <div className="w-full xl:w-1/3 xl:px-2" key={data.id}>
                  <Listbox value={data.value} onChange={data.onChange}>
                    <div className="relative">
                      <Listbox.Button className="rounded-xl py-3 px-4 bg-neutral-0 flex items-center w-full overflow-hidden">
                        {({ open }) => (
                          <>
                            <div className="flex-1 text-left overflow-hidden">
                              <p className="text-sm font-medium text-subtle-content">{data.title}</p>
                              {data.value ? (
                                <p className="truncate mt-1">
                                  <b>{data.value.name}</b> <span className="text-sm">{data.value.desc}</span>
                                </p>
                              ) : (
                                <p className="truncate mt-1 font-bold text-subtle-content">{data.placeholder}</p>
                              )}
                            </div>
                            <div>
                              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
                            </div>
                          </>
                        )}
                      </Listbox.Button>
                      <Listbox.Options as="div" className="absolute mt-2 outline-none z-20 font-medium">
                        <ul className="menu p-2 bg-neutral-0 rounded-xl shadow-itel">
                          {data.options.map((option) => (
                            <Listbox.Option key={option.id} value={option}>
                              <p className="text-left">
                                {option.name} {option.desc}
                              </p>
                            </Listbox.Option>
                          ))}
                        </ul>
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-8 xl:mt-10 text-center">
              <button
                ref={buttonRef}
                className="btn btn-primary btn-sm md:btn-lg w-[13.25rem] rounded-full"
                data-theme="light"
                onClick={() => getListPack(getParam(dataUsed, minutesCall, price))}
              >
                Tra cứu gói cước
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 md:bg-neutral-100 py-2 md:py-20">
        <div className="md:container">
          {isReached && (
            <div className="z-10 max-md:hidden xl:hidden fixed top-32 container left-0">
              <div className="bg-neutral-0 rounded-2xl px-6 py-4">
                <div className="flex items-center">
                  <div className="flex font-bold gap-x-3">
                    {data
                      .map(({ value, onChange, title }, index) => (
                        <div key={index}>{value ? <span>{value.short_name}</span> : <span className="text-neutral-500">{title}</span>}</div>
                      ))
                      .reduce(
                        (prev, cur, index) =>
                          [
                            prev,
                            <span className="text-neutral-400" key={'___' + index}>
                              |
                            </span>,
                            cur
                          ] as any
                      )}
                  </div>
                  <div className="flex flex-1">
                    <a href="#change" className="ml-auto btn btn-secondary btn-sm rounded-full">
                      Đổi tra cứu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="md:uppercase font-bold mt-4 md:mt-0 text-[16px] md:text-[40px] text-neutral-800 md:font-itel px-4 md:px-0">
            Danh sách Gói cước phù hợp
          </div>

          <div
            ref={ref}
            className={clsx(
              isSticky ? 'border-neutral-200 bg-neutral-0 z-40' : 'border-transparent',
              'border-b pb-3 md:pb-0 md:bg-transparent sticky top-16 md:static mt-3 md:mt-6 xl:mt-10 gap-2 flex items-center px-4 md:px-0'
            )}
          >
            <button
              onClick={handleToggleModalSuggest}
              className={clsx(
                'md:hidden relative btn-tertiary btn btn-sm border-none font-medium btn-square w-10 h-10 flex-shrink-0 bg-neutral-100',
                total && 'btn-active'
              )}
            >
              <Svg src="/icons/bold/filter.svg" width={20} height={20} />
              {total ? (
                <span className="badge z-50 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                  <span>{total}</span>
                </span>
              ) : null}
            </button>
            <div className="flex overflow-auto scrollbar-hide gap-2">
              {/* {data.map(({ value, onChange }, index) =>
                value ? (
                  <div key={index} className="chip-outline chip gap-x-1 border-neutral-300 h-9 md:h-10 px-3 md:px-4 whitespace-nowrap">
                    {value.short_name}
                    <button type="button" onClick={() => {}}>
                      <Svg src="/icons/line/close.svg" className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                ) : null
              )} */}
            </div>
          </div>
          <div className="grid h-max w-full lg:grid-cols-2 md:grid-cols-1 flex-wrap gap-x-6 md:gap-y-10 md:mt-6 xl:mt-8 max-md:grid-cols-1 bg-neutral-0 md:bg-transparent px-4 md:px-0">
            {packs.map((item, index) => (
              <div key={item.Id}>
                <CardDataPack
                  image={'/'}
                  pack={item}
                  onDetail={() => handleViewDetail(item)}
                  onRegister={() => handleModalPhoneCheck(item)}
                  index={index}
                />
              </div>
            ))}
            {packs.length <= 0 && <p className="font-bold">!!! Rất tiếc, gói bạn đang tìm hiện không có!</p>}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-10 py-8 md:py-[80px] bg-neutral-0">
        <p className="md:font-itel text-h5 md:text-h3 font-bold md:uppercase text-neutral-800 container">
          Gói cước <span className="text-red-500">nổi bật</span>
        </p>
        <div className="-mt-6 md:mt-2 overflow-hidden bg-neutral-0">
          <div className="container">
          {dataNew.length > 0 && (
              <FeaturedPackData
                data={dataNew}
                loop={6}
                onRegister={(item) => handleModalPhoneCheck(item)}
                onClickDetail={(item) => handleViewDetail(item)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

DataSuggestion.getLayout = (page) => (
  <>
    <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
    <ChatBoxLazy />
  </>
);
const getStaticProps = getServerPropsWithTranslation();

export default DataSuggestion;
export { getStaticProps };
