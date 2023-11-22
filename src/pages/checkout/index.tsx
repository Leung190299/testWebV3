import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { useTranslation } from '@/libs/i18n';
import { useAppSelector } from '@/store/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import StepCheckout from '@/components/pages/checkout/step-checkout';
import Routers from '@/routes/routers';
import Link from 'next/link';

import HeaderWebDefault from '@/components/header/header-web-default';
import LayoutDefault from '@/components/layout/layout-default';
import { CheckoutType } from '@/constants/checkout.constants';
import { clear } from '@/store/fees/feesSlice';
import { Checkout } from '@/types/model';
import { getValueLocal } from '@/utilities/localStore';
import { useDispatch } from 'react-redux';

type CartPageProps = {};

const VALID_TYPE = [CheckoutType.Item];

function isValidData(data: any): data is Checkout.ProductAndSim {
  return VALID_TYPE.includes(data?.type);
}

const CheckoutPage: NextPage<CartPageProps> = () => {
  const { t } = useTranslation('common');


  const dataCheckout = getValueLocal<Checkout.DataPack | Checkout.ProductAndSim | Checkout.Recharge | Checkout.InstallmentItem>(
    'dataCheckout'
  );
  const data = useState(useAppSelector((state) => state.cart.checkoutData))[0] || dataCheckout;
  const dispatch = useDispatch();
  const title = t('checkout');
  const isValid = isValidData(data);
  useEffect(() => {
    if ( isValid) {
      dispatch(clear());
    }
  }, [isValid]);

  return (
    <>
      <Head>
        <title>{`Itel - ${title}`}</title>
      </Head>
      <HeaderWebDefault title="Thanh toán" withMenu withSearch />
      {!data && (
        <div className="min-h-screen center-by-grid">
          <div className="text-center">
            <h1 className="text-h1 font-itel container font-bold">Bạn chưa chọn sản phẩm để thanh toán</h1>
            <div>
              <Link className="btn btn-primary btn-lg rounded-full w-32 mt-4" href={Routers.HOME}>
                Về
              </Link>
            </div>
          </div>
        </div>
      )}
      { isValid && <StepCheckout data={data}  />}
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation();
CheckoutPage.getLayout = (page) => {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>
      {/* <ChatBoxLazy /> */}
    </>
  );
};

export default CheckoutPage;
export { getStaticProps };
