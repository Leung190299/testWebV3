import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
// import ModalProvider from '../../components/modal-card-recharge';

const CardRechargePage: NextPage = () => {
  enum TAB {
    tab1 = 'Nạp tiền điện thoại',
    tab2 = 'Mua mã thẻ'
  }
  const [activeTab, setActiveTab] = useState<TAB>(TAB.tab1);
  const [network, setNetworkProvider] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isShowModalProvider, SetIsShowModalProvider] = useState<boolean>(false);
  const [isBlurInputPhoneNumber, setIsBlurInputPhoneNumber] = useState<boolean>(false);

  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const checkValidPhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^(0|\+84)(3[2-9]|5[2689]|7[0-79]|8[1-689]|9[0-4|6-9])[0-9]{7}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <>
      <Head>
        <title>Itel - Nạp thẻ</title>
      </Head>
      <section className="container">
        <h2 className="font-itel text-h-sm">Nạp thẻ di động</h2>
        <div className="mt-6 flex w-full">
          <div
            onClick={() => setActiveTab(TAB.tab1)}
            className={`flex cursor-pointer items-center border-b-2 ${
              activeTab === TAB.tab1 ? 'border-red-500' : 'border-neutral-200'
            } p-4`}
          >
            <Svg
              src="/icons/bold/recharge-card.svg"
              className={`h-8 w-8 ${activeTab === TAB.tab1 ? 'text-red-500' : 'text-neutral-700'} `}
            />
            <p className={`ml-2 font-medium  ${activeTab === TAB.tab1 ? 'text-neutral-700' : 'text-neutral-500'}`}>{TAB.tab1}</p>
          </div>
          <div
            onClick={() => setActiveTab(TAB.tab2)}
            className={`flex cursor-pointer items-center border-b-2 ${
              activeTab === TAB.tab2 ? 'border-red-500' : 'border-neutral-200'
            } p-4`}
          >
            <Svg src="/icons/bold/buy-card.svg" className={`h-8 w-8 ${activeTab === TAB.tab2 ? 'text-red-500' : 'text-neutral-700'} `} />
            <p className={`ml-2 font-medium  ${activeTab === TAB.tab2 ? 'text-neutral-700' : 'text-neutral-500'}`}>{TAB.tab2}</p>
          </div>
          <div className="flex-1 border-b-2 border-neutral-200"></div>
        </div>
        <div className="mt-6 flex w-full">
          <div className="mr-6 flex w-full flex-col text-neutral-800">
            <label htmlFor="phone-number" className="block">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              onBlur={() => setIsBlurInputPhoneNumber(true)}
              value={phoneNumber}
              onChange={(e) => handleChangePhoneNumber(e)}
              className="placeholder:text-md mt-2 w-full rounded-lg border border-neutral-200 bg-secondary p-4 font-bold placeholder-neutral-800 placeholder-opacity-50 outline-none placeholder:font-bold focus:border-transparent focus:ring-1 focus:ring-neutral-800"
              required
              id="phone-number"
              name="phone-number"
              type="text"
              placeholder="Nhập số điện thoại"
            />
            {!checkValidPhoneNumber(phoneNumber) && isBlurInputPhoneNumber && (
              <div className="mt-4 flex items-center">
                <Svg className="mr-2 h-8 w-8 text-primary" src="icons/line/danger-circle.svg" />
                <p className="text-base font-normal text-primary">Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!</p>
              </div>
            )}
          </div>
          <div className="relative flex w-4/5 flex-col">
            <label htmlFor="phone-number" className="block">
              Nhà mạng <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => SetIsShowModalProvider(!isShowModalProvider)}
              className="group relative mt-2 flex w-full items-center justify-between overflow-hidden rounded-lg border border-neutral-200 bg-secondary p-4 font-bold hover:border-neutral-800 focus:border-neutral-800"
              id="phone-number"
            >
              <Svg src="/logo/itel.svg" className="absolute right-20 top-1/2 inline-block h-8 -translate-y-1/2 scale-125" />
              <div></div>
              <Svg
                src="/icons/bold/down.svg"
                className="scale inline-flex h-6 w-6 justify-start transition-all duration-500 ease-out group-hover:rotate-180"
              />
            </div>
            {/* {isShowModalProvider && (
              <ModalProvider SetIsShowModalProvider={SetIsShowModalProvider} setNetworkProvider={setNetworkProvider} network="itel" />
            )} */}
            <p className="mt-4 text-sm font-medium text-neutral-500">Vui lòng lựa chọn đúng nhà mạng của bạn</p>
          </div>
        </div>
      </section>
      <section className="container mt-6 flex flex-col justify-center">
        <p>
          Mệnh giá nạp <span className="font-medium text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <CardItem key={item} price={10000} percent={5} />
          ))} */}
        </div>
        <button
          className={`mx-auto mb-12 mt-8 rounded-full bg-primary px-8 py-2 text-center text-base text-neutral-0 ${
            Boolean(checkValidPhoneNumber(phoneNumber) && network) ? 'opacity-100' : 'opacity-30'
          }`}
        >
          Nạp ngay
        </button>
      </section>
      <SectionSupports />
    </>
  );
};

CardRechargePage.getLayout = function (page) {
  return (
    <>
      <LayoutDefault>{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default CardRechargePage;
