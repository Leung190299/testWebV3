import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Svg from '@/components/icon/svg';
import ModalSupport from '@/components/modal/modal-support';
import { modal } from '@/libs/modal';

import CardResultItem from '@/components/card/card-result-item';
import { CheckoutType } from '@/constants/checkout.constants';
import Routers from '@/routes/routers';
import type { Model } from '@/types/model';
import { isInstallmentOrder, isNotInstallment } from '@/utilities/checkout';
import { toCurrency } from '@/utilities/currency';
import { useRouter } from 'next/router';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import SectionCode from './section-code';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import HeaderAppDefault from '@/components/header/header-app-default';
import ButtonAppStore from '@/components/button/ButtonAppStore';
import ButtonGooglePlay from '@/components/button/ButtonGooglePlay';
import { useGlobalContext } from '@/context/global';

interface IFormRatingService {
  content: string;
  point: number;
}

type StepResultProps = {
  orderData: Model.Order;
  message: string;
};

function getOrderTitleByType(order: Model.Order) {
  const isSuccess = order.status === 'success';
  if (!isSuccess) return 'Thanh toán thất bại!';
  switch (order.type) {
    case CheckoutType.Item:
    case CheckoutType.Card:
    case CheckoutType.Profile:
      return 'Đặt hàng thành công!';
    default:
      return 'Thanh toán thành công!';
  }
}
function getButtonTitle(order: Model.Order, isAuthenticated?: boolean) {
  const isSuccess = order.status === 'success' || order.status === 'pending';
  if (!isSuccess) return 'Thử lại';
  switch (order.type) {
    case CheckoutType.Card:
    case CheckoutType.Profile:
      return isAuthenticated ? 'Chi tiết đơn hàng' : 'Theo dõi đơn hàng';
    case CheckoutType.Item:
      return isAuthenticated ? 'Chi tiết đơn hàng' : 'Theo dõi đơn hàng';
    default:
      return 'Mua thêm';
  }
}

