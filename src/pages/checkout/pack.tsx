import HeaderWebDefault from '@/components/header/header-web-default';
import LayoutDefault from '@/components/layout/layout-default';
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

import ButtonLoading from '@/components/button/button-loading';
import PriceSummary from '@/components/cart/price-summary';
import { useDataModal } from '@/components/pages/pack-data/hooks';
import Routers from '@/routes/routers';
import dataService from '@/services/dataService';
import { toCurrency } from '@/utilities/currency';
import { NextPage } from 'next';

type Props = {};

const VALID_TYPE = [CheckoutType.BuyCode, CheckoutType.Recharge, CheckoutType.BuyData];

function isValidData(data: any): data is Checkout.DataPack {
  return VALID_TYPE.includes(data?.type);
}

const CheckoutPackPage: NextPage<Props> = ({ router }) => {
  const { user, reloadBalance } = useGlobalContext();
  const data = useState(useAppSelector((state) => state.cart.checkoutData))[0];
  const isSuccess = useBoolean(true);
  const [isload, setIsLoad] = useState<boolean>(false);
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const isValid = isValidData(data);
  const methods = useForm<IForm.CheckoutRecharge>({
    defaultValues: {
      paymentMethod: 'PHONE',
      phone: '',
      email: ''
    }
  });
  const { showModalOTP, registerPack } = useDataModal();
  const AWARED = 0; // 240_000;

  const paymentOptions = [
    {
      id: 'PHONE',
      name: 'Thanh toán tài khoản chính',
      salePrice: 0,
      logoPath: '/icons/payment/cod.svg',
      isActive: true
    }
    // {
    //   id: 'VNPAY',
    //   name: 'Thanh toán với VNPay',
    //   salePrice: 200000,
    //   logoPath: '/icons/payment/vnpay.svg',
    //   isActive: true
    // },
    // {
    //   id: 'ZALOPAY',
    //   name: 'Thanh toán với ZaloPay',
    //   salePrice: 200000,
    //   logoPath: '/icons/payment/zalo.svg',
    //   isActive: true
    // },
    // {
    //   id: 'momo',
    //   name: 'Ví Momo',
    //   salePrice: 200000,
    //   logoPath: '/icons/payment/momo.svg'
    // },
    // {
    //   id: 'bank',
    //   name: 'Chuyển khoản ngân hàng',
    //   salePrice: 200000,
    //   logoPath: '/icons/payment/transfer.svg'
    // }
  ];

  const total = useMemo(() => {
    if (!data) return 0;
    let total = 0;
    if (isValidData(data)) {
      total += data.discount_price ?? data.price;
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
  const handleSubmit = async (values: { paymentMethod: string }) => {
    const isValid = isValidData(data);
    if (isValid && values.paymentMethod == 'PHONE') {
      showModalOTP({
        phone: data.phone!,
        resend: () => dataService.getOTP(data.phone!),
        verify: function (otp: string) {
          registerPack({ phone: data.phone!, pack: data.name, otp });
          return true;
        }
      });
    }
  };
  useEffect(() => {
    if (!isValid) {
      router.push(Routers.DATA);
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
                  <SectionHeader title={'Thông tin gói cước'} />
                  <hr className="max-md:hidden border-neutral-200" />
                  <DataPackItem data={data} />
                </section>

                <section className="container mt-2 md:rounded-lg bg-neutral-0 md:px-6 xl:px-8 md:mt-4">
                  <SectionPaymentMethod
                    includeWallet={data.type === CheckoutType.BuyData}
                    paymentOptions={paymentOptions}
                    totalPrice={totalFinal}
                    selectedId={methods.getValues('paymentMethod')}
                    inputProps={methods.register(PAYMENT_METHOD_NAME)}
                  />
                </section>
              </div>
              <div className="hidden md:block w-full flex-shrink-0 xl:w-[25.5rem]">
                <div className="mt-2 md:mt-4 xl:mt-0 md:rounded-lg bg-base-100">
                  {/* <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selectedVouchers={selectedVouchers} /> */}
                </div>
                <div className="px-4 mt-2 md:mt-4 bg-neutral-0 md:rounded-lg">
                  <PriceSummary totalPrice={total} awarded={AWARED} />
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
                <div className="">
                  <p className="text-sm ">Tổng tiền</p>
                  <p className="font-bold">{toCurrency(total)}</p>
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
CheckoutPackPage.getLayout = (page) => <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>;
export { getStaticProps } from './index';
export default CheckoutPackPage;
