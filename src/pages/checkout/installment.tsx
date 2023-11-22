import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import { toggleSelectionItems } from '@/components/modal/selection/modal-selection-list-full';
import FieldDeliveryOption from '@/components/pages/checkout/field-delivery-option';
import CheckoutRowItem from '@/components/pages/checkout/row-item';
import SectionCheckoutPolicy from '@/components/pages/checkout/section-policy';
import SectionProduct from '@/components/pages/checkout/section-product';
import {
  CheckoutType,
  EMAIL_NAME,
  FULL_NAME,
  IDENTITY_ID_NAME,
  PHONE_NAME
} from '@/constants/checkout.constants';

import { useGlobalContext } from '@/context/global';
import Routers from '@/routes/routers';
import { useAppSelector } from '@/store/hooks';
import { Checkout, Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { withMobile } from '@/utilities/function';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import PriceSummary from '@/components/cart/price-summary';
import DebugUI from '@/components/common/debug';
import { showModalBanner } from '@/components/modal/modal-adventise';
import FormDeliveryInformation from '@/components/pages/checkout/form-delivery-information';
import Section from '@/components/pages/checkout/section';
import InstallmentService from '@/services/installmentService';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

type Props = {};
const fields = [
  { name: FULL_NAME, placeholder: 'Nhập họ và tên', label: 'Họ và tên', required: true, defaultValue: 'Phạm Thanh' },
  { name: PHONE_NAME, placeholder: 'Nhập số điện thoại', label: 'Số điện thoại', required: true, defaultValue: '0987654321' },
  { name: IDENTITY_ID_NAME, placeholder: 'Nhập số CMND/CCCD', label: 'CMND/CCCD', required: true, defaultValue: '1234567890' },
  { name: EMAIL_NAME, placeholder: 'Nhập email', label: 'Email', defaultValue: 'example@example.com' }
];
const banks = [
  {
    id: 1,
    full_name: 'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam',
    short_name: 'BIDV',
    name: 'Ngân hàng BIDV',
    img: '/logo/bank/BIDV.png',
    rate: [0, 0, 5.37, 10.65]
  },
  {
    id: 2,
    full_name: 'Ngân hàng Quân đội',
    short_name: 'MBBank',
    name: 'Ngân hàng MBBank',
    img: '/logo/bank/MBBank.png',
    rate: [1, 3, 5.37, 7]
  },
  {
    id: 3,
    full_name: 'Ngân hàng thương mại cổ phần Kỹ Thương Việt Nam',
    short_name: 'Techcombank',
    name: 'Ngân hàng Techcombank',
    img: '/logo/bank/Techcombank.png',
    rate: [2, 4, 6, 8]
  },
  {
    id: 4,
    full_name: 'Ngân hàng Thương mại Cổ phần Tiên Phong',
    short_name: 'TPBank',
    name: 'Ngân hàng TPBank',
    img: '/logo/bank/TPBank.png',
    rate: [3, 5, 7, 9]
  },
  {
    id: 5,
    full_name: 'Ngân hàng Quốc Tế VIB',
    short_name: 'VIB',
    name: 'Ngân hàng VIB',
    img: '/logo/bank/VIB.png',
    rate: [2, 4, 8, 16]
  }
];

const banksDumbed = Array.from({ length: 20 }).map((_, idx) => ({ ...banks[idx % banks.length], id: idx + 1 }));

function getPriceFromMerchandise(data: { discount_price?: number | null; price: number }) {
  return data.discount_price ?? data.price;
}
function isItemValid(data: any): data is Checkout.InstallmentItem {
  if (!data) return false;
  return [CheckoutType.Card, CheckoutType.Profile].includes(data.type);
}
const InstallmentPage: NextPage<Props> = ({ router }) => {
  const data = useState(useAppSelector((state) => state.cart.checkoutData))[0];

  const [statusDemo, setStatusDemo] = useState<'success' | 'pending' | 'failed'>('success');
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const [banks, setBanks] = useState<installmentModel.Bank[]>([]);
  const [recurringInfo, setRecurringInfo] = useState<installmentModel.RecurringInfo>({});
  const { user, status, reloadBalance } = useGlobalContext();
  const defaultAddress = useMemo(() => {
    if (user) {
      const address = user.address.find((add) => add.id === user.default_address_id) || user.address[0];
      return address;
    }
    return undefined;
  }, [user]);

  const methods = useForm<installmentModel.paramInfo>({
    mode: 'onChange'
  });

  const AWARED = 240_000;

  const isValid = isItemValid(data);
  const [issuerCode, scheme] = useWatch({
    name: ['ispInfo.issuerCode', 'ispInfo.scheme'],
    control: methods.control
  });
  const Card = useMemo(() => {
    setRecurringInfo({});
    const bank = banks.find((item) => item.issuerCode == issuerCode);
    return bank?.schemes;
  }, [banks, issuerCode]);

  const listPayment: installmentModel.RecurringInfo[] = useMemo(() => {
    const bank = banks.find((item) => item.issuerCode == issuerCode);
    const list = bank?.schemes!.find((item) => item.scheme == scheme);
    return list?.recurringInfo || [];
  }, [banks, issuerCode, scheme]);
  const total = useMemo(() => {
    let _total = 0;
    if (isItemValid(data)) {
      _total += data.products.reduce(
        (total, { price, quantity, PackPrice }) => (total += (price || 0) * (quantity || 0) + (PackPrice || 0)),
        0
      );
    }
    return _total;
  }, [data]);

  const handleSelectBanks = withMobile(() => {
    toggleSelectionItems<installmentModel.Bank>({
      options: banks,
      title: 'Chọn ngân hàng trả góp',
      renderContent({ option, selected }) {
        return (
          <div className="flex-1 flex items-center">
            <div className="flex-1">{option.issuerCode}</div>
            <div>
              <img className="h-10" src={option.logoUrl} alt={option.issuerCode} />
            </div>
          </div>
        );
      }
    }).then((d) => {
      methods.setValue('ispInfo.issuerCode', d?.issuerCode);
    });
  });
  const handleSelectCards = withMobile(() => {
    toggleSelectionItems<installmentModel.Scheme>({
      options: Card,
      title: 'Chọn loại thẻ trả góp',
      renderContent({ option, selected }) {
        return (
          <div className="flex-1 flex items-center">
            <div className="flex-1">{option.scheme}</div>
            <div>
              <img className="h-10" src={option.logoUrl} alt={option.scheme} />
            </div>
          </div>
        );
      }
    }).then((d) => {
      methods.setValue('ispInfo.scheme', d?.scheme);
    });
  });

  const handleSubmit = async (values: installmentModel.paramInfo) => {};

  useEffect(() => {
    if (!data) router.replace(Routers.NOT_FOUND);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const isShowed = useRef(false);

  useEffect(() => {
    data && !isShowed.current && data.type === CheckoutType.Profile && showModalBanner();
    isShowed.current = true;
    getBanks();
  }, [data]);

  const getBanks = async () => {
    try {
      const res = await InstallmentService.getBanks(total.toString());
      if (res.code == 200) {
        setBanks(res.result);
      }
    } catch (error) {}
  };
  if (!isValid) return null;

  const title = data.type === CheckoutType.Card ? 'Trả góp qua thẻ tín dụng' : 'Trả góp qua TPBank';
  const infoTitle = data.type === CheckoutType.Card ? 'Thông tin người trả góp' : 'Thông tin người vay';
  const isLoggedIn = status === 'authenticated';

  const convertSelectOption = (variant: cartModel.variantSelect[] | string) => {
    if (_.isEmpty(variant)) return;
    if (typeof variant == 'string') {
      const data: cartModel.variantSelect[] = JSON.parse(variant);
      return _.isArray(data) ? data.map((item) => item.selected?.name).join(', ') : '';
    }

    return variant.map((item) => item.selected?.name).join(', ');
  };

  const getImage = (images: installmentModel.Image[]): string => {
    return images[0].image_url || images[0].src || '';
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <Head>
        <title>Itel - Trả góp</title>
      </Head>
      <HeaderWebDefault title={title} withMenu withSearch />
      <div className="max-md:hidden container mt-8 xl:mt-10">
        <h1 className="font-itel text-h3 font-bold">{title}</h1>
      </div>
      <FormProvider {...methods}>
        {isValid ? (
          <form className="container max-md:px-0" onSubmit={methods.handleSubmit(handleSubmit, console.log)}>
            <div className="md:mt-6 flex w-full flex-col gap-x-6 xl:flex-row">
              <div className="flex-1">
                <SectionProduct title="Sản phẩm" totalItem={1}>
                  {data.products.length
                    ? data.products.map((item) => (
                        <div className="pt-2 md:pt-4" key={item.id}>
                          {/* Parent row */}
                          <CheckoutRowItem
                            isRoot
                            title={item.product_name ?? item.Phone}
                            desc={convertSelectOption(item.variants)}
                            price={item.base_price || 0}
                            discountPrice={item.price ?? item.PackPrice}
                            img={item.images ? getImage(item.images) : item.image_url}
                            subDesc={
                              <span>
                                Số lượng: <b className="text-base-content">{item.quantity || 1}</b>
                              </span>
                            }
                          />
                          {/* child row */}
                          {/* {item.dataCart.gift ? (
                            <div className="md:ml-8 space-y-3 md:space-y-4 py-3 md:py-4">
                              <div className="space-y-3 md:space-y-4 pl-8 md:pl-0">
                                {item.dataCart.gift.map((gift) => (
                                  <CheckoutRowItem
                                    key={gift.id}
                                    img={'/icons/Sim.png'}
                                    price={gift.price || 0}
                                    discountPrice={0}
                                    title={gift.productId}
                                    desc="Sim vật lý,gói MAY"
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-3 md:h-4" />
                          )} */}
                        </div>
                      ))
                    : null}
                </SectionProduct>

                {data.type === CheckoutType.Card ? (
                  <>
                    <Section title="Chọn ngân hàng trả góp">
                      <div className="py-6 max-md:hidden grid grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4">
                        {banks.map((bank) => {
                          return (
                            <div key={bank.issuerCode}>
                              <label>
                                <input
                                  type="radio"
                                  hidden
                                  className="peer"
                                  {...methods.register('ispInfo.issuerCode')}
                                  value={bank.issuerCode}
                                />
                                <div className="center-by-grid py-3 peer-checked:border-red-500 border rounded-xl border-neutral-200">
                                  <img className="h-10" src={bank.logoUrl} alt={bank.issuerCode} />
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <div className="md:hidden mobile-container">
                        <button type="button" className="flex w-full text-left py-4" onClick={handleSelectBanks}>
                          <div className="flex items-center w-full">
                            {/* {bankSelected ? (
                              <>
                                <span className="flex-1">{bankSelected.name}</span>
                                <div>
                                  <img className="h-10" src={bankSelected.img} alt={bankSelected.name} />
                                </div>
                              </>
                            ) : (
                              <p className="flex-1">Chọn ngân hàng</p>
                            )} */}
                            <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
                          </div>
                        </button>
                      </div>
                    </Section>
                    <Section title="Chọn Loại thẻ trả góp">
                      <div className="py-6 max-md:hidden grid grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4">
                        {Card &&
                          Card.map((card) => {
                            return (
                              <div key={card.scheme}>
                                <label>
                                  <input type="radio" hidden className="peer" {...methods.register('ispInfo.scheme')} value={card.scheme} />
                                  <div className="center-by-grid py-3 peer-checked:border-red-500 border rounded-xl border-neutral-200">
                                    <img className="h-10" src={card.logoUrl} alt={card.scheme} />
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="md:hidden mobile-container">
                        <button type="button" className="flex w-full text-left py-4" onClick={handleSelectCards}>
                          <div className="flex items-center w-full">
                            {/* {cardSelected ? (
                              <>
                                <span className="flex-1">{cardSelected.name}</span>
                                <div>
                                  <img className="h-10" src={cardSelected.img} alt={cardSelected.name} />
                                </div>
                              </>
                            ) : (
                              <p className="flex-1">Chọn loại thẻ</p>
                            )} */}
                            <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
                          </div>
                        </button>
                      </div>
                    </Section>
                    {issuerCode && scheme && (
                      <Section title="Chọn gói trả góp" desc={`Trả góp qua thẻ ${issuerCode}, ${scheme}`}>
                        <div className="max-md:hidden">
                          {recurringInfo.recurringNumberOfIsp ? (
                            <div className="">
                              <div className="flex items-center p-4 bg-neutral-50">
                                <div className="flex-1">
                                  Bạn đã chọn gói trả góp trong <b className="text-red-500">{recurringInfo.recurringNumberOfIsp} tháng</b>
                                </div>
                                <button className="btn btn-secondary btn-sm rounded-full" onClick={() => setRecurringInfo({})}>
                                  Chọn lại
                                </button>
                              </div>
                              <div className="flex gap-x-4 py-5 border-t border-neutral-200">
                                <div className="w-1/2 font-medium">Giá mua trả góp </div>
                                <div className="w-1/2">
                                  <b>{toCurrency(recurringInfo.amount! * 0.01)}</b>
                                </div>
                              </div>
                              <div className="flex gap-x-4 py-5 border-t border-neutral-200">
                                <div className="w-1/2 font-medium">Góp mỗi tháng</div>
                                <div className="w-1/2">
                                  <b>{toCurrency(recurringInfo.recurringAmount! * 0.01)}</b>
                                </div>
                              </div>
                              <div className="flex gap-x-4 py-5 border-t border-neutral-200">
                                <div className="w-1/2 font-medium">Tổng tiền trả góp </div>
                                <div className="w-1/2">
                                  <b>{toCurrency(recurringInfo.totalIspAmount! * 0.01)}</b>
                                </div>
                              </div>
                              <div className="flex gap-x-4 py-5 border-t border-neutral-200">
                                <div className="w-1/2 font-medium">Chênh lệch với mua thẳng </div>
                                <div className="w-1/2">
                                  <b>{toCurrency(recurringInfo.totalIspAmount! * 0.01 - recurringInfo.amount! * 0.01)}</b>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <table className="text-center w-full table-auto">
                              <thead>
                                <tr>
                                  <th className="py-6"></th>
                                  {listPayment.map(({ recurringNumberOfIsp }) => (
                                    <th key={recurringNumberOfIsp} className="even:bg-neutral-50 py-6">
                                      Gói {recurringNumberOfIsp} tháng
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border-t border-neutral-200 py-5">Giá mua trả góp</td>
                                  {listPayment.map(({ amount }) => {
                                    return (
                                      <td key={amount} className="border-t border-neutral-200 min-w-[135px] even:bg-neutral-50 py-5">
                                        {toCurrency(amount! * 0.01)}
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr>
                                  <td className="border-t border-neutral-200 py-5">Góp mỗi tháng</td>
                                  {listPayment.map(({ recurringAmount }) => {
                                    return (
                                      <td
                                        key={recurringAmount}
                                        className="border-t border-neutral-200 min-w-[135px] even:bg-neutral-50 py-5"
                                      >
                                        {toCurrency(recurringAmount! * 0.01)}
                                      </td>
                                    );
                                  })}
                                </tr>

                                <tr>
                                  <td className="border-t border-neutral-200 py-5">Tổng tiền trả góp</td>
                                  {listPayment.map(({ totalIspAmount }) => {
                                    return (
                                      <td
                                        key={totalIspAmount}
                                        className="border-t border-neutral-200 min-w-[135px] even:bg-neutral-50 py-5"
                                      >
                                        {toCurrency(totalIspAmount! * 0.01)}
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr>
                                  <td className="border-t border-neutral-200 py-5">Chênh lệch với mua thẳng</td>
                                  {listPayment.map(({ totalIspAmount, amount }) => {
                                    return (
                                      <td
                                        key={totalIspAmount}
                                        className="border-t border-neutral-200 min-w-[135px] even:bg-neutral-50 py-5"
                                      >
                                        {toCurrency(totalIspAmount! * 0.01 - amount! * 0.01)}
                                      </td>
                                    );
                                  })}
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td className="border-t border-neutral-200 py-5"></td>
                                  {listPayment.map((option, idx) => (
                                    <td key={idx} className="border-t border-neutral-200 min-w-[135px] even:bg-neutral-50 py-5">
                                      <button
                                        type="button"
                                        className="btn btn-primary rounded-full btn-sm"
                                        onClick={() => setRecurringInfo(option)}
                                      >
                                        Chọn gói
                                      </button>
                                    </td>
                                  ))}
                                </tr>
                              </tfoot>
                            </table>
                          )}
                        </div>
                        <div className="md:hidden mobile-container">
                          <button type="button" className="flex w-full text-left py-4">
                            <div className="flex items-center w-full font-medium">
                              {/* {installmentSelected ? (
                                <>
                                  <span className="flex-1">{installmentSelected.title}</span>
                                  <span>{toCurrency(installmentSelected.monthly_payment)}/tháng</span>
                                </>
                              ) : (
                                <p className="flex-1">Chọn gói trả góp</p>
                              )} */}
                              <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
                            </div>
                          </button>
                        </div>
                      </Section>
                    )}
                  </>
                ) : (
                  <Section title="Thông tin vay trả góp">
                    <div className="mobile-container grid grid-cols-2 md:grid-cols-3 md:gap-4 py-3 md:pt-4 md:pb-6">
                      {[
                        { title: 'Bên duyệt hồ sơ vay', value: 'TPBank' },
                        { title: 'Trả trước (50%)', value: toCurrency(total / 2) },
                        { title: 'Lãi suất', value: '5%' },
                        { title: 'Số tháng trả góp', value: '6 tháng' },
                        { title: 'Tiền trả góp mỗi tháng', value: toCurrency(Math.ceil((total * 1.05) / 12)) },
                        { title: 'Chênh lệch giá mua thẳng', value: toCurrency((total * 5) / 2 / 100) }
                      ].map(({ value, title }, idx) => {
                        return (
                          <div key={idx} className="md:px-4 py-2">
                            <div className="text-sm md:text-base text-subtle-content">{title}</div>
                            <div className="md:text-lg">
                              <b>{value}</b>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Section>
                )}
                <Section title={infoTitle}>
                  <div className="mobile-container py-4 md:py-6 grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
                    {fields.map(({ label, name, placeholder, required }) => {
                      return (
                        <label key={name}>
                          <div className="label-text font-medium" aria-required={required}>
                            {label}
                          </div>
                          <input
                            className="input input-bordered mt-2 w-full"
                            placeholder={placeholder}
                            {...methods.register(name as any)}
                          />
                          <ErrorMessage
                            name={name}
                            errors={methods.formState.errors}
                            render={({ message }) => <p className="mt-2 label-text-alt text-red-500 first-letter:capitalize">{message}</p>}
                          />
                        </label>
                      );
                    })}
                  </div>
                </Section>
                <Section title="Giao hàng đến" disableDivide>
                  <div className="pb-4 mobile-container">
                    <div className="flex flex-wrap -mx-3 gap-y-5 md:gap-y-6">
                      <FormDeliveryInformation className="w-full md:w-1/2 px-3" />
                      <div className="form-control w-full px-3">
                        <span className="label-text font-medium" aria-required>
                          Địa chỉ
                        </span>
                        <input className="input input-bordered mt-2" placeholder="Nhập địa chỉ" {...methods.register('cart_info.addr')} />
                      </div>
                    </div>
                    <div className="mt-3 md:mt-6">
                      <FieldDeliveryOption />
                    </div>
                  </div>
                </Section>
              </div>
              <div className="w-full flex-shrink-0 xl:w-[25.5rem]">
                {/* <div className="mt-2 md:mt-4 xl:mt-0 md:rounded-lg bg-base-100">
                  <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selectedVouchers={selectedVouchers} />
                </div> */}
                <div className="px-4 mt-2 md:mt-4 xl:mt-0 bg-neutral-0 md:rounded-lg">
                  <PriceSummary headeType="lg" totalPrice={total} awarded={AWARED} />
                </div>
                <div className="mt-6 md:mt-4 px-4 md:px-0 text-right">
                  <button
                    disabled={!methods.formState.isValid}
                    type="submit"
                    className="btn-primary btn btn-lg w-full md:w-[13.5rem] xl:w-full rounded-full"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
      </FormProvider>
      <SectionCheckoutPolicy />
      <DebugUI className="p-2 rounded-r-xl text-sm bg-neutral-0 shadow-itel">
        <div>
          <span>Trạng thái</span>
          <DebugUI.OptionsList
            options={
              data.type !== CheckoutType.Profile
                ? [
                    { value: 'success', name: 'Thành công' },
                    { value: 'failed', name: 'Thất bại' }
                  ]
                : [
                    { value: 'success', name: 'Thành công' },
                    { value: 'failed', name: 'Thất bại' },
                    { value: 'pending', name: 'Chưa hoàn thành' }
                  ]
            }
            onChange={(v) => setStatusDemo(v.value as any)}
            checkedValue={statusDemo}
          />
        </div>
        <div>
          <button
            className="btn btn-xs rounded-full"
            onClick={() => {
              fields.forEach((e) => {
                methods.setValue(e.name as any, e.defaultValue);
              });
            }}
          >
            Quick fill
          </button>
        </div>
      </DebugUI>
    </>
  );
};

InstallmentPage.getLayout = (page) => <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>;
export { getStaticProps } from './index';
export default InstallmentPage;
