import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';

import ButtonLoading from '@/components/button/button-loading';
import CardService from '@/components/card/card-service';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import DatePicker, { InputDate } from '@/components/common/date-picker';
import FooterDefault from '@/components/footer/default';
import Svg from '@/components/icon/svg';
import InputComboboxLabelIn from '@/components/input/input-combobox';
import InputLabelIn from '@/components/input/input-label-in';
import { toggleModalDatePicker } from '@/components/modal/selection/modal-date-picker';
import { toggleModalSelectionList } from '@/components/modal/selection/modal-selection-list';
import SectionContainer from '@/components/pages/services/section-container';
import SectionSupports from '@/components/section/section-supports';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';
import CITY from '@/mock/location.json';
import VEXERE from '@/mock/vexere.json';
import Routers from '@/routes/routers';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { withMobile } from '@/utilities/function';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

type CityType = { id: number; name: string };
type State = {
  cityFrom: CityType;
  cityTo: CityType;
  start: string | undefined;
  end: string | undefined;
};
const ITravelVexerePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const [isload, setIsload] = useState<boolean>(false);
  const router = useRouter();

  const city: CityType[] = CITY.map((item) => ({ id: Number(item.id), name: item.name }));

  const [dataFilter, setDataFilter] = useState<State>({
    cityFrom: { id: -1, name: '' },
    cityTo: { id: -1, name: '' },
    start: undefined,
    end: undefined
  });
  const setValue = <K extends keyof State>(k: K, value: State[K]) => setDataFilter((prev) => ({ ...prev, [k]: value }));

  const { scrollY } = useWindowScrollPositions();
  const handleSelectCityFrom = withMobile((e) => {
    e.preventDefault();
    const type = (e.currentTarget as any).dataset.type;
    toggleModalSelectionList({
      options: city,
      placeholder: 'Tìm thành phố',
      defaultValue: type === 'from' ? dataFilter.cityFrom : dataFilter.cityTo,
      title: 'Chọn tỉnh thành phố',
      withSearch: true,
      type: 'primary'
    }).then((v) => v && setDataFilter((prev) => ({ ...prev, [type === 'from' ? 'cityFrom' : 'cityTo']: v })));
  });
  const handleDateStart = withMobile((e) => {
    const field: 'start' | 'end' = (e.currentTarget as any).dataset.type;
    toggleModalDatePicker({ defaultValue: dataFilter[field], title: field === 'start' ? 'Chọn ngày đi' : 'Chọn ngày đến' }).then(
      (date) => date && setValue(field, date.toString())
    );
  });

  const getTravel = () => {
    if (dataFilter.cityFrom.id < 0)
      return toast.error('Nhập thông tin nơi xuất phát', {
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      });
    if (dataFilter.cityTo.id < 0)
      return toast.error('Nhập thông tin nơi nơi đến', {
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      });
    if (!dataFilter.start)
      return toast.error('Nhập thông tin ngày đi', {
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      });
    // if (!compareDate(dataFilter.start!, dataFilter.end!)) {
    //   return toast.error('Nhập sai ngày di chuyển', {
    //     position: 'top-right',
    //     style: {
    //       background: 'white',
    //       color: 'black'
    //     }
    //   });
    // }

    setIsload(true);
    const itemVexere = VEXERE.find((item) => item.from_search_id === dataFilter.cityFrom.id && item.to_search_id === dataFilter.cityTo.id);
    if (!itemVexere) {
      setIsload(false);
      return toast.error('Chưa có tuyến đường này', {
        position: 'top-right',
        style: {
          background: 'white',
          color: 'black'
        }
      });
    }

    router.push({
      pathname: itemVexere.url,
      query: {
        date: dataFilter.start,
        id: 188,
        utm_source: 'ITEL'
      }
    });
  };

  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <div className={clsx('fixed flex w-full md:hidden top-0 left-0 z-10 bg-neutral-0', !scrollY && 'opacity-0 pointer-events-none')}>
        <div className="flex justify-center relative w-full py-4">
          <Link href={Routers.ITRAVEL_SERVIVE} scroll={false}>
            <button type="button">
              <Svg src="/icons/line/close.svg" className="absolute left-4 top-5 w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-md font-bold">iTel x Vexere</h1>
        </div>
      </div>
      <nav className="hidden md:block sticky top-0 bg-neutral-800 py-4.5 z-10 text-neutral-200">
        <div className="container flex items-center">
          <Link className="flex-1 flex items-center cursor-pointer" href={Routers.ITRAVEL_SERVIVE} scroll={false}>
            <button type="button">
              <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
            </button>
            Trở về
          </Link>
          <div className="flex-1 text-center text-[1.125rem]">
            <Svg src="/logo/logoVexere.svg" className="h-8" />
          </div>
          <div className="flex-1 flex justify-end relative">
            {/* <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
              6
            </div>
            <figure className="aspect-square w-12 rounded-full overflow-hidden">
              <img alt="" src="/images/apple.png" className="w-full h-full object-cover bg-neutral-0" />
            </figure> */}
          </div>
        </div>
      </nav>
      <div className="relative flex-col">
        <div className="relative">
          <div className="bg-gradient-to-t from-neutral-900 opacity-50 w-full h-full absolute top-0 left-0 md:block hidden"></div>
          <div className="aspect-tivi lg:hidden block">
            <img alt="" src="/images/service/bgVexereSmall.png" className="object-cover h-full w-full hidden md:block" />
            <img alt="" src="/images/service/bgVexereMB.png" className="object-cover h-full w-full md:hidden" />
          </div>
          <div className="xl:aspect-section-banner hidden lg:aspect-video lg:block">
            <img alt="" src="/images/service/bgVexere.png" className="object-cover h-full w-full" />
          </div>
        </div>

        <div className="absolute top-0 left-0 md:pt-20 md:pb-8 md:px-10 pt-24 px-4 w-full h-full md:text-left text-center xl:aspect-section-banner lg:aspect-video lg:p-0 lg:flex items-center">
          <div className="lg:container h-full w-full flex flex-col items-center justify-between lg:h-fit">
            <div className="flex flex-col items-center w-full">
              <h1 className="xl:text-5xl md:text-[40px] text-[32px] font-itel">
                <b>Đặt vé xe online toàn quốc</b>
              </h1>
              <p className="text-sm md:text-base text-center mt-2">
                Sàn TMĐT về vé xe lớn nhất Việt Nam, hỗ trợ người dùng đặt vé xe khách một cách dễ dàng, tiện lợi và nhanh chóng.
              </p>
              <div className="max-md:hidden flex w-full flex-col items-center">
                <div className="grid xl:grid-cols-3 grid-cols-1 gap-4 w-full mt-10">
                  <InputComboboxLabelIn
                    title="Đi từ"
                    placeholder="Chọn thành phố, địa điểm"
                    options={city}
                    value={dataFilter.cityFrom}
                    onChange={(e) => {
                      setDataFilter({ ...dataFilter, cityFrom: e });
                    }}
                  />
                  <InputComboboxLabelIn
                    title="Đi đến"
                    placeholder="Chọn thành phố, địa điểm"
                    options={city}
                    value={dataFilter.cityTo}
                    onChange={(e) => {
                      setDataFilter({ ...dataFilter, cityTo: e });
                    }}
                  />
                  <div className="relative">
                    <InputDate.Wrapper>
                      <label className="flex relative px-4 pt-3 pb-2 bg-neutral-0 rounded-xl">
                        <div className="form-control flex-1">
                          <p className="label-text font-medium text-subtle-content">Ngày đi</p>
                          <InputDate
                            className="w-full bg-transparent mt-1 font-bold outline-none"
                            placeholder="dd/mm/yyyy"
                            value={dataFilter.start}
                            onChange={(d) => setValue('start', d?.toString())}
                          />
                        </div>
                        <button className="">
                          <Svg src="/icons/bold/down.svg" className="w-6 h-6" />
                        </button>
                      </label>
                      <InputDate.Content className="absolute right-0 mt-2 z-10">
                        {({ hide }) => (
                          <div className="bg-neutral-0 rounded-2xl shadow-itel px-6 py-8">
                            <DatePicker
                              onChange={(date) => {
                                setValue('start', date?.toString());
                                hide();
                              }}
                              value={dataFilter.start}
                            />
                          </div>
                        )}
                      </InputDate.Content>
                    </InputDate.Wrapper>
                  </div>
                  {/* <div className="relative">
                    <InputDate.Wrapper>
                      <label className="flex relative px-4 pt-3 pb-2 bg-neutral-0 rounded-xl">
                        <div className="form-control flex-1">
                          <p className="label-text font-medium text-subtle-content">Ngày đến</p>
                          <InputDate
                            className="w-full bg-transparent mt-1 font-bold outline-none"
                            placeholder="dd/mm/yyyy"
                            value={dataFilter.end}
                            onChange={(d) => setValue('end', d?.toString())}
                          />
                        </div>
                        <button className="">
                          <Svg src="/icons/bold/down.svg" className="w-6 h-6" />
                        </button>
                      </label>
                      <InputDate.Content className="absolute mt-2 z-10">
                        {({ hide }) => (
                          <div className="bg-neutral-0 rounded-2xl shadow-itel px-6 py-8">
                            <DatePicker
                              onChange={(date) => {
                                setValue('end', date?.toString());
                                hide();
                              }}
                              value={dataFilter.end}
                            />
                          </div>
                        )}
                      </InputDate.Content>
                    </InputDate.Wrapper>
                  </div> */}
                </div>
                <ButtonLoading
                  isLoading={isload}
                  type="button"
                  className={clsx('btn btn-primary rounded-full my-10 px-[70px]')}
                  onClick={() => getTravel()}
                >
                  <p> Tìm kiếm </p>
                </ButtonLoading>
              </div>
            </div>
            <div className="text-neutral-200 md:flex text-sm hidden lg:absolute bottom-8">
              Dành cho tất cả các tuyến, Giảm 3% Mã ưu đãi
              <b className="text-neutral-0 pl-1">ITEL087</b>. Chi tiết ưu đãi xem{' '}
              <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: 1 } }} className="text-neutral-0 pl-1 font-bold">
                {' '}
                tại đây
              </Link>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="bg-transparent mobile-container md:hidden space-y-4 py-6">
          <InputLabelIn
            title="Đi từ"
            placeholder="Chọn thành phố, địa điểm"
            className="bg-neutral-0 rounded-xl"
            value={dataFilter.cityFrom.name}
            onFocus={(e) => e.preventDefault()}
            containerProps={{
              onClick: handleSelectCityFrom,
              'data-type': 'from'
            }}
            onChange={() => void 0}
          />
          <InputLabelIn
            title="Đi đến"
            placeholder="Chọn thành phố, địa điểm"
            className="bg-neutral-0 rounded-xl"
            value={dataFilter.cityTo.name}
            onFocus={(e) => e.preventDefault()}
            containerProps={{
              onClick: handleSelectCityFrom,
              'data-type': 'to'
            }}
            onChange={() => void 0}
          />
          <InputLabelIn
            title="Ngày đi"
            placeholder="dd/mm/yyyy"
            className="bg-neutral-0 rounded-xl"
            value={dataFilter.start ? dayjs(dataFilter.start).format('DD/MM/YYYY') : ''}
            onFocus={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
            }}
            onMouseDown={(e) => e.preventDefault()}
            containerProps={{
              onClick: handleDateStart,
              'data-type': 'start'
            }}
            onChange={() => void 0}
          />
          {/* <InputLabelIn
            title="Ngày đến"
            placeholder="Thêm ngày"
            className="bg-neutral-0 rounded-xl"
            value={dataFilter.end ? dayjs(dataFilter.end).format('DD/MM/YYYY') : ''}
            onFocus={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
            }}
            onMouseDown={(e) => e.preventDefault()}
            containerProps={{
              onClick: handleDateStart,
              'data-type': 'end'
            }}
            onChange={() => void 0}
          /> */}
          <div className="text-center mt-8">
            <ButtonLoading className="btn btn-primary rounded-full px-8" isLoading={isload} onClick={() => getTravel()} type={'button'}>
              Tìm kiếm
            </ButtonLoading>
          </div>
          <div className="text-center mt-1.5 text-sm">
            Dành cho tất cả các tuyến, Giảm 3% Mã ưu đãi
            <b> ITEL087</b>. Chi tiết ưu đãi xem
            <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: 1 } }}>
              <b> tại đây</b>
            </Link>
          </div>
        </div>
      </div>
      <section className="bg-neutral-0">
        <SectionContainer className="container md:pt-20 md:pb-16 xl:pb-6">
          <h1 className="font-itel md:text-h-lg xl:text-h1 text-h-xxs md:text-center">
            <b>
              ƯU ĐÃI KHI ĐẶT <span className="text-blue-500">VEXERE</span> TRÊN <span className="text-red-500">ITEL</span>
            </b>
          </h1>
          <p className="text-neutral-500 max-md:hidden mt-2">
            Những du khách khác rất thích những điểm đến này. Hãy tìm kiếm các chuyến bay, khách sạn và xe thuê để cùng họ tham gia cuộc
            phiêu lưu.
          </p>
          {/* <div className="md:mt-4 xl:mt-0 divide-y divide-neutral-100 md:divide-y-0"></div>
           */}
          <div className="mt-5 md:mt-14 md:px-10 pb-4 md:pt-0 hidden md:block">
            <div className="md:mt-10 grid md:gap-6 gap-3 lg:grid-cols-3">
              {vouchers.data.slice(0, 1).map((voucher, i) => (
                <CardService
                  isLayoutTop
                  desc="Tết đến, Vexere sale thả ga, giảm đến 50% khi đặt vé tại Vexere"
                  title={voucher.title}
                  classNameTitle="line-clamp-2 md:text-2xl"
                  key={voucher.id}
                  className={clsx(i === 0 && 'col-span-2', i > 0 && 'rounded-xl')}
                  classNameFrame={clsx(i === 0 ? 'lg:aspect-photo md:aspect-video' : 'aspect-video', 'rounded-2xl', i > 0 && 'rounded-xl')}
                  img={voucher.banner}
                  isHideDesc={i > 0}
                  classNameDesc="md:text-base"
                />
              ))}
              <div className="col-span-1 grid-cols-2 grid gap-3 lg:grid-cols-1">
                {vouchers.data.slice(1, 3).map((voucher, i) => (
                  <CardService
                    isLayoutTop
                    desc=""
                    title={voucher.title}
                    classNameTitle="line-clamp-2 md:text-xl"
                    key={voucher.id}
                    className={clsx('rounded-xl')}
                    classNameFrame={clsx('aspect-video lg:aspect-cinema', 'rounded-xl')}
                    img={voucher.banner}
                    isHideDesc={i > 0}
                    classNameDesc="md:text-base"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden mt-3 bg-neutral-0">
            <div className="grid grid-cols-2 gap-3">
              {vouchers.data.slice(0, 2).map((voucher, i) => (
                <CardService
                  isLayoutTop
                  desc=""
                  title={voucher.title}
                  classNameTitle="line-clamp-2 text-sm font-bold"
                  key={voucher.id}
                  className={clsx('rounded-xl')}
                  classNameFrame={clsx('aspect-video lg:aspect-cinema', 'rounded-xl')}
                  img={voucher.banner}
                  isHideDesc={i > 0}
                  classNameDesc="md:text-base"
                />
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>
      <SectionSupports />
      <FooterDefault className="bg-neutral-0" />
      <ChatBoxLazy />
    </>
  );
};

ITravelVexerePagge.displayName = 'ITravelVexerePagge';

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 10 });
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers,
      vouchersForYou
    }
    // revalidate: 8600
  };
});

export default ITravelVexerePagge;
export { getStaticProps };
