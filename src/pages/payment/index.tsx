import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import Ewallet, { EwalletProps } from '../../components/e-wallet';
import { useState } from 'react';

const PaymentPage: NextPage = () => {
  const Ewalets= [
    {
      walletName: 'VNPay',
      salePrice: 200000,
      logoPath: '/icons/payment/zalo.svg'
    },
    {
      walletName: 'ZaloPay',
      salePrice: 200000,
      logoPath: '/icons/payment/zalo.svg'
    },
    {
      walletName: 'Ví Momo',
      salePrice: 200000,
      logoPath: '/icons/payment/momo.svg'
    },
    {
      walletName: 'Chuyển khoản ngân hàng',
      salePrice: 200000,
      logoPath: '/icons/payment/transfer.svg'
    }
  ];

  const [walletPicked, setWalletPicked] = useState<string>('VNPay');

  return (
    <>
      <Head>
        <title>Itel - Nạp thẻ</title>
      </Head>
      <div className="bg-neutral-100 px-4 py-8">
        <h2 className="font-itel text-h-sm">Thanh toán</h2>
        <section className="mt-5 rounded-lg bg-neutral-0 px-8 py-5">
          <p className="text-lg font-bold text-neutral-800">Thông tin đơn hàng</p>
          <div className="my-4 h-[1px] w-full bg-neutral-200"></div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <Svg src="/logo/itel.svg" className="mr-4 h-18 w-18 rounded-lg bg-neutral-100" />
              <div>
                <p className="text-base font-bold text-neutral-800">Viettel 100.000đ</p>
                <p className="text-sm font-normal text-neutral-500">Nạp tiền điện thoại</p>
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-neutral-800">096 412 4715</p>
              <p className="text-sm font-normal text-neutral-500">Số điện thoại nhận</p>
            </div>
            <div>
              <p className="text-base font-bold text-neutral-800">98.000đ</p>
              <p className="text-sm font-normal text-neutral-500 line-through">120.000đ</p>
            </div>
          </div>
        </section>
        <section className="mt-4 rounded-lg bg-neutral-0 px-8 py-5">
          <p className="text-lg font-bold text-neutral-800">Phương thức thanh toán</p>
          <Image className="mt-6" src="/images/promotion.png" alt="banner-payment-momo" width={668} height={155} layout="responsive" />
          <div className="mb-3 mt-5 grid grid-cols-2 gap-4">
            {/* {Ewalets.map((wallet) => (
              <Ewallet
                setEwallet={setWalletPicked}
                walletName={wallet.walletName}
                key={wallet.walletName}
                salePrice={wallet.salePrice}
                logoPath={wallet.logoPath}
                walletPicked={walletPicked}
              />
            ))} */}
          </div>
        </section>
        <section className="mt-4 rounded-lg bg-neutral-0 px-8 py-5">
          <div>
            <p className="text-lg font-bold text-neutral-800">Voucher iTel</p>
            <div className="my-4 h-[1px] w-full bg-neutral-200"></div>
            <div className="flex items-center">
              <Svg src="/icons/bold/iclub.svg" className="mr-2 h-8 w-8 text-primary" />
              <p className="text-sm font-medium text-neutral-800">Đã áp dụng 2 mã. </p>
              <p className="text-sm font-bold text-primary"> &nbsp;Thêm ưu đãi khác</p>
            </div>
          </div>
        </section>
        <section className="mt-4 rounded-lg bg-neutral-0 px-8 py-5">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-2 text-sm font-normal text-neutral-800">Tạm tính</p>
                <Svg src="icons/line/information.svg" className="h-4 w-4 text-neutral-800" />
              </div>
              <p className="text-sm font-medium text-neutral-800">98.000đ</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-normal text-neutral-800">Ưu đãi</p>
              <p className="text-sm font-medium text-neutral-800">20.000đ</p>
            </div>
            <div className="my-4 mt-3 h-[1px] w-full bg-neutral-200"></div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-base font-bold text-neutral-800">Tổng tiền</p>
              <p className="text-base font-bold text-neutral-800">11.244.000đ</p>
            </div>
          </div>
        </section>
        <div className="flex">
          <button className="btn-primary btn ml-auto mt-4">Thanh toán (1)</button>
        </div>
      </div>
    </>
  );
};

PaymentPage.getLayout = function (page) {
  return (
    <>
      <LayoutDefault>{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default PaymentPage;
