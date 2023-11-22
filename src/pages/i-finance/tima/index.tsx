import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';

import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import FooterDefault from '@/components/footer/default';
import HeaderAppDefault from '@/components/header/header-app-default';
import Svg from '@/components/icon/svg';
import SectionContainer from '@/components/pages/services/section-container';
import SectionSupports from '@/components/section/section-supports';
import FilterService from '@/components/service/FilterService';
import PopupFilterCity from '@/components/service/PopupFilterCity';
import { FILTER_CITY } from '@/constants/services.constants';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { useRouter } from 'next/router';
import { useState } from 'react';

type PageProps = {
  vouchersHOT: Data.VouchersHOT;
};

const IFiranceTimePagge: NextPage<PageProps> = ({ vouchersHOT }) => {
  const router = useRouter();
  const [dataFilter, setDataFilter] = useState({
    city: { id: -1, name: '' },
    district: { id: -1, name: '' }
  });
  const [isShowFilterCity, setIsshowFilterCity] = useState(false);
  const [isShowFilterDistrict, setIsShowFilterDistrict] = useState(false);
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <HeaderAppDefault title="iTel x Tima" mode="close" type="fixed" onClose={router.back} />
      <nav className="sticky top-0 bg-neutral-800 py-4.5 z-10 text-neutral-200 hidden md:block">
        <div className="container flex items-center">
          <div className="flex-1 flex items-center cursor-pointer" onClick={router.back}>
            <button type="button">
              <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
            </button>
            Trở về
          </div>
          <div className="flex-1 text-center text-[1.125rem]">
            <Svg src="/logo/logoTima.svg" className="h-8" />
          </div>
          <div className="flex-1 flex justify-end relative">
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
              6
            </div>
            <figure className="aspect-square w-12 rounded-full overflow-hidden">
              <img alt="" src="/images/apple.png" className="w-full h-full object-cover bg-neutral-0" />
            </figure>
          </div>
        </div>
      </nav>
      <div className="relative flex-col">
        <div className="aspect-tivi-vertical absolute top-0 left-0 md:aspect-tivi lg:hidden w-full block">
          <img alt="" src="/images/service/bgTimaSmall.png" className="object-cover h-full w-full" />
        </div>
        <div className="lg:aspect-photo xl:aspect-cinema absolute top-0 left-0 2xl:aspect-[3/1.05] 3xl:aspect-section-banner hidden h-full w-full lg:block">
          <img alt="" src="/images/service/bgTima.png" className="object-cover h-full w-full" />
        </div>
        <div>
          <div className="text-neutral-0 md:pt-[60px] md:px-10 w-full h-full lg:py-[62px] relative pb-12">
            <div className="lg:container lg:grid lg:grid-cols-2 md:pt-0 pt-[72px] flex flex-col items-center md:items-start">
              <div className="">
                <div className="">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="md:w-[203px] w-18 mt-1">
                      <img src="/images/service/logoBannerTima.svg" className="w-full" alt="" />
                    </div>
                    <h1 className="2xl:text-[56px] md:text-5xl font-itel md:mt-8 text-[32px]">
                      <b>ĐĂNG KÝ VAY NHANH</b>
                    </h1>
                    <p className="text-sm md:text-xl md:mt-2">Vay nhanh lãi mỏng, nhận tiền trong 2 giờ</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 md:mt-12 mt-8">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Chỉ cần giấy <b>đăng ký/cà vẹt xe máy</b>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Vay <b>3 triệu - 42 triệu</b> trong 12 tháng
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      <b>Không thẩm định</b> nhà ở - nơi làm
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      <b>Không</b> chứng minh thu nhập
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Svg src="/icons/bold/check.svg" className="bg-neutral-0 stroke-orange aspect-square rounded-full w-5 p-1" />
                    </div>
                    <p>
                      Lãi suất <b>1,5%/tháng</b> (18%/năm)
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-neutral-50 relative hidden lg:block rounded-[24px] text-neutral-800">
                <h1 className="text-2xl text-neutral-800 font-bold">Đăng ký vay ngay</h1>

                <div className="grid gap-8 mt-8 font-medium">
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Họ và tên: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <input
                        className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full font-medium placeholder:text-neutral-500"
                        placeholder="Nhập họ và tên "
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Số điện thoại: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <input
                        className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full font-medium placeholder:text-neutral-500"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8 text-neutral-800 font-medium">
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Tỉnh/Thành phố: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <FilterService
                        classValue="font-medium"
                        className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                        classNameOptions="right-0"
                        options={FILTER_CITY}
                        onChange={(e) => {
                          setDataFilter({ ...dataFilter, city: e });
                        }}
                        displayValue={(item) => item?.name || ''}
                        value={dataFilter.city}
                        placeholder="Chọn tỉnh/thành phố"
                        disableInput
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-800 mb-2">
                      Quận/Huyện: <b className="text-red-500">*</b>
                    </p>
                    <div className="flex gap-6 items-center">
                      <FilterService
                        classValue="font-medium"
                        className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                        classNameOptions="right-0"
                        options={FILTER_CITY}
                        onChange={(e) => {
                          setDataFilter({ ...dataFilter, district: e });
                        }}
                        displayValue={(item) => item?.name || ''}
                        value={dataFilter.district}
                        placeholder="Chọn quận/huyện"
                        disableInput
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-8">
                  <button className="btn btn-primary px-28 rounded-full xl:py-5 h-auto">Vay ngay</button>
                  <p className="text-neutral-500 text-sm mt-3">
                    Bấm VAY NGAY, bạn đã đồng ý với <b className="text-neutral-700">điều khoản và điều kiện</b> của Tima
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* mobile tablet */}
          <div className="md:px-10 md:py-12 py-6 px-4 bg-neutral-50 relative lg:hidden">
            <h1 className="md:text-[32px] text-neutral-800 font-bold text-lg">Đăng ký vay ngay</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 md:mt-8 mt-4 font-medium">
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Họ và tên: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <input
                    className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full placeholder:text-neutral-500 font-medium"
                    placeholder="Nhập họ và tên "
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Số điện thoại: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  <input
                    className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full placeholder:text-neutral-500 font-medium"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              <div className="font-medium">
                <p className="text-sm text-neutral-800 mb-2">
                  Tỉnh/Thành phố: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center">
                  {/* tablet */}
                  <div className="hidden md:block w-full">
                    <FilterService
                      classValue="font-medium"
                      className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                      classNameOptions="right-0"
                      options={FILTER_CITY}
                      onChange={(e) => {
                        setDataFilter({ ...dataFilter, city: e });
                      }}
                      displayValue={(item) => item?.name || ''}
                      value={dataFilter.city}
                      placeholder="Chọn tỉnh/thành phố"
                      disableInput
                    />
                  </div>
                  {/* mobile */}
                  <div className="md:hidden w-full">
                    <FilterService
                      onClick={() => {
                        setIsshowFilterCity(true);
                      }}
                      classValue="font-medium"
                      className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                      classNameOptions="right-0"
                      options={FILTER_CITY}
                      onChange={(e) => {
                        setDataFilter({ ...dataFilter, city: e });
                      }}
                      displayValue={(item) => item?.name || ''}
                      value={dataFilter.city}
                      placeholder="Chọn tỉnh/thành phố"
                      disableInput
                    />
                    <PopupFilterCity
                      options={FILTER_CITY}
                      setOpen={() => {
                        setIsshowFilterCity(true);
                      }}
                      handleClose={() => {
                        setIsshowFilterCity(false);
                      }}
                      open={isShowFilterCity}
                      onSelect={(e) => {
                        if (e) setDataFilter({ ...dataFilter, city: e });
                      }}
                      selected={dataFilter.city}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-800 mb-2">
                  Quận/Huyện: <b className="text-red-500">*</b>
                </p>
                <div className="flex gap-6 items-center w-full">
                  {/* tablet */}
                  <div className="hidden md:block w-full">
                    <FilterService
                      classValue="font-medium"
                      className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                      classNameOptions="right-0"
                      options={FILTER_CITY}
                      onChange={(e) => {
                        setDataFilter({ ...dataFilter, district: e });
                      }}
                      displayValue={(item) => item?.name || ''}
                      value={dataFilter.district}
                      placeholder="Chọn quận/huyện"
                      disableInput
                    />
                  </div>
                  {/* mobile */}
                  <div className="md:hidden w-full">
                    <FilterService
                      onClick={() => setIsShowFilterDistrict(true)}
                      classValue="font-medium"
                      className="!rounded-lg whitespace-nowrap pr-12 py-4 bg-transparent"
                      classNameOptions="right-0"
                      options={FILTER_CITY}
                      onChange={(e) => {
                        setDataFilter({ ...dataFilter, district: e });
                      }}
                      displayValue={(item) => item?.name || ''}
                      value={dataFilter.district}
                      placeholder="Chọn quận/huyện"
                      disableInput
                    />
                    <PopupFilterCity
                      options={FILTER_CITY}
                      setOpen={() => {
                        setIsShowFilterDistrict(true);
                      }}
                      handleClose={() => {
                        setIsShowFilterDistrict(false);
                      }}
                      open={isShowFilterDistrict}
                      onSelect={(e) => {
                        if (e) setDataFilter({ ...dataFilter, district: e });
                      }}
                      selected={dataFilter.district}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <button className="btn btn-primary md:px-28 px-8 rounded-full w-fit">Vay ngay</button>
              <p className="text-neutral-500 text-sm mt-3 md:text-start text-center">
                Bấm VAY NGAY, bạn đã đồng ý với <b className="text-neutral-700">điều khoản và điều kiện</b> của Tima
              </p>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      <div className="bg-neutral-100 h-2 w-full md:hidden" />
      <div className="md:pt-16 pt-6 bg-neutral-0 lg:py-20">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl lg:text-[56px] md:text-[32px] text-lg font-itel text-neutral-800">
            <b>
              Ưu điểm về
              <br className="lg:hidden md:block hidden" /> dịch vụ của Tima
            </b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4 hidden md:block">
            Chúng tôi chỉ hợp tác với các đối tác tài chính tốt nhất tại Việt Nam. Do đó, bạn có thể chắc <br /> chắn rằng khoản vay mà bạn
            sẽ nhận được đến từ một công ty uy tín.
          </p>
        </div>
        <div className="container mt-5 md:mt-16 md:px-10 md:pb-16 md:pt-0 lg:pb-0 pb-6 ">
          <div className="grid grid-cols-2 md:gap-10 md:px-10 gap-3 lg:grid-cols-4 px-0 lg:px-0">
            <div className="flex flex-col items-center">
              <Svg src="/images/service/money.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">Lãi suất tốt</b>
              <p className="text-sm text-neutral-500 text-center mt-2">Vay không cần thế chấp với lãi suất cạnh tranh</p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/moneyPink.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">Đơn giản tiện lợi</b>
              <p className="text-sm text-neutral-500 text-center mt-2">Chỉ cần đăng ký online, hồ sơ đơn giản, giải ngân trong ngày</p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/moneyBlue.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">Chi phí hợp lý</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                Tima tư vấn miễn phí, không thu bất cứ khoản chi phí nào trước khi vay
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/moneyDark.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">Nhận khoản vay</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                tima là đơn vị hàng đầu kết nối hơn 20.000 đối tác cho vay trên toàn quốc
              </p>
            </div>
          </div>
        </div>
      </div>
      <SectionContainer className="container max-md:px-0 py-6 md:py-16 xl:py-20" childClassName="bg-transparent">
        <h1 className="font-itel md:text-h-lg xl:text-h1 text-h-xxs text-center">
          <b>Thông tin và chính sách</b>
        </h1>
        <p className="text-neutral-500 mt-2 text-center text-sm md:text-base">
          Những du khách khác rất thích những điểm đến này. Hãy tìm kiếm các chuyến bay, khách sạn và xe thuê để cùng họ tham gia cuộc phiêu
          lưu.
        </p>
        <div className="flex md:block xl:flex xl:gap-6 mt-3 md:mt-10 xl:mt-14 overflow-auto px-4 -mx-4 scrollbar-hide">
          <div className="w-36 md:w-auto md:flex-1 px-1.5 md:px-0 flex-shrink-0">
            <div className="card">
              <figure className="group block-img block-photo md:block-video xl:block-photo rounded-lg md:rounded-2xl bg-base-300">
                <img
                  src={vouchersHOT.data[0].img}
                  alt={vouchersHOT.data[0].title}
                  className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                />
              </figure>
              <div className="py-2 md:pb-0">
                <h5 className="text-sm md:text-lg">
                  <b>{vouchersHOT.data[0].title}</b>
                </h5>
                <p className="max-md:hidden text-subtle-content mt-1">Tết đến, Vexere sale thả ga, giảm đến 50% khi đặt vé tại Vexere</p>
              </div>
            </div>
          </div>
          <div className="flex xl:block xl:w-[25.5rem] md:-mx-3 xl:mx-0 md:mt-10 xl:mt-0 xl:space-y-6">
            {vouchersHOT.data.slice(1, 3).map((voucher) => {
              return (
                <div key={voucher.id} className="px-1.5 md:px-3 xl:px-0 w-36 md:w-1/2 xl:w-full">
                  <div className="card">
                    <figure className="group block-img block-photo md:block-video xl:block-cinema rounded-lg md:rounded-2xl bg-base-300">
                      <img
                        src={voucher.img}
                        alt={voucher.title}
                        className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                      />
                    </figure>
                    <div className="py-2 md:pb-0">
                      <h5 className="text-sm md:text-lg">
                        <b>{voucher.title}</b>
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      <div className="md:pt-16 pt-6 lg:py-20 bg-neutral-0">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl lg:text-[56px]  md:text-[32px] text-lg font-itel text-neutral-800">
            <b>Quy TRÌNH VAY 4 BƯỚc</b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base mt-4">Vay nhanh, lãi mỏng, nhận tiền trong 2 giờ</p>
        </div>
        <div className="container mt-5 md:mt-16 md:px-10 md:pb-16 md:pt-0 lg:pb-0 pb-6 ">
          <div className="grid grid-cols-2 md:gap-10 md:px-10 gap-3 lg:grid-cols-4 px-0 lg:px-0">
            <div className="flex flex-col items-center">
              <Svg src="/images/service/health/procedure1.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">1. Đăng ký vay</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                Hoàn tất điền thông tin
                <br className="lg:hidden md:block hidden" /> trong 30 giây
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/health/procedure2.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">2. Chuẩn bị hồ sơ</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                Giấy đăng ký xe máy <br className="lg:hidden md:block hidden" />
                hoặc Giấy đăng ký ô tô
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/health/procedure3.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">3. Xét duyệt</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                Nhận kết quả nhanh chóng <br className="lg:hidden md:block hidden" />
                sau khi gửi hồ sơ
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Svg src="/images/service/health/procedure4.svg" className="md:w-14 md:h-14 w-9 h-9 mb-6" />
              <b className="md:text-xl md:mt-2 text-base">4. Nhận khoản vay</b>
              <p className="text-sm text-neutral-500 text-center mt-2">
                Nhận tiền qua
                <br className="lg:hidden md:block hidden" /> tài khoản ngân hàng
              </p>
            </div>
          </div>
        </div>
      </div>
      <SectionSupports />
      <FooterDefault className="bg-neutral-0" />
      <ChatBoxLazy />
    </>
  );
};

IFiranceTimePagge.displayName = 'IFiranceTimePagge';

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchersHOT = await vouchersServices.getListVoucherHOT({ limit: 3 });
  return {
    props: {
      vouchersHOT
    },
    // revalidate: 8600
  };
});

export default IFiranceTimePagge;
export { getStaticProps };
