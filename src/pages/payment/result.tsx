import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';

import LayoutDefault from '@/components/layout/layout-default';
import { useLoading } from '@/hooks/useLoading';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import rechargeService from '@/services/rechargeService';
import { rechrageModel } from '@/types/recharge';
import { toCurrency } from '@/utilities/currency';
import { removeLocal } from '@/utilities/localStore';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

const PaymentStatusPage: NextPage = () => {
  const [isSuccessPayment, setIsSuccessPayment] = useState<boolean>(true);
  const [paymentInfo, setPaymentInfo] = useState<rechrageModel.paymentInfo[]>([]);
  const [listDetails, setListDetails] = useState<rechrageModel.Detail[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [isRating, setIsRating] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoding] = useState<boolean>(false);
  const router = useRouter();
  const { openLoading, closeLoading } = useLoading();
  const { orderId, paymentId } = router.query;

  useEffect(() => {
    if (paymentId) {
      removeLocal('dataCheckout')
      getInfoPayment(paymentId as string);
    }
  }, [paymentId]);
  const getInfoPayment = async (orderId: string) => {
    try {
      setIsLoding(false);
      openLoading();
      const res = await rechargeService.getpayment(orderId);
      if (res.code === 200) {
        setPaymentInfo(res.result);
        setListDetails(res.result[0].Details || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding(true);
      closeLoading();
    }
  };

  const params: rechrageModel.ParamSurveyCes = {
    phone: paymentInfo[0]?.ContactPhone,
    sourceType: typeof window != 'undefined' && innerWidth >= 768 ? 'WebPC' : 'Mobile',
    productType: 'Sim',
    orderId: orderId as string,
    score: rating,
    content: content
  };
  const postSurveyCes = async () => {
    await rechargeService
      .postSurveyCes(params)
      .then((res) => {
        if (res.code == 200) {
          return router.push({ pathname: Routers.SIM });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLogo = (network: string): string => {
    return network == 'Wintel' ? `/logo/${network}.jpg` : `/logo/${network}.svg`;
  };

  const totalPrice: number = useMemo(() => paymentInfo.reduce((total, item) => total + item.TotalPrice!, 0), [paymentInfo]);

  const handlerBuyMore = () => {
    if (isRating) {
      postSurveyCes();
      return;
    }
    return router.push({ pathname: Routers.SIM });
  };

  if (!isLoading) return(<></>);

  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <title>iTel - Thanh toán</title>
      </Head>
      <section className="md:px-32  px-4">
        <div className="mt-4 flex flex-col items-center justify-center">
          {paymentInfo[0]?.Status != 0 ? (
            <>
              <Svg src="/icons/others/payment-success.svg" className="mt-6 h-12 w-12" />
              <p className="mt-6 text-2xl font-bold text-neutral-800">Thanh toán thành công!</p>
            </>
          ) : (
            <>
              <Svg src="/icons/others/payment-failed.svg" className="mt-6 h-12 w-12" />
              <p className="mt-6 text-2xl font-bold text-neutral-800">Thanh toán thất bại!</p>
            </>
          )}
          <h3 className={`mt-2 text-2xl font-bold ${paymentInfo[0]?.Status != 0 ? 'text-green-500' : 'text-primary'}`}>
            {toCurrency(totalPrice)}
          </h3>
          {paymentInfo[0]?.Status != 0 ? (
            paymentInfo[0]?.OrderType == '1' ? (
              <div className=" px-5">
                <p className="mt-2 text-center text-sm font-normal text-neutral-500">
                  Bạn vui lòng kích hoạt SIM trong vòng 20 ngày kể từ ngày đặt hàng.
                  <br />
                  Nếu quá thời gian trên, iTel sẽ tiến hành thu hồi số thuê bao theo quy định
                </p>
              </div>
            ) : paymentInfo[0]?.OrderType == '3' || paymentInfo[0]?.OrderType == '4' ? (
              <>
                <div className=" px-5">
                  <p className="mt-2 text-center text-sm font-normal text-neutral-500">
                    Bạn sẽ nhận được tin nhắn thông tin đặt hàng về số điện thoại
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className=" px-5">
                  <p className="mt-2 text-center text-sm font-normal text-neutral-500">
                    Để kiểm tra số dư tài khoản chính, Bạn vui lòng bấm gọi *101#. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.
                  </p>
                </div>
              </>
            )
          ) : (
            <p className="mt-2 text-center text-sm font-normal text-neutral-500">
              Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline{' '}
              <span className=" font-medium text-neutral-800">0877 087 087</span> (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.
            </p>
          )}
          {/* {paymentInfo[0]?.Status != 0 || paymentInfo[0]?.OrderType == '5' ? (
            <div className=" px-5">
              <p className="mt-2 text-center text-sm font-normal text-neutral-500">
                Để kiểm tra số dư tài khoản chính, Bạn vui lòng bấm gọi *101#. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.
              </p>
              <p className="text-center text-sm font-normal text-neutral-500"> </p>
            </div>
          ) : (
            <p className="mt-2 text-center text-sm font-normal text-neutral-500">
              Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline{' '}
              <span className=" font-medium text-neutral-800">0877 087 087</span> (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.
            </p>
          )} */}
        </div>
        {paymentInfo[0]?.OrderType == '5' &&
          listDetails.map((details) => (
            <div key={details.Id} className="mt-6 rounded-lg border border-neutral-300 p-4 ">
              <div className="flex flex-col-2 md:flex-row items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={getLogo(details.NetworkName || 'Itelecom')}
                    alt={details.NetworkName}
                    className=" mr-1 h-18 w-18 rounded-lg bg-neutral-100"
                  />
                  {/* <Svg src={`/logo/${details.NetworkName}.svg`} className="mr-6 h-18 w-18 rounded-lg bg-neutral-100" /> */}
                  <div>
                    <p className="text-base font-bold text-neutral-800">{toCurrency(details.Price || 0)}</p>
                    <p className="text-sm font-normal text-neutral-500">{details.ProductName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-800 text-right">
                    {paymentInfo[0]?.ContactPhone ? paymentInfo[0]?.ContactPhone : paymentInfo[0]?.Email}
                  </p>
                  <p className="text-sm font-normal text-neutral-500">
                    {paymentInfo[0]?.ContactPhone ? 'Số điện thoại nhận' : 'Email nhận'}
                  </p>
                </div>
              </div>
            </div>
          ))}

        <div>
          {isSuccessPayment && (
            <div className="mt-4 flex justify-between">
              <p className="text-sm font-normal text-neutral-500">Mã đơn hàng</p>
              <p className="text-base font-bold text-neutral-800">{paymentInfo[0]?.Id}</p>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Phương thức thanh toán</p>
            <p className="text-base font-bold text-neutral-800">{paymentInfo[0]?.PaymentChannel}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Thời gian thanh toán</p>
            <p className="text-base font-bold text-neutral-800">{paymentInfo[0]?.CreateDate}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm font-normal text-neutral-500">Trạng thái</p>
            <p className="text-base font-bold text-neutral-800">{paymentInfo[0]?.StatusName}</p>
          </div>
        </div>
      </section>
      <div className="mx-32 my-8 h-[1px] bg-neutral-200"></div>
      {isSuccessPayment && (
        <section className="mt-4 flex flex-col items-center justify-center md:px-32  px-4">
          <p className="my-6 text-sm font-normal text-neutral-800 text-center">
            Đánh giá trải nghiệm dịch vụ để giúp iTel phát triển hơn nhé ♥️
          </p>
          <div className="w-full">
            <div className="mt-2 flex items-center justify-between px-8">
              {[1, 2, 3, 4, 5, 6, 7].map((_rating) => (
                <div
                  key={_rating}
                  className="h-8 w-8"
                  onClick={() => {
                    setRating(_rating);
                    setIsRating(true);
                  }}
                >
                  <Svg
                    src="/icons/bold/star.svg"
                    className={`w-full h-full cursor-pointer ${_rating <= rating ? ' text-yellow-500' : 'text-neutral-300'}`}
                  />
                </div>
              ))}
            </div>
            <div className="px-8 mx-auto mb-4 mt-8 flex w-full items-center justify-between ">
              <p className="text-xs font-medium text-neutral-800">Rất tệ</p>
              <p className="text-xs font-medium text-neutral-800">Bình thường</p>
              <p className="text-xs font-medium text-neutral-800">Rất hài lòng</p>
            </div>
          </div>
          <div className="w-full">
            <textarea
              className="w-full rounded-lg border border-neutral-200 bg-neutral-0 p-4 text-sm font-medium text-neutral-800 outline-none"
              name="feedback"
              id="feedback-tbx"
              rows={4}
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="Nhập nội dung phản hồi (nếu có)"
            />
          </div>
        </section>
      )}
      <div className="mb-20 px-4 md:px-32">
        <div className="mt-5 flex w-full justify-between gap-4 ">
          <button
            onClick={() => {
              router.push(Routers.HOME);
            }}
            className="w-1/2 rounded-full border border-primary bg-neutral-0 py-4 text-base font-bold text-primary"
          >
            Về trang chủ
          </button>
          <button onClick={() => handlerBuyMore()} className="w-1/2 rounded-full bg-primary py-4 text-base font-bold text-neutral-0">
            {!isRating ? 'Mua thêm' : 'Đánh giá'}
          </button>
        </div>
        {!isSuccessPayment && <p className="mt-8 text-center text-base font-bold text-neutral-800">Liên hệ hỗ trợ</p>}
      </div>
    </div>
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
