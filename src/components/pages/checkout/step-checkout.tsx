import { useTranslation } from '@/libs/i18n';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import PriceSummary from '@/components/cart/price-summary';
import VoucherSelector from '@/components/cart/voucher-selector';

import { formatPhoneNumber } from '@/utilities/formatSimNumber';

import { Checkout, Model } from '@/types/model';
import CheckoutRowItem from './row-item';
import SectionDeliveryInformation from './section-delivery-infomation';
import SectionProduct from './section-product';

import { CheckoutType, SimSingle } from '@/constants/checkout.constants';

import ButtonLoading from '@/components/button/button-loading';
import { CheckoutItemValidation } from '@/constants/validator.constants';

import ModalVerifyOtp, { ModalVerifyProps } from '@/components/modal/modal-verify-otp';
import StepSim from '@/components/sim/step-sim';
import CartService from '@/services/cartService';
import { getFee, getMGT, getSims, getVoucher } from '@/store/cart/selector';
import { clearSimType } from '@/store/cart/simTypeSlice';
import { getValueLocal, saveLocal } from '@/utilities/localStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { modal } from '@pit-ui/modules/modal';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SectionPaymentMethod, { PaymentOption } from './section-payment';
import SectionCheckoutPolicy from './section-policy';

type typePayment = {
  id: string;
  name: string;
  logoPath: string;
  isActive: boolean;
};

type StepCheckoutProps = {
  data: Checkout.ProductAndSim;
};
const steps: string[] = ['Chọn SIM số', 'Chọn loại SIM <br> & Gói cước', ' Thanh toán'];
const ERROR_NULL = 'Hệ thống đang bảo trì. Bạn vui lòng quay lại sau nhé';
const showModalOPT = (data: ModalVerifyProps) => {
  return modal.open({
    render: <ModalVerifyOtp {...data} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone: (value) => {
      console.log(value);
    },
    onClose() {},
    onReject(err) {}
  });
};

