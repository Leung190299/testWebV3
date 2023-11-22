import { DELIVERY_ADDRESS, DELIVERY_NAME, DELIVERY_PHONE, FULL_NAME } from '@/constants/checkout.constants';
import { modal, useModal } from '@/libs/modal';
import { FormProvider, useForm } from 'react-hook-form';
import FormDeliveryInformation from '../pages/checkout/form-delivery-information';
import SectionHeader from '../pages/checkout/section-header';
import HeaderMiddleAndFull from './header/header-middle-and-full';

import { AddressSchemaValidation } from '@/constants/validator.constants';
import { useGlobalContext } from '@/context/global';
import { Address } from '@/services/address/model';
import { IForm } from '@/types/form';
import type { Model } from '@/types/model';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputErrorForm } from '../input/input-error';
import InputLabelOut from '../input/input-label-out';

type Props = {
  type?: 'update' | 'add';
  defaultValues?: IForm.AddAddress;
};

const ModalAddDeliveryAddress = (props: Props) => {
  const { done, close } = useModal();
  const { user, setUser } = useGlobalContext();
  const methods = useForm<IForm.AddAddress>({
    mode: 'onChange',
    resolver: yupResolver(AddressSchemaValidation),
    defaultValues: props.defaultValues
  });
  const isValid = methods.formState.isValid && methods.formState.isDirty;

  const handleSubmit = async (values: IForm.AddAddress) => {
    const { deliveryInfomation } = values;
    const addr: DiffObj<Model.DeliveryAddress, Model.BaseModel> = {
      user_id: user.id,
      address: deliveryInfomation.address,
      name: deliveryInfomation.name,
      phone: deliveryInfomation.phone,
      province: deliveryInfomation.province,
      district: deliveryInfomation.district,
      ward: deliveryInfomation.ward,
      village: deliveryInfomation.village,
      is_default: deliveryInfomation.is_default || false
    };
    const address = await Address.create(addr);
    const newAddress = deliveryInfomation.is_default
      ? [...user.address.map((add) => ({ ...add, is_default: false })), address]
      : [...user.address, address];

    setUser({
      ...user,
      address: newAddress
    });
    done(values);
  };

  const beforeClose = () => {
    if (methods.formState.isDirty) {
      modal.confirm({
        title: 'Địa chỉ sẽ không được lưu lại',
        content: 'Thông tin địa chỉ chưa được lưu. Bạn có chắc chắn muốn thoát ra?',
        confirmLable: 'Tiếp tục',
        rejectLable: 'Thoát ra',
        onDone: close
      });
      return false;
    }
    return true;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="pb-20 md:pb-0">
        <HeaderMiddleAndFull title="Thêm địa chỉ" mobileTitle="Thêm địa chỉ nhận hàng" beforeClose={beforeClose} />
        <div className="bg-neutral-0 mt-2 md:mt-8">
          <div className="md:hidden mobile-container">
            <SectionHeader title="Địa chỉ nhận hàng" />
          </div>
          <hr className="md:hidden border-neutral-200" />
          <div className="mobile-container py-3 md:py-0">
            <div className="flex flex-wrap -mx-3 gap-y-5 md:gap-y-6">
              <InputLabelOut
                className="w-full px-3"
                title="Họ và tên"
                required
                placeholder="Nhập họ và tên"
                data-headlessui-focus-guard="true"
                {...methods.register(DELIVERY_NAME)}
              >
                <InputErrorForm errors={methods.formState.errors} name={FULL_NAME} />
              </InputLabelOut>
              <InputLabelOut
                className="w-full px-3"
                title="Số điện thoại"
                required
                placeholder="Nhập số điện thoại"
                {...methods.register(DELIVERY_PHONE)}
              >
                <InputErrorForm errors={methods.formState.errors} name={DELIVERY_PHONE} />
              </InputLabelOut>
              <FormDeliveryInformation className="w-full md:w-1/2 px-3" />
              <InputLabelOut
                className="w-full px-3"
                title="Địa chỉ cụ thể"
                required
                placeholder="Nhập địa chỉ"
                {...methods.register(DELIVERY_ADDRESS)}
              >
                <InputErrorForm errors={methods.formState.errors} name={DELIVERY_ADDRESS} />
              </InputLabelOut>
              <div className="px-3">
                <label className="flex items-center gap-x-2 font-bold">
                  <input type="checkbox" {...methods.register('deliveryInfomation.is_default')} />
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed md:static md:mt-8 bottom-0 bg-neutral-0 mobile-container py-2 md:py-0 w-full">
          <div className="w-full md:w-1/2 mx-auto">
            <button type="submit" disabled={!isValid} className="btn btn-primary rounded-full w-full">
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export function addDeliveryAddress(data?: Props, onDone?: (values: IForm.AddAddress) => void) {
  modal.open({
    render: <ModalAddDeliveryAddress {...data} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[45rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone
  });
}

export default ModalAddDeliveryAddress;
