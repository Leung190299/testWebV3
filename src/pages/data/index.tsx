import CardDataPack from '@/components/card/card-data-pack';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { toggleModalDataSuggest } from '@/components/modal/modal-suggest-data';
import FeaturedPackData from '@/components/pages/pack-data/featured-pack';
import PackSearchBar from '@/components/pages/pack-data/filter';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Components
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import HeaderWebDefault from '@/components/header/header-web-default';
import Images from '@/components/imasge';
import { ERROR_NULL, useDataModal } from '@/components/pages/pack-data/hooks';
import { useLoading } from '@/hooks/useLoading';
import dataService from '@/services/dataService';
import { modal } from '@pit-ui/modules/modal';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

const tabs = [
  { id: 1, label: 'Gói tháng', icon: '/icons/bold/data-pack/month.svg' },
  { id: 2, label: 'Gói ngày', icon: '/icons/bold/data-pack/day.svg' },
  { id: 3, label: 'Gói mua thêm', icon: '/icons/bold/data-pack/add.svg' }
];
const pages = [{ name: 'Gói Cước', href: '#', current: true }];
const validTabs = [1, 2, 3];
const DataPackPage: NextPage = () => {
  const router = useRouter();
  const currentTab = router.query.tab ? Number(router.query.tab) : validTabs[0];
  const { openLoading, closeLoading } = useLoading();
  // const [filterPackData, setFilterPackData] = useState<{ key: string; name:string}[]>([]);
  const [dataNew, setDataNew] = useState<dataModel.Pack[]>([]);
  const [data, setData] = useState<dataModel.Pack[]>();
  const method = useForm<dataModel.ParamPack>({
    defaultValues: {
      dataPerDay: 0,
      page: 1,
      pageSize: 20,
      paramSearch: '',
      searchType: 0,
      typePrice: 0,
      type: 1
    }
  });

  const handleToggleModalSuggest = () => {
    toggleModalDataSuggest(({ data, minutes, price }) => {
      // Handle ehere
      router.push({
        pathname: Routers.DATA_SUGGESTION,
        query: { data: data.id, minutes: minutes.id, price: price.id }
      });
    });
  };

  const option = useWatch({ control: method.control });

  const getListPack = async (type?: number) => {
    try {
      openLoading();
      const res = await dataService.getListPack({
        ...option,
        type
      });
      if (res.code == 200) {
        setData(res.result);
      }
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError?.message || ERROR_NULL,
        rejectLable: 'Đóng',
        onDone: close
      });
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
    if (router.query.tab) {
      getListPack(Number(router.query.tab));
    } else {
      getListPack(1);
    }
  }, [option, currentTab]);

  useEffect(() => {
    getListPackNew();
  }, []);

  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();

  return (
    <>
      <Head>
        <title>Gói cước</title>
      </Head>

      <HeaderWebDefault title="Gói cước" withMenu withSearch />
      <div className="py-2">
        <Breadcrumbs breadcrumbs={pages} />
      </div>

      <section>
        <div className="relative h-48 md:h-64 xl:h-[21.25rem]" data-theme="dark">
          <Images
            src="/images/data/bgPC.png"
            source={[{ media: '(max-width:768px)', srcSet: 'images/data/bgTab.png' }]}
            className="absolute inset-0 h-full w-full object-cover object-right"
          />

          <div className="relative">
            <div className="container z-0 pt-16 md:pt-12 xl:pt-[4.75rem]">
              <h3 className="max-xl:hidden mb-2 font-itel text-h-md font-bold w-3/4">Gói may đột phá - bá chủ data</h3>
              <h3 className="xl:hidden mb-2 font-itel text-h-xxs md:text-h-sm font-bold w-3/4">
                Gói may đột phá
                <br />
                bá chủ data
              </h3>
              <p className="max-md:hidden text-base font-medium text-neutral-200">
                4GB/ ngày 77K/ tháng <br />
                Miễn phí gọi nội mạng iTel & Vinaphone
              </p>
              <button
                className="max-xl:hidden btn-primary btn btn-lg mt-7 whitespace-nowrap rounded-full"
                onClick={handleToggleModalSuggest}
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-6 text-center bg-neutral-0">
          <h1 className="font-itel uppercase text-h-sm md:text-h-xl text-neutral-800 font-bold">GÓI CƯỚC ITEL</h1>
        </div>
      <section className="bg-neutral-0 xl:py-20 py-8">

        <div className="container">
          <div className="relative w-full flex md:flex-row flex-col justify-between">
            <h3 className="md:font-itel xl:text-h3 text-2xl font-bold xl:uppercase text-neutral-800">
              Gói cước <span className="text-red-500">nổi bật</span>
            </h3>
            <div className="flex relative w-full md:w-[24rem] lg:w-[27.5rem] lg:-mt-8 md:-mt-20 max-h-[90px] mt-4 rounded-xl bg-neutral-500 py-3 pl-6">
              <div className="flex flex-col pr-[7.5rem]">
                <p className="text-base font-bold text-neutral-0">Tips! Đăng nhập ngay </p>
                <p className="text-sm font-normal text-neutral-0">để chọn gói cước phù hợp nhất với thuê bao nha!</p>
              </div>
              <img src="/images/data/iconTooltip.png" alt="tooltip" className="absolute -right-4 bottom-0 aspect-tivi w-[7.5rem]" />
            </div>
          </div>
        </div>
        <div className="xl:mt-6 mt-2 overflow-hidden">
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
        <div className="mt-3 md:mt-8 xl:mt-14 container">
          <div className="xl:h-[17.375rem] md:h-[14.3125rem] h-[10.375rem] relative overflow-hidden rounded-b-2xl">
            <Images
              src="/images/data/banner.png"
              source={[{ media: '(max-width:768px)', srcSet: 'images/data/bannerTab.png' }]}
              className="absolute inset-0 object-contain object-top"
            />

            <div className="relative bg-transparent" data-theme="dark">
              <div className="h-full pt-8 pl-5 md:pt-12 xl:pt-16 md:pl-10 xl:pl-[12.5rem]">
                <h3 className="font-itel text-h-xxs md:text-h-xs xl:text-h-sm font-bold whitespace-pre md:whitespace-normal">
                  {'GỢI Ý GÓI CƯỚC CHO \nRIÊNG BẠN'}
                </h3>
                <p className="max-md:hidden mt-2">
                  Lạc lối trong ưu đãi, băn khoăn không biết chọn gói cước nào? <br />
                  Chia sẻ mong muốn để iTel tư vấn gói cước dành riêng cho bạn nhé!
                </p>
                <div className="mt-4 md:mt-6 xl:mt-8">
                  <button onClick={handleToggleModalSuggest} className="btn-primary btn btn-sm xl:btn-lg whitespace-nowrap rounded-full">
                    Khám phá ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mobile-container mt-2 md:mt-0 pt-6 pb-3 md:pb-2 xl:pb-6 md:pt-16 xl:pt-20">
        <div className="container">
          <h2 className="md:text-center font-itel text-xl md:text-h3">
            <b>Danh sách Gói cước</b>
          </h2>
        </div>
      </section>
      <FormProvider {...method}>
        <section className="sticky md:static top-16 mobile-container z-10">
          <div className="container max-md:px-0">
            <div>
              <div className="tabs flex-nowrap gap-x-4 whitespace-nowrap text-base scrollbar-hide md:justify-center overflow-x-auto">
                {tabs.map((tab) => {
                  const isActive = tab.id === currentTab;
                  return (
                    <Link
                      key={tab.id}
                      href={{ pathname: Routers.DATA, query: { tab: tab.id } }}
                      shallow
                      onClick={() => method.setValue('type', tab.id)}
                      className={clsx(
                        'tab-bordered flex-nowrap gap-x-2 pt-1 md:p-4 tab tab-primary outline-none',
                        isActive && 'tab-active'
                      )}
                    >
                      <Svg
                        src={tab.icon}
                        className={clsx('max-md:hidden', isActive ? 'text-red-500' : 'text-base-content')}
                        width={32}
                        height={32}
                      />
                      {tab.label}
                    </Link>
                  );
                })}
              </div>
              <hr className="border-neutral-200 -mt-px" />
            </div>
            <div className="py-2 md:py-6 xl:py-10">
              <PackSearchBar />
            </div>
          </div>
        </section>
      </FormProvider>
      <section className="max-md:hidden xl:hidden pb-6">
        <div className="container max-md:px-0">
          <div className="gap-[8px] flex items-center md:px-0"></div>
        </div>
      </section>
      <section className="mobile-container">
        <div className="container max-md:px-0 pb-6 md:pb-16 xl:pb-[7.5rem]">
          <div className="grid h-max w-full xl:grid-cols-2 flex-wrap gap-x-6 md:gap-y-10">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={item.Id}>
                  <CardDataPack
                    pack={item}
                    index={index}
                    image={'/'}
                    onDetail={() => handleViewDetail(item)}
                    onRegister={() => handleModalPhoneCheck(item)}
                  />
                </div>
              ))
            ) : (
              <p className="font-bold">!!! Rất tiếc, Gói bạn đang tìm hiện không còn.</p>
            )}
          </div>
        </div>
      </section>
      <section className="relative md:h-[21.25rem] h-[12rem] w-full bg-[#e9f0fa]" data-theme="light">
        <span className="absolute inset-0  bg-opacity-20" />
        <div className="relative container flex h-full lg:items-center lg:justify-between lg:flex-row md:flex-col md:justify-center md:items-start">
          <div className="flex flex-col gap-2 justify-center md:justify-start">
            <p className="font-itel lg:text-h3 md:text-h4 text-h5 font-bold uppercase w-2/3 md:w-full">mua Sim số đẹp ngay tại itel</p>
            <p className="text-base font-bold hidden md:block">
              Khám phá thần số học, phong thủy, cung hoàng đạo{' '}
              <span className="font-normal text-neutral-500">
                chọn <br />
                cho mình số Sim của riêng bạn
              </span>
            </p>
          </div>
          <Link href={Routers.SIM} className="btn-primary btn btn-lg rounded-full mt-6 max-md:hidden">
            Khám phá ngay
          </Link>
        </div>
      </section>
    </>
  );
};

DataPackPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default DataPackPage;