const NamePayment = {
  COD: 'Thanh toán khi nhận hàng (COD)',
  MOMO: 'Thanh toán Ví Momo',
  VIETQR: 'Mã QR',
  VNPAY_INTCARD: 'Thẻ thanh toán quốc tế',
  VNPAY_VNBANK: 'Thẻ ATM (Có Internet Banking)',
  VNPAY_VNPAYQR: 'Thanh toán qua VNPay',
  ZALOPAY: 'Thanh toán Ví ZaloPay'
};
const ImagePayment = {
  COD: '/icons/payment/cod.svg',
  MOMO: '/icons/payment/momo.svg',
  VIETQR: '/icons/payment/atm.svg',
  VNPAY_INTCARD: '/icons/payment/visa.png',
  VNPAY_VNBANK: '/icons/payment/atm.svg',
  VNPAY_VNPAYQR: '/icons/payment/vnpay.svg',
  ZALOPAY: '/icons/payment/zalo.svg'
};
const NumberPayment = {
  COD:1,
  MOMO:2,
  VIETQR: 7,
  VNPAY_INTCARD: 6,
  VNPAY_VNBANK:5,
  VNPAY_VNPAYQR:3,
  ZALOPAY:4
}
const StepCheckout = ({ data }: StepCheckoutProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const title = t('checkout');
  const sims = data.type === CheckoutType.Item ? data.sims : [];
  const products = data.type === CheckoutType.Item ? data.products : [];
  const [listOder, setListOder] = useState<string[]>();
  const feesRedux = useSelector(getFee);
  const simsRedux = useSelector(getSims);
  const MGT = useSelector(getMGT);
  const [loadDataInfo, setLoadDataInfo] = useState<boolean>(true);
  const localCart_info = getValueLocal<cartModel.PaymentInfo>('cart_info');

  const methods = useForm<cartModel.PaymentInfo>({
    defaultValues: {},
    resolver: yupResolver(CheckoutItemValidation),
    // context: { status },
    mode: 'onChange'
  });
  useEffect(() => {
    getPayment();
  }, []);

  const handleInvalid = (error: any) => {
    console.log(error);
  };
  const voucher = useSelector(getVoucher);

  const fast = methods.watch('cart_info.IsFast');
  const singleEsim = methods.watch('cart_info.singleEsim');

  const ShipmentFee = useMemo(() => feesRedux.reduce((fee, item) => fee + item.discountedFee, 0), [feesRedux]);
  const feesBaseus = useMemo(() => feesRedux && feesRedux.find((fee) => fee.type == 'baseus'), [feesRedux]);
  const Payment = async (values: cartModel.PaymentInfo, OTP?: string) => {
    try {
      let idOder: number = 0;

      if (IsBaseus) {
        const param: cartModel.ParamBaseus = {
          order: {
            email: values.cart_info?.email,
            phone: values.cart_info?.ContactPhone,
            first_name: values.cart_info?.fullName,
            total_spent: total,
            fulfillment_status: 'notfulfilled',
            note: 'Đơn hàng từ iTel',
            line_items:
              data.products
                .filter((item) => item.dataCart.productType == 9)
                .map((item) => {
                  return {
                    quantity: item.dataCart.quantity,
                    variant_id: item.dataCart.variant == 'string' ? getVariantId(item.dataCart.variant!).id : item.dataCart.variant.id,
                    variant_title:
                      item.dataCart.variant == 'string' ? getVariantId(item.dataCart.variant!).title : item.dataCart.variant.title,
                    price: item.dataCart.price,
                    type: 'Khác'
                  };
                }) || [],
            shipping_address: {
              address1: `${values.cart_info?.addr},${
                typeof values.cart_info?.HamletId != 'number' ? values.cart_info?.HamletId?.text : ''
              }, ${typeof values.cart_info?.WardId != 'number' ? values.cart_info?.WardId?.text : ''}, ${
                typeof values.cart_info?.DistrictId != 'number' ? values.cart_info?.DistrictId?.text : ''
              }, ${typeof values.cart_info?.CityId != 'number' ? values.cart_info?.CityId?.text : ''}`,
              city: typeof values.cart_info?.CityId != 'number' ? values.cart_info?.CityId?.text : '',
              country: 'Vietnam',
              last_name: '',
              phone: values.cart_info?.ContactPhone,
              province: typeof values.cart_info?.CityId != 'number' ? values.cart_info?.CityId?.text : '',
              name: values.cart_info?.fullName,
              country_code: 'VN',
              default: true,
              district: typeof values.cart_info?.DistrictId != 'number' ? values.cart_info?.DistrictId?.text : '',
              ward: typeof values.cart_info?.WardId != 'number' ? values.cart_info?.WardId?.text : ''
            },
            shipping_lines: [
              {
                price: feesBaseus?.discountedFee
              }
            ]
          }
        };
        idOder = (await getRefIDBaseus(param)) || 0;
      }

      const _values: Omit<cartModel.PaymentInfo, 'eSim' | 'singleEsim'> = {
        ...values,

        fullName: values.cart_info?.fullName,
        TotalPrice: totalFinal,
        ShipmentFee: ShipmentFee,
        vnp_Bill_Mobile: values.cart_info?.ContactPhone,
        PromotionCode: voucher.PromotionCode,
        DiscountAmount: voucher.DiscountAmount,
        MGT: MGT,
        cart_info: {
          ...values.cart_info,
          OTP,
          ghtk_fee: ShipmentFee,
          CityId: typeof values.cart_info?.CityId != 'number' ? values.cart_info?.CityId?.id : 0,
          DistrictId: typeof values.cart_info?.DistrictId != 'number' ? values.cart_info?.DistrictId?.id : 0,
          WardId: typeof values.cart_info?.WardId != 'number' ? values.cart_info?.WardId?.id : 0,
          HamletId: typeof values.cart_info?.HamletId != 'number' ? values.cart_info?.HamletId?.id : 0,
          deliver_work_ship: null,
          _track: 'T_' + Math.random().toString(36).slice(2)
        },
        cart: products
          .map((item) => {
            if (item.dataCart.productType == 9) {
              return {
                ...item.dataCart,
                variant: typeof item.dataCart.variant == 'string' ? JSON.parse(item.dataCart.variant) : item.dataCart.variant,
                ref_id: idOder
              };
            }
            return {
              ...item.dataCart,
              variant: typeof item.dataCart.variant == 'string' ? JSON.parse(item.dataCart.variant) : item.dataCart.variant
            };
          })
          .concat(
            //@ts-ignore
            products.reduce((res: cartModel.ProductCart[], sim) => {
              return res.concat(sim.dataCart.gift!.map((gift) => ({ productId: gift.productId, productType: 10, cartId: gift.cartId })));
            }, [])
          )
          .concat(
            //@ts-ignore
            simsRedux.length > 0
              ? simsRedux
              : sims.map((item) => ({
                  productId: item.merchandise[0].sim.phone,
                  productType: 1,
                  cartId: item.id,
                  eSIM: item.merchandise[0].sim.type == 'physic' ? 0 : 1
                }))
          )
          .concat(
            //@ts-ignore
            simsRedux.length > 0
              ? []
              : sims.map((item) => ({
                  productId: `${item.merchandise[0].data.name}`,
                  productType: 2,
                  cartId: item.id
                }))
          ),
        Source: 'itel.vn'
      };

      if (_.isEmpty(listOder)) {
        const { cart_info, ...rest } = _values;
        //@ts-ignore
        const { fast, singleEsim, ..._cart_info } = cart_info;

        const resCreate = await CartService.createOrder({ ...rest, cart_info: { ..._cart_info } });
        if (resCreate.code == 200) {
          if (paymentMethod == 'VIETQR') {
            return router.push({
              pathname: 'checkout/vietQR',
              query: {
                orderID: JSON.stringify(resCreate.result)
              }
            });
          }

          setListOder(resCreate.result);

          const resPayment = await CartService.payOrder({
            paymentChannel: paymentMethod.includes('VNPAY') ? paymentMethod.split('_')[0] : paymentMethod,
            orderIds: resCreate.result,
            paymentOptions: {
              VNPAY_vnp_BankCode: paymentMethod.split('_')[1],
              OTP
            }
          });
          if (resPayment.code == 200) {
            dispatch(clearSimType());
            router.push(resPayment.result.paymentUrl!);
          }
          return;
        }
        modal.confirm({
          title: 'Thông báo',
          content: resCreate.message,
          rejectLable: 'Đóng',
          onDone: close
        });
      } else {
        const resPayment = await CartService.payOrder({ paymentChannel: paymentMethod, orderIds: listOder, paymentOptions: { OTP } });
        if (resPayment.code == 200) {
          dispatch(clearSimType());
          router.push(resPayment.result.paymentUrl!);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError?.message || ERROR_NULL,
        rejectLable: 'Đóng',
        onDone: close
      });
    } finally {
      setIsLoading(false);
      saveLocal('cart_info', values);
      saveLocal('dataCheckout', data);
    }
  };
  async function handleCheckout(values: cartModel.PaymentInfo) {
    setIsLoading(true);
    if (paymentMethod == 'COD') {
      try {
        const resOTP = await CartService.getOTPCOD(values.cart_info?.ContactPhone!);
        if (resOTP.code == 200) {
          showModalOPT({
            phone: values.cart_info?.ContactPhone!,
            guide: false,
            resend: function () {
              CartService.getOTPCOD(values.cart_info?.ContactPhone!);
            },
            verify: (otp: string) => {
              Payment(values, otp);
              return true;
            }
          });
        }
        return;
      } catch (error) {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: 'Thông báo',
          content: dataError?.message || ERROR_NULL,
          rejectLable: 'Đóng',
          onDone: close
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }
    Payment(values);
  }

  const getVariantId = (data: string): { id: number; title: string } => {
    const dataOject: { id: number; title: string } = JSON.parse(data);
    if (dataOject) return { id: dataOject.id, title: dataOject.title };
    return { id: 0, title: '' };
  };
  const getRefIDBaseus = async (param: cartModel.ParamBaseus) => {
    try {
      const res = await CartService.createOrderBaseus(param);
      if (res.code == 200) {
        return JSON.parse(res.result).order.id as number;
      }
      return 0;
    } catch (err) {}
  };
  const handleAccumulatePoints = () => {
    // accumulatePoints((phone) => (phone ? methods.setValue('phoneAccumulatePoints', phone) : null));
  };

  function getPriceFromMerchandise(data: {
    type?: string;
    discount_price?: number;
    price?: number;
    EsimPrice?: number;
    SimPrice?: number;
  }) {
    if (data.type && data.type == 'esim') return (data.EsimPrice || 0) + (data.discount_price || 0) - (data.SimPrice || 0);
    if (data.type && data.type != 'esim') return data.discount_price!;
    return data.discount_price!;
  }
  const getPriceFromMerchandiseCurrent=(data: {
    type?: string;
    discount_price?: number;
    price?: number;
    EsimPrice?: number;
    SimPrice?: number;
  }) => {
    console.log(data)
    if (data.type && data.type == 'esim') return (data.EsimPrice || 0) + (data.price || 0) - (data.SimPrice || 0);
    if (data.type && data.type != 'esim') return data.price!;
    return data.price!;


  }

  const IsBaseus: boolean = useMemo(() => {
    let _isBaseus: boolean = false;
    products.forEach((item) => {
      if (item.dataCart.productType == 9) {
        _isBaseus = true;
      }
    });
    return _isBaseus;
  }, [products]);

  // const fees = useMemo(
  //   () => (data.type === CheckoutType.Item ? (shippemntFee ? [{ name: 'Phí vận chuyển', value: shippemntFee.price }] : []) : []),
  //   [data.type, shippemntFee]
  // );

  const total = useMemo(() => {
    let total = 0;
    total = data.products.reduce(
      (total, { dataCart }) => (total += dataCart.price! * dataCart.quantity! + dataCart.gift!.reduce((res, item) => res + item.price!, 0)),
      total
    );
    total = data.sims.reduce(
      (total, { merchandise }) =>
        (total += merchandise.reduce((subtotal, { data, sim }) => {
          return (subtotal += getPriceFromMerchandise(data) + getPriceFromMerchandise(sim));
        }, 0)),
      total
    );
    return total;
  }, [data.products, data.sims]);

  const totalCurrent = useMemo(() => {
    let total = 0;
    total = data.products.reduce(
      (total, { dataCart }) => (total += dataCart.price! * dataCart.quantity! + dataCart.gift!.reduce((res, item) => res + item.price!, 0)),
      total
    );
    total = data.sims.reduce(
      (total, { merchandise }) =>
      (total += merchandise.reduce((subtotal, { data, sim }) => {
          console.log('dasd',getPriceFromMerchandiseCurrent(sim))
          return (subtotal += getPriceFromMerchandiseCurrent(data) + getPriceFromMerchandiseCurrent(sim));
        }, 0)),
      total
    );
    return total;
  }, [data.products, data.sims]);

  const totalFinal: number = useMemo(() => {
    let totalFinal = total;
    totalFinal += ShipmentFee;
    totalFinal -= voucher.DiscountAmount || 0;
    // totalFinal = selectedVouchers.reduce(
    //   (total, discount) =>
    //     (total -= discount.is_fix
    //       ? discount.discount_amount
    //       : Math.min(discount.discount_amount * total, discount.maximum_discount_amount)),
    //   totalFinal
    // );

    return totalFinal;
  }, [total, ShipmentFee, voucher]);

  const isValid = methods.formState.isValid;

  const Payments = useMemo(() => {
    if (products.length > 0 || fast == 1 || singleEsim == SimSingle.Single || total >= 3_000_000) {
      setPaymentMethod('');
      methods.setValue('cart_info.paymentChannel', '');
      return paymentOptions.filter((item) => item.id !== 'COD');
    }
    return paymentOptions;
  }, [products, sims, fast, singleEsim, paymentOptions]);

  useEffect(() => {
    if (typeof window != 'undefined') {
      methods.setValue('Phone', localStorage.getItem('user') || '');
    }
    // setPaymentMethod(paymentOptions[0].id);
    if (localCart_info && loadDataInfo) {
      setLoadDataInfo(false);
      methods.reset(localCart_info);
      setPaymentMethod(localCart_info.cart_info?.paymentChannel!);
    }
    let isESim: boolean = false;
    let isPhysic: boolean = false;
    sims.forEach((sim) => {
      if (sim.merchandise[0].sim.type !== 'physic') {
        methods.setValue('cart_info.eSim', 1);
        isESim = true;
      } else {
        isPhysic = true;
      }
    });
    if (isESim && !isPhysic) {
      methods.setValue('cart_info.singleEsim', SimSingle.Single);
      methods.setValue('ShipmentFee', 0);
      methods.setValue('cart_info.ghtk_fee', 0);
    } else {
      methods.setValue('cart_info.singleEsim', SimSingle.NoSingle);
    }
    methods.setValue('Source', 'itel.vn');
  }, [products]);

  function isVariantBaseus(arr: any): arr is imallModel.VariantBaseus {
    return arr.barcode;
  }
  const convertSelectOption = (variant: imallModel.VariantBaseus | cartModel.variantSelect[] | string) => {
    if (_.isEmpty(variant)) return;
    if (typeof variant == 'string') {
      const data: cartModel.variantSelect[] = JSON.parse(variant);
      return _.isArray(data) ? data.map((item) => item.selected?.name).join(', ') : '';
    }
    if (isVariantBaseus(variant)) {
      return variant.title;
    }

    return variant.map((item) => item.selected?.name).join(', ');
  };

  const getPayment = () => {
    CartService.getPayment().then((res) => {
      const listPayment: PaymentOption[] = Object.entries(res.result)
        .filter(([key, value]) => value == 1)
        .map((item,) => {
          const [key, value] = item;
          return {
            id: key,
            //@ts-ignore
            name: NamePayment[key],
            //@ts-ignore
            salePrice: NumberPayment[key],
            //@ts-ignore
            logoPath: ImagePayment[key],
            isActive: value == 0 ? false : true
          };
        }).sort((a,b)=>a.salePrice-b.salePrice);
      setPaymentOptions(listPayment);
      setPaymentMethod(listPayment[0].id);
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleCheckout, handleInvalid)}>
          <StepSim step={3} steps={steps} />
          <div className="container max-md:px-0">
            <div className="md:mt-6 flex w-full flex-col gap-x-6 xl:flex-row">
              {/* Left column */}
              <div className="flex flex-col w-full min-w-0 space-y-2 md:space-y-4">
                {/* Merchandise information section */}
                {sims.length ? (
                  <SectionProduct title="Sim số" totalItem={sims.length} desc="Sản phẩm Sim là eSim sẽ được gửi về địa chỉ email của bạn">
                    {({ open }) =>
                      (open ? sims : sims.slice(0, 1)).map((item) => (
                        <div key={item.id} className="pt-2 md:pt-4">
                          {/* Parent row */}

                          <CheckoutRowItem
                            isRoot
                            title={item.merchandise.length === 2 ? 'Sim đôi ưu đãi' : 'Sim và gói cước'}
                            desc={
                              item.merchandise.length === 2
                                ? '087 544 4676/ eSim'
                                : item.merchandise[0].sim.type === 'physic'
                                ? 'Sim thẻ'
                                : 'Sim eSim'
                            }
                            price={
                              (item.merchandise[0].sim.type == 'physic'
                                ? item.merchandise[0].sim.discount_price ?? item.merchandise[0].sim.price
                                : (item.merchandise[0].sim.discount_price || 0) -
                                  (item.merchandise[0].sim.SimPrice || 0) +
                                  (item.merchandise[0].sim.EsimPrice || 0)) + item.merchandise[0].data.price || 0
                            }
                          />
                          {/* child row */}
                          <div className="md:ml-8 space-y-3 md:space-y-4 py-3 md:py-4">
                            {item.merchandise.map((merchandise, index) => (
                              <Fragment key={merchandise.sim.phone}>
                                {index > 1 && <hr className="border-neutral-200" />}
                                <div className="space-y-3 md:space-y-4 pl-8 md:pl-0">
                                  <CheckoutRowItem
                                    price={
                                      merchandise.sim.type == 'physic'
                                        ? merchandise.sim.discount_price ?? merchandise.sim.price
                                        : (merchandise.sim.discount_price || 0) -
                                          (merchandise.sim.SimPrice || 0) +
                                          (merchandise.sim.EsimPrice || 0)
                                    }
                                    discountPrice={null}
                                    typeSim={merchandise.sim.type === 'physic' ? 'Sim' : ' E-Sim'}
                                    type="sim"
                                    title={formatPhoneNumber(merchandise.sim.phone)}
                                    desc={merchandise.sim.type === 'physic' ? 'Sim Vật lý' : 'Sim eSim'}
                                  />
                                  <CheckoutRowItem
                                    price={merchandise.data.price}
                                    discountPrice={null}
                                    type="pack"
                                    thoiGianCamket={(merchandise.sim.ThoiGianCamKet || 24).toString()}
                                    title={`Gói ${merchandise.data.name}`}
                                    desc={
                                      merchandise.sim.ThoiGianCamKet ? `Cam kết trong ${merchandise.sim.ThoiGianCamKet || 24} tháng` : ''
                                    }
                                  />
                                </div>
                              </Fragment>
                            ))}
                            {item.gift && (
                              <>
                                <hr className="border-neutral-200" />
                                <div className="space-y-3 md:space-y-4 pl-8 md:pl-0">
                                  <CheckoutRowItem price={item.gift.price} discountPrice={0} title={item.gift.name} />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </SectionProduct>
                ) : null}
                {products.length ? (
                  <SectionProduct title="Sản phẩm" totalItem={products.length}>
                    {({ open }) =>
                      (open ? products : products.slice(0, 1)).map((item) => (
                        <div key={item.dataCart.id} className="pt-2 md:pt-4">
                          {/* Parent row */}
                          <CheckoutRowItem
                            isRoot
                            title={item.dataCart.name}
                            desc={convertSelectOption(item.dataCart.variant)}
                            price={item.dataCart.originPrice || 0}
                            discountPrice={item.dataCart.price}
                            img={item.dataCart.image}
                            subDesc={
                              <span>
                                Số lượng: <b className="text-base-content">{item.dataCart.quantity}</b>
                              </span>
                            }
                          />
                          {/* child row */}
                          {/* {item.dataCart.new_gifts ? (
                            <div className="md:ml-8 space-y-3 md:space-y-4 py-3 md:py-4">
                              <div className="space-y-3 md:space-y-4 pl-8 md:pl-0">
                                {item.data.new_gifts.map((gift) => (
                                  <CheckoutRowItem
                                    key={gift.content}
                                    img={'/icons/others/gift.svg'}
                                    price={0}
                                    discountPrice={0}
                                    title={gift.content}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="h-3 md:h-4" />
                          )} */}
                          {item.dataCart.gift ? (
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
                          )}
                        </div>
                      ))
                    }
                  </SectionProduct>
                ) : null}

                {/* Receiver information */}
                <input type={'hidden'} {...methods.register('cart_info')} />
                <SectionDeliveryInformation />

                <section className=" container mt-2 md:rounded-lg bg-neutral-0 md:px-6 xl:px-8 md:mt-4">
                  <SectionPaymentMethod
                    includeWallet
                    selectedId={paymentMethod}
                    paymentOptions={Payments}
                    totalPrice={totalFinal}
                    onChange={(value) => {
                      setPaymentMethod(value.id);
                      methods.setValue('cart_info.paymentChannel', value.id);
                    }}
                  />
                </section>
                {/* <div className="md:hidden bg-neutral-0 mobile-container">
                  <SectionVoucherAndPayment
                    paymentOptions={Payments}
                    totalPrice={totalFinal}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={(data) => {
                      setPaymentMethod(data);
                      methods.setValue('cart_info.paymentChannel', data);
                    }}
                    onSelectedVouchers={(data) => {}}
                    selectedVouchers={selectedVouchers}
                    simSimData={sims
                      .map((item) => ({
                        productId: item.merchandise[0].sim.phone,
                        productType: 1,
                        cartId: item.id,
                        eSIM: item.merchandise[0].sim.type == 'physic' ? 0 : 1
                      }))
                      .concat(
                        //@ts-ignore
                        sims.map((item) => ({
                          productId: `${item.merchandise[0].data.name}`,
                          productType: 2,
                          cartId: item.id
                        }))
                      )}
                  />
                </div> */}
              </div>
              {/* Right column */}
              <div className="w-full flex-shrink-0 xl:w-[25.5rem]">
                <div className="md:sticky md:top-[15%]">
                  {sims.length > 0 && (
                    <div className=" mt-2 md:mt-4 xl:mt-0 md:rounded-lg bg-base-100 ">
                      <VoucherSelector
                        totalPrice={total}
                        onSelectedVouchers={setSelectedVouchers}
                        selectedVouchers={selectedVouchers}
                        simSimData={sims
                          .map((item) => ({
                            productId: item.merchandise[0].sim.phone,
                            productType: 1,
                            cartId: item.id,
                            eSIM: item.merchandise[0].sim.type == 'physic' ? 0 : 1
                          }))
                          .concat(
                            //@ts-ignore
                            sims.map((item) => ({
                              productId: `${item.merchandise[0].data.name}`,
                              productType: 2,
                              cartId: item.id
                            }))
                          )}
                      />
                    </div>
                  )}
                  <div className={clsx('px-4 mt-2  bg-neutral-0 md:rounded-lg ', sims.length > 0 ? 'md:mt-4' : 'md:mt-0')}>
                    <Controller
                      name="Phone"
                      control={methods.control}
                      render={({ field: { value } }) => (
                        <PriceSummary
                          headeType={data.type === CheckoutType.Item ? 'lg' : undefined}
                          totalPrice={total}
                          totalPriceCurrent={totalCurrent}
                          discounts={voucher}
                          awarded={0}
                          phoneAccumulatePoints={value}
                          accumulatePoints={data.type === CheckoutType.Item}
                          onUpdatePhone={handleAccumulatePoints}
                        />
                      )}
                    />
                  </div>
                  <div className="mt-6 md:mt-4 px-4 md:px-0">
                    <div className="space-y-3">
                      <ButtonLoading
                        isLoading={isLoading}
                        type="submit"
                        disabled={!isValid || _.isEmpty(paymentMethod)}
                        className="btn-primary btn btn-lg w-full rounded-full"
                      >
                        Đặt hàng
                      </ButtonLoading>
                      <div className="text-sm text-center">
                        {' '}
                        Bằng cách bấm thanh toán, bạn đồng ý với{' '}
                        <a

                          href="https://itel.vn/thong-tin/dieu-kien-&amp;-dieu-khoan-giao-dich-chung"
                          target="_blank"
                          className="text-primary underline"
                        >
                          điều khoản và điều kiện giao dịch chung
                        </a>{' '}
                        của iTel{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SectionCheckoutPolicy />
        </form>
      </FormProvider>

      {/* <DebugUI className="text-xs bg-neutral-0 shadow-itel p-2 rounded-r-xl">
        <div>
          <b>Trạng thái</b>
          <DebugUI.OptionsList
            options={[
              { value: true, name: 'Thành công' },
              { value: false, name: 'Thất bại' }
            ]}
            onChange={(v) => isSuccess.setValue(v.value)}
            checkedValue={isSuccess.value}
          />
        </div>
        <div className="mt-2">
          <b>Demo lỗi</b>
          <DebugUI.OptionsList options={statusCheckout} onChange={(v) => setDemo(v.value)} checkedValue={demo} />
        </div>
        <div className="mt-2 text-xs">
          <label className="flex gap-x-2 p-2">
            <input type="checkbox" className="w-4 h-4" checked={disableSome.value} onChange={disableSome.toggle} />
            <span>Tắt phương thức thanh toán</span>
          </label>
        </div>
      </DebugUI> */}
      {/* <DevTool control={methods.control} /> */}
    </>
  );
};

export default StepCheckout;
