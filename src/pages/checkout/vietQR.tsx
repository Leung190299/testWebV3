import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import CartService from '@/services/cartService';
import { toCurrency } from '@/utilities/currency';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {};
const VietQR: NextPage<Props> = () => {
  const routers = useRouter();
  const { orderID } = routers.query;
  const [infoPayment, setInfoPayment] = useState<cartModel.ResultPayment>({});
  useEffect(() => {
    if (orderID) {
      const orderIDConver = JSON.parse(orderID as string);
      CartService.payOrder({
        paymentChannel: 'VIETQR',
        orderIds: orderIDConver
      }).then((res) => {
        if (res.code == 200) {
          setInfoPayment(res.result);
        }
      });
    }
  }, [orderID]);

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Content copied to clipboard', { position: 'bottom-center' });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const checkPayment = () => {
    return routers.push({
      pathname: '/payment/result',
      query: {
        paymentId: infoPayment.paymentId
      }
    });
  };
  return (
    <section className="py-10">
      <div className="container">
        <div className="bg-neutral-0 p-4 rounded-[20px]">
          <h1 className="text-lg text-neutral-700 font-bold ml-5">VietQR</h1>
          <div className=" flex flex-col md:flex-row my-4 border border-primary rounded-xl p-4 gap-8">
            <div className="flex flex-col items-center justify-between  md:max-w-[30%]">
              <h2 className="text-center">
                <span className="font-bold"> Cách 1: </span>
                Chuyển khoản bằng mã QR Mở App Ngân Hàng Quét QRCode
              </h2>
              <div className="max-w-[195px]">
                <img src={infoPayment.qrUrl || ''} alt="maQR" />
              </div>
              <a className="flex mt-auto underline text-[#72A0B3]" href={infoPayment.qrUrl || ''} download={true}>
                Tải xuống
              </a>
            </div>
            <div className=" border-primary border-[0.1px] border-dashed my-4 " />
            <div>
              <h2>
                <span className="font-bold"> Cách 2: </span>
                Chuyển khoản THỦ CÔNG theo thông tin
              </h2>
              <div className="my-8">
                <div className="flex my-2">
                  <p className="w-[30%]">Ngân hàng:</p>
                  <p className="flex-1 font-bold">{infoPayment.bankName}</p>
                </div>
                <div className="flex my-2">
                  <p className="w-[30%]">Chủ tài khoản:</p>
                  <p className="flex-1 font-bold">{infoPayment.bankAccountName}</p>
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[30%]">Số tài khoản:</p>
                  <p className="flex-1 font-bold">{infoPayment.bankAccountNo}</p>
                  <button
                    className="btn btn-primary btn-outline h-auto py-1 rounded-full"
                    onClick={() => copyContent(infoPayment.bankAccountNo!)}
                  >
                    <Svg src="/icons/copy.svg" width={20} height={20} className=" md:mr-2" />
                    <span className="hidden md:block">Sao chép</span>
                  </button>
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[30%]">Số tiền:</p>
                  <p className="flex-1 font-bold">{toCurrency(Number(infoPayment.amount) || 0)}</p>
                  <button className="btn btn-primary btn-outline h-auto py-1 rounded-full" onClick={() => copyContent(infoPayment.amount!)}>
                    <Svg src="/icons/copy.svg" width={20} height={20} className=" md:mr-2" />
                    <span className="hidden md:block">Sao chép</span>
                  </button>
                </div>
                <div className="flex items-center my-2">
                  <p className="w-[30%]">Nội dung:</p>
                  <p className="flex-1 font-bold text-primary">{infoPayment.info}</p>
                  <button className="btn btn-primary btn-outline h-auto py-1 rounded-full" onClick={() => copyContent(infoPayment.info!)}>
                    <Svg src="/icons/copy.svg" width={20} height={20} className=" md:mr-2" />
                    <span className="hidden md:block">Sao chép</span>
                  </button>
                </div>
              </div>
              <p className="my-8">
                Lưu ý: Nhập chính xác nội dung <span className="text-primary font-bold">{infoPayment.info}</span> khi chuyển khoản. Bạn sẽ
                nhận được email (hoặc SMS) xác nhận khi giao dịch thành công
              </p>
            </div>
          </div>
          <button className="btn btn-primary rounded-full ml-auto flex my-6" onClick={() => checkPayment()}>
            Tôi đã thanh toán
          </button>
        </div>
      </div>
    </section>
  );
};
VietQR.getLayout = (page) => <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>;
export default VietQR;
