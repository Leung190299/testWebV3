import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import RechargeItem from '@/components/pages/checkout/recharge-item';
import SectionHeader from '@/components/pages/checkout/section-header';
import { CheckoutType, PAYMENT_METHOD_NAME } from '@/constants/checkout.constants';
import { useAppSelector } from '@/store/hooks';
import { IForm } from '@/types/form';
import { Checkout, Model } from '@/types/model';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DataPackItem from '@/components/pages/checkout/data-pack-item';
import SectionPaymentMethod from '@/components/pages/checkout/section-payment';
import SectionCheckoutPolicy from '@/components/pages/checkout/section-policy';
import { useGlobalContext } from '@/context/global';
import { logger } from '@/utilities/logger';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import Head from 'next/head';

import rechargeService from '@/services/rechargeService';
import { rechrageModel } from '@/types/recharge';

import ButtonLoading from '@/components/button/button-loading';
import PriceSummary from '@/components/cart/price-summary';
import Routers from '@/routes/routers';
import { toCurrency } from '@/utilities/currency';
import { ErrorMessage } from '@hookform/error-message';
import { NextPage } from 'next';

type Props = {};

const VALID_TYPE = [CheckoutType.BuyCode, CheckoutType.Recharge, CheckoutType.BuyData];

function isValidData(data: any): data is Checkout.DataPack | Checkout.Recharge {
  return VALID_TYPE.includes(data?.type);
}

