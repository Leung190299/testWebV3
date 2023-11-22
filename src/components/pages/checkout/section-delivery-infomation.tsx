/* eslint-disable react-hooks/exhaustive-deps */
import ComboboxesSimple from '@/components/comboboxes/comboboxes-simple';
import { InputErrorForm } from '@/components/input/input-error';
import InputLabelOut from '@/components/input/input-label-out';
import { toggleModalSelectionList } from '@/components/modal/selection/modal-selection-list';
import { CheckoutType, DeliveryMethod, SimSingle } from '@/constants/checkout.constants';
import { useGlobalContext } from '@/context/global';
import { useStoreLocation } from '@/hooks/useLocation';
import { clearFee } from '@/store/fees/feesSlice';
import { useAppSelector } from '@/store/hooks';
import { withMobile } from '@/utilities/function';
import clsx from 'clsx';
import { Fragment, useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FieldDeliveryOption from './field-delivery-option';
import FormDeliveryInformation from './form-delivery-information';
import SectionHeader from './section-header';

type Props = {};

const SectionDeliveryInformation = (Props: Props) => {
  const { status } = useGlobalContext();

  const methods = useFormContext<cartModel.PaymentInfo>();
  const dispatch = useDispatch();
  const deliveryMethod = useWatch({ name: 'cart_info.shipment_type', control: methods.control });

  const stores = useStoreLocation();
  const data = useAppSelector((state) => state.cart.checkoutData);

  const products = data?.type === CheckoutType.Item ? data.products : [];

  useMemo(() => {
    if (deliveryMethod == DeliveryMethod.Itel) {
      dispatch(clearFee());
    }
  }, [deliveryMethod]);
  const options: any[] = [
    // {
    //   name: 'deliveryInfomation.province',
    //   title: 'Tỉnh/Thành phố',
    //   placeholder: 'Chọn tỉnh thành phố',
    //   required: true,
    //   disabled: !provinces.length,
    //   options: provinces
    // },
    // {
    //   name: 'deliveryInfomation.district',
    //   title: 'Quận/Huyện',
    //   placeholder: 'Chọn quận/huyện',
    //   required: true,
    //   disabled: !districts.length,
    //   options: districts
    // }
  ];
  useEffect(() => {
    methods.setValue('cart_info.shipment_type', DeliveryMethod.Home);
    methods.setValue('cart_info.IsFast', 0);
  }, []);

  const handleChangeLocation = (name: any) => {
    // const option = options.find((op) => op.name === name);
    // if (!option) return;
    // toggleModalSelectionList({
    //   defaultValue: methods.getValues(name) ? option.options.find((pr) => methods.getValues(name)._id === pr._id) : null,
    //   options: option.options,
    //   title: option.title,
    //   placeholder: option.placeholder,
    //   withSearch: true,
    //   maxHeight: true
    // }).then((d) => {
    //   if (d) {
    //     methods.setValue(name, d, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    //     switch (name) {
    //       case DELIVERY_PROVINCE:
    //         methods.resetField(DELIVERY_DISTRICT);
    //       default:
    //         break;
    //     }
    //   }
    // });
  };

  // const handleChangeAddress = () => {
  //   changeAddress(methods.getValues('deliveryInfomation').id, (v) =>
  //     methods.setValue('deliveryInfomation', v, { shouldDirty: true, shouldValidate: true, shouldTouch: true })
  //   );
  // };

  // const handleAddAddress = () => {
  //   addDeliveryAddress(undefined, (values) =>
  //     methods.setValue(DELIVERY_INFOMATION, values.deliveryInfomation, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  //   );
  // };

  const handleStorePickupOption = withMobile(() => {
    toggleModalSelectionList({
      options: stores,
      defaultValue: methods.getValues('cart_info.StoreId') ? stores.find((d) => d.id == methods.getValues('cart_info.StoreId')) : null,
      title: 'Chọn văn phòng giao dịch',
      type: 'secondary',
      renderContent(props) {
        return (
          <div className="flex items-center gap-4 flex-1 text-sm">
            <div className="flex-1">
              <p>
                <b>{props.name}</b>
              </p>
              <p className="mt-1 text-xs text-neutral-500"> Giờ làm việc: thứ 2 - thứ 6 (trừ ngày lễ, Tết)</p>
              <p className="mt-1 text-xs text-neutral-500"> Sáng: 8h-12h, Chiều: 13h-18h (thứ 6 làm việc đến 17h)</p>
            </div>
          </div>
        );
      }
    }).then(
      (d) => d && methods.setValue('cart_info.StoreId', Number(d.id), { shouldDirty: true, shouldValidate: true, shouldTouch: true })
    );
  });

  return (
    <div className="md:px-6 mt-2 md:rounded-lg bg-neutral-0 md:mt-4 md:pb-8">
      <div className="mobile-container">
        <SectionHeader title="1. Thông tin nhận hàng" />
      </div>

      <>
        <hr className="border-neutral-200" />
        <div className="mobile-container py-4 md:py-6">
          <div>
            <div className="flex -mx-2 flex-wrap gap-y-5 md:gap-y-4">
              {[
                { name: 'cart_info.fullName', title: 'Họ và tên', placeholder: 'Nhập họ và tên', required: true },
                {
                  name: 'cart_info.ContactPhone',
                  title: 'Số điện thoại',
                  placeholder: 'Nhập số điện thoại',
                  required: true,
                  maxLength: 10,
                  pattern: /[^0-9.]/g
                },
                {
                  name: 'cart_info.email',
                  title: 'Email',
                  placeholder: 'Vidu@example.com',
                  required: methods.getValues('cart_info.eSim') == 1
                }
              ].map(({ name, ...rest }) => {
                return (
                  <InputLabelOut key={name} className="w-full md:w-1/3 px-2" {...rest} {...methods.register(name as any)}>
                    <InputErrorForm errors={methods.formState.errors} name={name} />
                  </InputLabelOut>
                );
              })}
              <div className="w-full px-2">
                {/* <label className="flex items-center gap-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="checked:bg-neutral-500 checked:border-neutral-500"
                      {...methods.register(NOTIFICATION_NAME)}
                    />
                    <p className="text-neutral-500">Tôi sẵn sàng nhận thêm thông tin ưu đãi từ iTel</p>
                  </label> */}
              </div>
            </div>
          </div>
        </div>
      </>

      <hr className="border-neutral-200" />
      {methods.getValues('cart_info.singleEsim') != SimSingle.Single && (
        <div className="mobile-container py-4 md:py-0">
          <div className="flex flex-wrap gap-y-4 -mx-3 text-sm md:text-base font-medium md:font-bold">
            <label className="flex items-center w-full px-3 md:py-4 md:w-1/3 gap-x-2">
              <input type="radio" value={DeliveryMethod.Home} {...methods.register('cart_info.shipment_type')} />
              <span>Giao hàng tận nơi</span>
            </label>
            <label className="flex items-center w-full px-3 md:w-auto md:py-4 gap-x-2">
              <input
                type="radio"
                disabled={!!products.length}
                value={DeliveryMethod.Itel}
                {...methods.register('cart_info.shipment_type')}
              />
              <span className={clsx({ 'opacity-50': !!products.length })}>Nhận tại phòng giao dịch iTel</span>
            </label>
          </div>
          <div className="flex flex-wrap -mx-3 gap-y-5 md:gap-y-6 mt-4 md:mt-3">
            {deliveryMethod === DeliveryMethod.Home ? (
              <Fragment>
                <Fragment>
                  <FormDeliveryInformation className="w-full md:w-1/2 px-3" />
                  <div className="form-control w-full px-3">
                    <span className="label-text font-medium" aria-required>
                      Địa chỉ
                    </span>
                    <input className="input input-bordered mt-2" placeholder="Số nhà, tên đường, tên thông/ấp, khu" {...methods.register('cart_info.addr')} />
                  </div>
                </Fragment>

                <div className="w-full px-3" key={'deliveryOption'}>
                  <span className="label-text text-sm md:text-lg font-medium md:font-bold" aria-required>
                  2. Chọn hình thức giao hàng
                  </span>
                  <FieldDeliveryOption />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {options.map(({ disabled, name, options, placeholder, required, title }) => (
                  <div className="form-control w-full md:w-1/2 px-3" key={name}>
                    <span className="label-text font-medium" aria-required={required}>
                      {title}
                    </span>
                    <Controller
                      control={methods.control}
                      name={name as any}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <ComboboxesSimple
                            {...field}
                            options={options || []}
                            btnClassName="mt-2"
                            placeholder={placeholder}
                            disabled={disabled}
                            onClick={withMobile(() => handleChangeLocation(name))}
                            btnOnMobile
                          />
                        );
                      }}
                    />
                  </div>
                ))}
                <div className="w-full px-3" key={'storeLocation'}>
                  <Controller
                    name="cart_info.StoreId"
                    control={methods.control}
                    shouldUnregister
                      render={({ field: { value, onChange } }) => (
                        <>
                        {stores.map(item => (
                          <div className="relative flex items-center p-4 gap-4 mt-2 cursor-pointer overflow-hidden" key={item.id} onClick={()=>onChange(item.id)}>
                          <input
                            type="radio"
                            name="example"
                            className="peer"
                              checked={item.id == value}

                          />
                          <span className="absolute inset-0 rounded-lg border-neutral-300 border peer-checked:border-red-500 pointer-events-none" />
                          <div className="flex items-center gap-4 flex-1 text-sm">
                            <div className="flex-1 overflow-hidden">
                              <p className=" line-clamp-1">
                                <b>{item.name}</b>
                              </p>
                              <p className="mt-1 text-xs text-neutral-500 truncate">Giờ làm việc: thứ 2 - thứ 6 (trừ ngày lễ, Tết)</p>
                              <p className="mt-1 text-xs text-neutral-500 truncate">
                                Sáng: 8h-12h, Chiều: 13h-18h (thứ 6 làm việc đến 17h)
                              </p>
                            </div>
                          </div>
                        </div>
                        ))}
                        </>


                    )}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDeliveryInformation;