const StepResult = ({ orderData, message }: StepResultProps) => {
  const expanded = useBoolean(false);
  const router = useRouter();
  const methods = useForm<IFormRatingService>({ defaultValues: { point: 7 } });
  const point = useWatch({ name: 'point', control: methods.control });
  const { status } = useGlobalContext();

  const isSuccess = orderData.status === 'success';
  const isPending = orderData.status === 'pending';

  const handleRequestSupport = useCallback(() => {
    modal.open({
      render: <ModalSupport order={orderData} />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, [orderData]);
  const attributes = useMemo(() => {
    const attributes = [];
    if (isInstallmentOrder(orderData)) {
      attributes.push({
        name: 'Phương thức thanh toán',
        value:
          orderData.type === CheckoutType.Card
            ? `Trả góp ${orderData.data.installment_period} tháng qua thẻ ${orderData.data.bank}`
            : `Trả góp qua TPBank`
      });
      if (orderData.type === CheckoutType.Card) {
        attributes.push(
          {
            name: 'Trả góp mỗi tháng',
            value: toCurrency(orderData.data.monthly_payment)
          },
          {
            name: 'Tổng tiền trả góp',
            value: toCurrency(orderData.data.total_amount)
          }
        );
      }
    } else
      attributes.push({
        name: 'Phương thức thanh toán',
        value: orderData.method
      });

    attributes.push(
      { name: 'Thời gian thanh toán', value: dayjs(orderData.payment_time).format('HH:mm - DD/MM/YYYY') },
      { name: 'Trạng thái', value: isSuccess ? 'Thành công' : 'Thất bại' }
    );
    isSuccess ? attributes.unshift({ name: 'Mã đơn hàng', value: orderData.code }) : void 0;
    return attributes;
  }, [isSuccess, orderData]);

  function handleNavigate() {
    switch (orderData.type) {
      case CheckoutType.BuyCode:
      case CheckoutType.Recharge:
        if (orderData.status === 'failed') router.push({ pathname: Routers.CHECKOUT_CARD });
        else
          router.push({
            pathname: Routers.RECHARGE,
            query: { tab: orderData.type }
          });
        break;
      case CheckoutType.BuyData:
        if (orderData.status === 'failed') router.push({ pathname: Routers.CHECKOUT_PACK });
        else router.push({ pathname: Routers.DATA });
        break;
      case CheckoutType.Profile:
        if (orderData.status === 'failed') {
          router.push({ pathname: Routers.CHECKOUT_INSTALLMENT });
          break;
        }
      default:
        if (orderData.status === 'failed') router.push({ pathname: Routers.CHECKOUT });
        else
          status === 'authenticated'
            ? router.push({ pathname: Routers.PROFILE_DETAIL_ORDER, query: { id: orderData.id } })
            : router.push({ pathname: Routers.TRACKING_ORDER, query: { code: orderData.code } });
        break;
    }
  }
  return (
    <>
      <HeaderAppDefault title="Chi tiết giao dịch" onClose={handleNavigate} mode="close" />
      <section className="md:bg-neutral-0">
        <div className="container max-md:px-0">
          <div className="md:mx-auto md:max-w-[35rem] md:space-y-6 pb-20 md:pt-10">
            {/* Order status */}
            {!isPending && (
              <MobileSection className="text-center py-6 md:py-0">
                <div>
                  <Svg
                    src={isSuccess ? '/icons/others/payment-success.svg' : '/icons/others/payment-failed.svg'}
                    className="inline-block w-12 h-12 md:w-20 md:h-20"
                  />
                </div>
                <div className="mt-3 md:mt-6 space-y-1 md:space-y-2">
                  <h2 className="text-xl md:text-s-sm">
                    <b>{getOrderTitleByType(orderData)}</b>
                  </h2>
                  {isNotInstallment(orderData) && (
                    <div className={clsx('text-2xl md:text-s-md', isSuccess ? 'text-green-500' : 'text-red-500')}>
                      <b>{toCurrency(orderData.transaction_price)}</b>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-sm text-subtle-content" dangerouslySetInnerHTML={{ __html: message }} />
                </div>
              </MobileSection>
            )}

            {isPending && orderData.type === CheckoutType.Profile && (
              <MobileSection className="py-6 md:py-0 text-center">
                <h2 className="text-lg md:text-s-sm">
                  <b>Sử dụng ứng dụng TPBank 4CUST để hoàn tất quy trình vay</b>
                </h2>
                <p className="mt-3 md:mt-4 text-sm text-subtle-content">
                  Yêu cầu vay đã được gửi đến TPBank. Bạn vui lòng sử dụng ứng dụng
                  <b className="text-base-content"> TPBank 4CUST</b> để tiếp tục thực hiện quy trình giải ngân. Thông tin đăng nhập sẽ được
                  gửi qua tin nhắn số điện thoại <b className="text-base-content">087xxxxxxx</b>.
                </p>
                <div className="max-md:hidden mt-6">
                  <div className="text-center">
                    <img
                      src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1687061487/itel/images/QR_Code_vresm5.png"
                      alt="qr code"
                      width={120}
                      height={120}
                      className="mx-auto"
                    />
                  </div>
                  <p className="mt-4 font-medium text-sm md:text-base">Quét mã QR để tải App TPBank 4CUST</p>
                </div>
                <div className="md:hidden text-sm mt-6">
                  <p>Tải App TPBank 4CUST trên</p>
                  <div className="flex gap-x-2 justify-center mt-3">
                    <ButtonAppStore className="btn h-10 border-none bg-transparent p-0 text-neutral-0" />
                    <ButtonGooglePlay className="btn h-10 border-none bg-transparent p-0 text-neutral-0" />
                  </div>
                  <p className="mt-4">
                    Nếu đã có ứng dụng TPBank 4CUST.
                    <br />
                    Bạn có thể{' '}
                    <Link href="https://www.youtube.com/watch?v=yu95Q4Rc3bE" target="_blank">
                      <b>Mở ứng dụng ngay </b>
                    </Link>
                  </p>
                  <button className="btn btn-primary rounded-full mt-3">Mở ứng dụng TPBank 4CUST</button>
                </div>
              </MobileSection>
            )}
            {/* Order return */}
            <MobileSection withoutOffset className="px-0">
              {orderData.type === CheckoutType.BuyCode ? (
                <div className="md:rounded-lg border-t md:border border-neutral-200 p-4">
                  <SectionCode data={orderData} />
                </div>
              ) : orderData.type === CheckoutType.Recharge ? (
                <div className="md:rounded-lg border-t md:border border-neutral-200 p-4">
                  <CardResultItem
                    image={orderData.data.product.image}
                    title={orderData.data.product.name}
                    desc="Nạp tiền điện thoại"
                    secondaryTitle={formatPhoneNumber(orderData.data.receiver)}
                    secondaryDesc="Số điện thoại nhận"
                  />
                </div>
              ) : orderData.type === CheckoutType.BuyData ? (
                <div className="md:rounded-lg border-t md:border border-neutral-200 p-4">
                  <CardResultItem
                    image={orderData.data.product.image}
                    title={orderData.data.product.name}
                    desc="Gói cước tháng"
                    secondaryTitle={formatPhoneNumber(orderData.data.receiver)}
                    secondaryDesc="Số điện thoại nhận"
                  />
                </div>
              ) : orderData.type === CheckoutType.Profile && orderData.status !== 'success' ? (
                <div className="md:rounded-lg border-t md:border border-neutral-200 p-4 space-y-4">
                  {orderData.data.merchanise
                    ? (expanded.value ? orderData.data.merchanise : [orderData.data.merchanise[0]]).map((mer) => (
                        <div key={mer.id}>
                          <CardResultItem
                            imageType="cover"
                            image={mer.thumbnail}
                            title={mer.name}
                            desc={mer.title}
                            secondaryTitle="Yêu cầu khoản vay"
                            secondaryDesc={`${new Date(orderData.created_at).toLocaleTimeString()} - ${new Date(
                              orderData.created_at
                            ).toLocaleDateString()}`}
                            failed
                          />
                        </div>
                      ))
                    : null}
                  {orderData.data.merchanise.length > 1 && (
                    <div className="text-sm">
                      <button
                        className="border-t border-neutral-200 pt-3 w-full flex items-center justify-center gap-2 font-medium"
                        onClick={expanded.toggle}
                      >
                        <span>{expanded.value ? 'Thu gọn' : `Xem thêm ${orderData.data.merchanise.length - 1} sản phẩm`}</span>
                        <Svg
                          src="/icons/line/chevron-down.svg"
                          className={clsx('w-4 h-4 md:w-6 md:h-6', expanded.value ? 'rotate-180' : undefined)}
                        />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <hr className="border-neutral-200" />
              )}
            </MobileSection>
            {/* Order infomation */}
            {!isPending && (
              <MobileSection className="py-4 text-sm md:py-0">
                <table className="w-full">
                  <tbody>
                    {attributes.map(({ name, value }) => (
                      <tr key={name}>
                        <td className="py-2 text-subtle-content">{name}</td>
                        <td className="py-2 md:text-base text-right font-medium md:font-bold">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MobileSection>
            )}
            <hr className="border-neutral-200" />
            {/* Rating service */}
            {isSuccess || isPending ? (
              <MobileSection className="py-4 md:py-0">
                <div className="flex flex-col space-y-4 text-center mt-2 md:mt-0">
                  <p className="mx-auto text-sm">Đánh giá trải nghiệm dịch vụ để giúp iTel phát triển hơn nhé ♥️</p>
                  <div className="w-full md:w-auto md:mx-auto">
                    <div className="flex justify-between">
                      {[1, 2, 3, 4, 5, 6, 7].map((value, i) => (
                        <label key={value} className="block cursor-pointer whitespace-nowrap p-1 text-center text-xs font-medium md:p-4">
                          <input type="radio" className="sr-only" value={value} {...methods.register('point')} />
                          <Svg
                            className={clsx(Number(point) < value ? 'text-neutral-100' : 'text-yellow-500', 'inline')}
                            src="/icons/bold/star.svg"
                            width={32}
                            height={32}
                          />
                        </label>
                      ))}
                    </div>
                    <div className="mt-2 flex text-center text-xs md:text-sm">
                      {['Rất khó khăn', 'Bình thường', 'Rất dễ dàng'].map((v) => {
                        return (
                          <span key={v} className="flex-1 first:text-left last:text-right">
                            {v}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <textarea
                    className="input-bordered input h-24 resize-none text-sm"
                    placeholder="Nhập nội dung phản hồi (nếu có)"
                    {...methods.register('content')}
                  />
                </div>
              </MobileSection>
            ) : null}
            <div className={clsx(isPending || !isSuccess ? 'h-20' : '', 'md:h-auto')} />
            {/* CTA */}
            <div className="px-4 md:px-0 fixed bottom-0 md:static left-0 w-full bg-neutral-0 md:bg-transparent py-2 md:py-0">
              <div className="flex gap-4">
                <Link href={Routers.HOME} className="btn-secondary btn btn-lg w-full rounded-full">
                  Về trang chủ
                </Link>
                <button onClick={handleNavigate} type="button" className="btn-primary btn btn-lg w-full rounded-full">
                  {getButtonTitle(orderData, status === 'authenticated')}
                </button>
              </div>
              {!isSuccess && (
                <button type="button" onClick={handleRequestSupport} className="btn-ghost btn btn-lg mt-4 w-full rounded-full">
                  Yêu cầu hỗ trợ
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const MobileSection = ({ className, withoutOffset, ...props }: React.HTMLAttributes<HTMLDivElement> & { withoutOffset?: boolean }) => {
  return (
    <div
      className={clsx(withoutOffset ? undefined : 'mt-2 md:mt-0', 'bg-neutral-0 md:bg-transparent container md:px-0', className)}
      {...props}
    />
  );
};

export default StepResult;