const CheckoutCardPage: NextPage<Props> = ({ router }) => {
  const { user, reloadBalance } = useGlobalContext();
  const data = useState(useAppSelector((state) => state.cart.checkoutData))[0];
  const isSuccess = useBoolean(true);
  const [isload, setIsLoad] = useState<boolean>(false);
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const isValid = isValidData(data);
  const methods = useForm<IForm.CheckoutRecharge>({
    defaultValues: {
      paymentMethod: 'VNPAY',
      phone: isValid ? (data.type !== CheckoutType.BuyData ? data.receiver : '0987654321') : '',
      email: ''
    }
  });
  const AWARED = 0; // 240_000;

  const paymentOptions = [
    {
      id: 'VNPAY',
      name: 'Thanh toán với VNPay',
      salePrice: 200000,
      logoPath: '/icons/payment/vnpay.svg',
      isActive: true
    },
    {
      id: 'ZALOPAY',
      name: 'Thanh toán với ZaloPay',
      salePrice: 200000,
      logoPath: '/icons/payment/zalo.svg',
      isActive: true
    },
    {
      id: 'momo',
      name: 'Ví Momo',
      salePrice: 200000,
      logoPath: '/icons/payment/momo.svg'
    },
    {
      id: 'bank',
      name: 'Chuyển khoản ngân hàng',
      salePrice: 200000,
      logoPath: '/icons/payment/transfer.svg'
    }
  ];

  const total = useMemo(() => {
    if (!data) return 0;
    let total = 0;
    if (isValidData(data)) {
      const price = data.price * (data.type === 'code' ? data.quantity : 1);
      const discountPrice =
        typeof data.discount_price === 'number' ? data.discount_price * (data.type === 'code' ? data.quantity : 1) : undefined;

      total += discountPrice ?? price;
    }
    return total;
  }, [data]);

  const totalFinal = useMemo(() => {
    let totalFinal = total;
    totalFinal -= AWARED;
    totalFinal = selectedVouchers.reduce(
      (total, discount) =>
        (total -= discount.is_fix
          ? discount.discount_amount
          : Math.min(discount.discount_amount * total, discount.maximum_discount_amount)),
      totalFinal
    );

    return totalFinal;
  }, [selectedVouchers, total]);
  const handleSubmit = async (values: IForm.CheckoutRecharge) => {
    const isValid = isValidData(data);
    setIsLoad(true);
    if (isValid) {
      let payment: rechrageModel.payment = {
        Phone: data.type === 'recharge' ? data.receiver : '',
        Email: values.email,
        PaymentChannel: values.paymentMethod,
        ProductId: data.idProduct || '',
        Quantity: data.type == 'code' ? data.quantity : 1,
        Source: 'itel.vn'
      };

      const res = await rechargeService.payment(payment);
      if (res.code === 200) {
        let result = res.result;
        router.push(result.paymentUrl || '');
      }
    }
  };
  useEffect(() => {
    if (!isValid) {
      router.push(Routers.RECHARGE);
    }
  }, [isValid]);

  const title = 'Thanh toán';
  return (
    <>
      <HeaderWebDefault title={title} withMenu withSearch />
      <Head>
        <title>{title}</title>
      </Head>
      <div className="max-md:hidden container">
        <h1 className="font-itel text-h3 font-bold">{title}</h1>
      </div>
      <FormProvider {...methods}>
        {isValid ? (
          <form className="container max-md:px-0" onSubmit={methods.handleSubmit(handleSubmit, (e) => logger.log(e))}>
            <div className="md:mt-6 flex w-full flex-col gap-x-6 xl:flex-row">
              <div className="flex-1">
                <section className="mobile-container mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-0">
                  <SectionHeader title={data.type === CheckoutType.BuyData ? 'Thông tin gói cước' : 'Thông tin đơn hàng'} />
                  <hr className="max-md:hidden border-neutral-200" />
                  {data.type === CheckoutType.BuyData ? <DataPackItem data={data} /> : <RechargeItem data={data} />}
                </section>

                {data.type === 'code' && (
                  <section className="mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-4">
                    <div className="mobile-container">
                      <SectionHeader title="Thông tin nhận mã thẻ" desc="Bạn sẽ nhận được mã thẻ qua email của bạn." />
                    </div>
                    <hr className="border-neutral-200" />
                    <div className="mobile-container py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                      <div className="form-control">
                        <label>
                          <div className="label-text font-medium" aria-required>
                            Email
                          </div>
                          <input
                            type="email"
                            className="input input-bordered mt-2 w-full"
                            placeholder="Nhập số email"
                            {...methods.register('email', {
                              shouldUnregister: true,

                              pattern: {
                                value:
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Email không đúng định dạng'
                              },
                              required: 'Email không được bỏ trống'
                            })}
                          />
                        </label>
                        <ErrorMessage
                          name={'email'}
                          errors={methods.formState.errors}
                          render={({ message }) => (
                            <p className="flex items-center text-sm text-primary mt-2">
                              <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                              {message}
                            </p>
                          )}
                        />
                      </div>
                    </div>
                  </section>
                )}
                <section className="container mt-2 md:rounded-lg bg-neutral-0 md:px-6 xl:px-8 md:mt-4">
                  <SectionPaymentMethod
                    includeWallet={data.type === CheckoutType.BuyData}
                    paymentOptions={paymentOptions}
                    totalPrice={totalFinal}
                    inputProps={methods.register(PAYMENT_METHOD_NAME)}
                  />
                </section>
              </div>
              <div className="hidden md:block w-full flex-shrink-0 xl:w-[25.5rem]">
                <div className="mt-2 md:mt-4 xl:mt-0 md:rounded-lg bg-base-100">
                  {/* <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selectedVouchers={selectedVouchers} /> */}
                </div>
                <div className="px-4 mt-2 md:mt-0 bg-neutral-0 md:rounded-lg">
                  <PriceSummary totalPrice={total}  />
                </div>
                <div className="mt-6 md:mt-4 px-4 md:px-0">
                  <div className="space-y-3">
                    <ButtonLoading type="submit" className={`btn-primary btn btn-lg w-full rounded-full `} isLoading={isload}>
                      <p>Thanh toán </p>
                    </ButtonLoading>
                  </div>
                </div>
              </div>
              <div className="fixed md:hidden shadow-[0_-2px_60px_-15px_rgba(0,0,0,0.3)] bg-neutral-0 w-full bottom-0 left-0 p-4 md:p-0 flex justify-between ">
              <div className=''>
                <p className='text-sm '>Tổng tiền</p>
                <p className='font-bold'>{toCurrency(total)}</p>
              </div>
              <ButtonLoading type="submit" className={`btn-primary btn rounded-full `} isLoading={isload}>
                      <p>Thanh toán </p>
                    </ButtonLoading>
            </div>
            </div>
          </form>
        ) : null}
      </FormProvider>
      <SectionCheckoutPolicy />

      {/* <DebugUI>
        <div className="p-2 rounded-r-xl bg-neutral-0 shadow-itel">
          <div>
            <span>Trạng thái</span>
            <label className="flex">
              <input type="radio" name="statusDemo" checked={isSuccess.value} onChange={isSuccess.setTrue} />
              <span>Thành công</span>
            </label>
            <label className="flex">
              <input type="radio" name="statusDemo" checked={!isSuccess.value} onChange={isSuccess.setFalse} />
              <span>Thất bại</span>
            </label>
          </div>
        </div>
      </DebugUI> */}
    </>
  );
};
CheckoutCardPage.getLayout = (page) => <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>;
export { getStaticProps } from './index';
export default CheckoutCardPage;
