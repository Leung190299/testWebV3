import VoucherSelector from '@/components/cart/voucher-selector';
import HeaderWebDefault from '@/components/header/header-web-default';
import LayoutDefault from '@/components/layout/layout-default';
import { useAppSelector } from '@/store/hooks';
import { Model } from '@/types/model';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SectionCheckoutPolicy from '@/components/pages/checkout/section-policy';
import Head from 'next/head';

import ButtonLoading from '@/components/button/button-loading';
import Svg from '@/components/icon/svg';
import SectionDeliveryInformation from '@/components/pages/checkout/section-delivery-infomation';
import SectionHeader from '@/components/pages/checkout/section-header';
import { CheckoutItemValidation } from '@/constants/validator.constants';
import UpdateInfoService from '@/services/UpdateInfoService';
import { getUpdateInfo, getVoucher } from '@/store/cart/selector';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import _ from 'lodash';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { showPopup } from '../update-info';

type Props = {};

export function isValidData(data: UpdateInfoModel.resultSim) {
  return !_.isEmpty(data);
}

const CheckoutUpdateInfo: NextPage<Props> = ({ router }) => {
  const [data] = useState<UpdateInfoModel.resultSim>(useAppSelector(getUpdateInfo));
  const voucher = useSelector(getVoucher);
  const [isload, setIsLoad] = useState<boolean>(false);
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const isValid = isValidData(data);

  const AWARED = 0; // 240_000;

  const total = useMemo(() => {
    if (!data) return 0;
    let total = 0;

    return total;
  }, [data]);

  const handleSubmit = async (values: cartModel.PaymentInfo) => {
    try {
      const _values: cartModel.PaymentInfo = {
        ...values,
        fullName: values.cart_info?.fullName,
        Phone: values.cart_info?.ContactPhone,
        TotalPrice: 0,
        ShipmentFee: 0,
        vnp_Bill_Mobile: values.cart_info?.ContactPhone,
        PromotionCode: voucher.PromotionCode,
        DiscountAmount:voucher.DiscountAmount,
        cart_info: {
          ...values.cart_info,
          CityId: typeof values.cart_info?.CityId != 'number' ? values.cart_info?.CityId?.id : 0,
          DistrictId: typeof values.cart_info?.DistrictId != 'number' ? values.cart_info?.DistrictId?.id : 0,
          WardId: typeof values.cart_info?.WardId != 'number' ? values.cart_info?.WardId?.id : 0,
          HamletId: typeof values.cart_info?.HamletId != 'number' ? values.cart_info?.HamletId?.id : 0,
          deliver_work_ship: null,
          _track: 'T_' + Math.random().toString(36).slice(2)
        },
        cart: [
          {
            productId: data.Phone,
            productType: 1
          }
        ],
        Source: 'itel.vn'
      };
      setIsLoad(true);
      const res = await UpdateInfoService.orderSim(_values);
      if (res.code == 200 && res.result) {
        const propsSuccess = {
          orderId: res.result,
          phone: _values.Phone || '',
          phoneBones: data.Phone || '',
          name: _values.fullName || '',
          email: _values.cart_info?.email || ''
        };
        showPopup({
          title: 'Chúc mừng Bạn đã sở hữu thêm một số TB iTel',
          mess: 'Bạn vui lòng kích hoạt SIM trong vòng 20 ngày kể từ ngày đặt hàng. Nếu quá thời gian trên, iTel sẽ tiến hàng thu hồi số thuê bao theo quy dịnh',
          children: <ContentSuccess {...propsSuccess} />,
          type: 'success'
        });
        return;
      }
      showPopup({
        title: 'Không thành công!',
        mess: res.message,
        type: 'error'
      });
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      showPopup({
        title: 'Không thành công!',
        mess: dataError.message,
        type: 'error'
      });
    } finally {
      setIsLoad(false);
    }
  };

  const methods = useForm<cartModel.PaymentInfo>({
    defaultValues: {},
    resolver: yupResolver(CheckoutItemValidation),
    // context: { status },
    mode: 'onChange'
  });

  const ContentSuccess = (props: { orderId: string; phone: string; phoneBones: string; name: string; email: string }) => {
    return (
      <div>
        <div className="flex justify-between p-4 border-b border-b-neutral-200">
          <p className="text-base">Mã đơn hàng</p>
          <p className="text-base text-primary">{props.orderId}</p>
        </div>
        <div className="flex justify-between p-4 border-b border-b-neutral-200">
          <p className="text-base">Số TB được hưởng ưu đãi</p>
          <p className="text-base text-primary">{props.phone}</p>
        </div>
        <div className="flex justify-between p-4 border-b border-b-neutral-200">
          <p className="text-base">Số TB đã chọn</p>
          <p className="text-base text-primary">{props.phoneBones}</p>
        </div>
        <div className="flex justify-between p-4 border-b border-b-neutral-200">
          <p className="text-base">Họ tên KH</p>
          <p className="text-base text-primary">{props.name}</p>
        </div>
        <div className="flex justify-between p-4 border-b border-b-neutral-200">
          <p className="text-base">Địa chỉ nhận hàng/ email</p>
          <p className="text-base text-primary">{props.email}</p>
        </div>

        <div className='mt-4'>
          <p className='text-center text-sm'>
            {`Bạn vui lòng kích hoạt SIM trong vòng 20 ngày kể từ ngày đặt hàng. Nếu quá thời gian trên, iTel sẽ tiến hàng thu hồi số thuê bao theo quy dịnh :((`}
          </p>
          <p className='text-center text-sm'>
            Mách nhỏ: Ngay khi vừa nhận sim, Bạn có thể tải <Link className='text-primary ' href={'#'}>App My iTel </Link> để kích hoạt sim và sử dụng nhé:
          </p>
        </div>
      </div>
    );
  };

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
      {isValid && (
        <FormProvider {...methods}>
          <form className="container max-md:px-0" onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className="md:mt-6 flex w-full flex-col gap-x-6 xl:flex-row">
              <div className="flex-1">
                <section className="mobile-container mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-0">
                  <div className="mobile-container">
                    <SectionHeader title="Thông tin đơn hàng" />
                  </div>
                  <div className="flex items-center py-4 border-t border-t-neutral-200">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="w-18 h-18 bg-neutral-100 rounded-xl p-1">
                        <img src="/icons/Sim.png" alt="Sim" />
                      </div>
                      <div>
                        <p className="font-bold">Số thuê bao đã chọn</p>
                        <p className="text-sm ">{formatPhoneNumber(data.Phone || '')}/ Sim vật lý</p>
                      </div>
                    </div>
                    <div className="px-12 hidden  md:block">
                      <Svg src="/icons/phoneCheck.svg" width={36} height={36} />
                    </div>
                  </div>
                </section>

                <input type={'hidden'} {...methods.register('cart_info')} />
                <SectionDeliveryInformation />
              </div>
              <div className="w-full flex-shrink-0 xl:w-[25.5rem]">
                <div className="mt-2 md:mt-4 xl:mt-0 md:rounded-lg bg-base-100">
                  <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selectedVouchers={selectedVouchers} />
                </div>
                <div className="px-4 mt-2 md:mt-4 bg-neutral-0 md:rounded-lg">
                  {/* <PriceSummary totalPrice={total} discounts={selectedVouchers} awarded={AWARED} /> */}
                </div>
                <div className="mt-6 md:mt-4 px-4 md:px-0">
                  <div className="space-y-3">
                    <ButtonLoading
                      type="submit"
                      disabled={!methods.formState.isValid}
                      className={`btn-primary btn btn-lg w-full rounded-full`}
                      isLoading={isload}
                    >
                      <p>Thanh toán </p>
                    </ButtonLoading>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
      <SectionCheckoutPolicy />
    </>
  );
};
CheckoutUpdateInfo.getLayout = (page) => <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>;
export { getStaticProps } from './index';
export default CheckoutUpdateInfo;
