import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const PaymentStatusPage: NextPage = () => {
  const [isSuccessPayment, setIsSuccessPayment] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Itel - Nạp thẻ</title>
      </Head>
      <section className="px-32">
        <div className="mt-4 flex flex-col items-center justify-center">
          {isSuccessPayment ? (
            <Svg src="icons/others/payment-success.svg" className="mt-6 h-12 w-12" />
          ) : (
            <Svg src="icons/others/payment-failed.svg" className="mt-6 h-12 w-12" />
          )}
          <p className="mt-6 text-2xl font-bold text-neutral-800">{`Thanh toán  ${isSuccessPayment ? 'thành công!' : 'thất bại!'}`}</p>
          <h3 className={`mt-2 text-2xl font-bold ${isSuccessPayment ? 'text-green-500' : 'text-primary'}`}>11.244.000đ</h3>
          {isSuccessPayment ? (
            <div>
              <p className="mt-2 text-center text-sm font-normal text-neutral-500">
                Tài khoản nghe gọi của thuê bao sẽ được cập nhật tối đa trong 15 phút. Bạn có thể kiểm tra thông báo nạp tiền từ tin nhắn
                136, 155 hoặc 195.
              </p>
              <p className="text-center text-sm font-normal text-neutral-500">Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️. </p>
            </div>
          ) : (
            <p className="mt-2 text-center text-sm font-normal text-neutral-500">
              Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline{' '}
              <span className=" font-medium text-neutral-800">0877 087 087</span> (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.
            </p>
          )}
        </div>
        <div className="mt-6 rounded-lg border border-neutral-300 p-4 pr-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Svg src="/logo/itel.svg" className="mr-6 h-18 w-18 rounded-lg bg-neutral-100" />
              <div>
                <p className="text-base font-bold text-neutral-800">Viettel 100.000đ</p>
                <p className="text-sm font-normal text-neutral-500">Nạp tiền điện thoại</p>
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-neutral-800">096 412 4715</p>
              <p className="text-sm font-normal text-neutral-500">Số điện thoại nhận</p>
            </div>
          </div>
        </div>
        <div>
          {isSuccessPayment && (
            <div className="mt-4 flex justify-between">
              <p className="text-sm font-normal text-neutral-500">Mã đơn hàng</p>
              <p className="text-base font-bold text-neutral-800">Momo</p>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Phương thức thanh toán</p>
            <p className="text-base font-bold text-neutral-800">iTel123478sd45</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Thời gian thanh toán</p>
            <p className="text-base font-bold text-neutral-800">16:50 - 01/03/2023</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Trạng thái</p>
            <p className="text-base font-bold text-neutral-800">{isSuccessPayment ? 'Thành công' : 'Thất bại'}</p>
          </div>
        </div>
      </section>
      <div className="mx-32 my-8 h-[1px] bg-neutral-200"></div>
      {isSuccessPayment && (
        <section className="mt-4 flex flex-col items-center justify-center px-32">
          <p className="my-6 text-sm font-normal text-neutral-800">Đánh giá trải nghiệm dịch vụ để giúp iTel phát triển hơn nhé ♥️</p>
          <div className="w-full">
            <div className="mt-2 flex items-center justify-between px-8">
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-yellow-500" />
              <Svg src="/icons/bold/star.svg" className="h-8 w-8 cursor-pointer text-neutral-300" />
            </div>
            <div className="mx-auto mb-4 mt-8 flex w-full items-center ">
              <p className="ml-8 text-xs font-medium text-neutral-800">Rất tệ</p>
              <p className="ml-40 text-xs font-medium text-neutral-800">Bình thường</p>
              <p className="ml-auto pr-3 text-xs font-medium text-neutral-800">Rất hài lòng</p>
            </div>
          </div>
          <div className="w-full">
            <textarea
              className="w-full rounded-lg border border-neutral-200 bg-neutral-0 p-4 text-sm font-medium text-neutral-800 outline-none"
              name="feedback"
              id="feedback-tbx"
              rows={4}
              placeholder="Nhập nội dung phản hồi (nếu có)"
            />
          </div>
        </section>
      )}
      <div className="mb-20 px-32">
        <div className="mt-5 flex w-full justify-between gap-4 ">
          <button className="w-1/2 rounded-full border border-primary bg-neutral-0 py-4 text-base font-bold text-primary">
            Về trang chủ
          </button>
          <button className="w-1/2 rounded-full bg-primary py-4 text-base font-bold text-neutral-0">
            {isSuccessPayment ? 'Mua thêm' : 'Thử lại'}
          </button>
        </div>
        {!isSuccessPayment && <p className="mt-8 text-center text-base font-bold text-neutral-800">Liên hệ hỗ trợ</p>}
      </div>
    </>
  );
};

PaymentStatusPage.getLayout = function (page) {
  return (
    <>
      <LayoutDefault>{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default PaymentStatusPage;
