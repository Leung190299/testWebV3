import type { IForm } from '@/types/form';
import { phoneItel, phoneNumberRegex, phoneOrEmailRegex } from '@/utilities/validator';
import { mixed, number, object, string } from 'yup';
import { DELIVERY_INFOMATION, DeliveryMethod, EMAIL_NAME, FULL_NAME, IDENTITY_ID_NAME, PHONE_NAME, SimSingle } from './checkout.constants';

export const seriValidator = string()
  .required('Số Serial không được để trống')
  .matches(/^[0-9]{11}$/, 'Số Serial không hợp lệ');

export const phoneValidator = string()
  .required('Số điện thoại không được để trống')
  .transform((currentValue) => currentValue.replace(/ /g, ''))
  .matches(phoneNumberRegex, { message: 'Số điện thoại không hợp lệ' });
export const phoneItelValidator = string()
  .required('Số điện thoại không được để trống')
  .transform((currentValue) => currentValue.replace(/ /g, ''))
  .matches(phoneNumberRegex, { message: 'Số điện thoại không hợp lệ' })
  .matches(phoneItel, { message: 'Số thuê bao phải theo định dạng 087xx' });
export const emailValidator = string().email('Email không hợp lệ');
export const emailOrPhoneValidator = string().matches(phoneOrEmailRegex, { message: 'Số điện thoại không đúng định dạng' });

export const AuthPhoneSchemaValidation = object<IForm.SignIn>().shape({
  [PHONE_NAME]: phoneValidator
});
export const PhoneSchemaValidation = object<IForm.SignIn>().shape({
  [PHONE_NAME]: string()
    .required('Số điện thoại không được để trống')
    .matches(phoneNumberRegex, { message: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!' })
});

export const CreateUserSchemaValidation = object().shape({
  phone: phoneValidator,
  email: emailValidator,
  name: string().required('Tên không được để trống'),
  password: string().min(6).required('Mật khẩu được để trống'),
  balance: number().typeError('Bắt buộc là số').default(0)
});

const BaseAddressSchemaValidation = object({
  province: object().required(),
  district: object().required(),
  ward: object().required(),
  address: string().required()
});

export const AddressSchemaValidation = object<Pick<IForm.Checkout, 'deliveryInfomation'>>().shape({
  deliveryInfomation: BaseAddressSchemaValidation.shape({
    [PHONE_NAME]: phoneValidator,
    name: string().required('Tên không được để trống')
  })
});

export const InstallmentProfileSchemaValidation = object<IForm.CheckoutInstallment>().shape({
  [PHONE_NAME]: phoneValidator,
  [FULL_NAME]: string().required('Tên không được để trống'),
  [IDENTITY_ID_NAME]: string().required('Số CCCD không được để trống'),
  [EMAIL_NAME]: string().email('Email không đúng định dạng')
});

export const InstallmentSchemaValidation = InstallmentProfileSchemaValidation.shape({
  [DELIVERY_INFOMATION]: BaseAddressSchemaValidation,
  deliveryOption: mixed().required(),

  //
  bank: object().required(),
  card: object().required(),
  installment: object().required()
});

export const CheckoutItemValidation = object().shape({
  cart_info: object().shape({
    fullName: string().required('Họ tên không được trống!'),
    ContactPhone: string().required('SĐT không được trống!').matches(phoneNumberRegex, { message: 'SĐT không đúng định dạng!' }),
    email: string()
      .when('eSim', {
        is: 1,
        then: (s) => s.required('Email không được trống'),
        otherwise: (s) => s.notRequired()
      })
      .email('Email không đúng định dạng'),
    CityId: object()
      .when('shipment_type', {
        is: DeliveryMethod.Home,
        then: (s) => s.shape({
          id:number().required('Chọn Tỉnh/Thành phố')
        }),
        otherwise: (s) => s.notRequired()
      })
      .when('singleEsim', {
        is: SimSingle.Single,
        then: (s) => s.notRequired()
      }),
    IsFast: string().when('shipment_type', {
      is: DeliveryMethod.Home,
      then: (s) => s.required(),
      otherwise: (s) => s.notRequired()
      }),
    DistrictId: object()
      .when('shipment_type', {
        is: DeliveryMethod.Home,
        then: (s) => s.shape({
          id:number().required('Chọn Quận/Huyện')
        }),
        otherwise: (s) => s.notRequired()
      })
      .when('singleEsim', {
        is: SimSingle.Single,
        then: (s) => s.notRequired()
      }),
    WardId: object()
      .when('shipment_type', {
        is: DeliveryMethod.Home,
        then: (s) => s.shape({
          id:number().required('Chọn Phường/Xã ')
        }),
        otherwise: (s) => s.notRequired()
      })
      .when('singleEsim', {
        is: SimSingle.Single,
        then: (s) => s.notRequired()
      }),
    addr: string()
      .when('shipment_type', {
        is: DeliveryMethod.Home,
        then: (s) => s.required('Địa chỉ không được trống'),
        otherwise: (s) => s.notRequired()
      })
      .when('singleEsim', {
        is: SimSingle.Single,
        then: (s) => s.notRequired()
      }),
    StoreId: number()
      .when('shipment_type', {
        is: DeliveryMethod.Itel,
        then: (s) => s.required('Chọn văn phòng giao dịch'),
        otherwise: (s) => s.notRequired()
      })
      .when('singleEsim', {
        is: SimSingle.Single,
        then: (s) => s.notRequired()
      })
  })

  // .when('singleEsim', {
  //   is: SimSingle.Single,
  //   then: (info) =>
  //     info.shape({
  //       fullName: string().required('Họ tên không được trống!'),
  //       ContactPhone: string().required('SĐT không được trống!').matches(phoneNumberRegex, { message: 'SĐT không đúng định dạng!' }),
  //       email: string()
  //         .when('eSim', {
  //           is: 1,
  //           then: (s) => s.required('Email không được trống'),
  //           otherwise: (s) => s.notRequired()
  //         })
  //         .email('Email không đúng định dạng')
  //     })
  // })
  // .when('singleEsim', {
  //   is: SimSingle.NoSingle,
  //   then: (info) =>
  //     info.shape({
  //       fullName: string().required('Họ tên không được trống!'),
  //       ContactPhone: string().required('SĐT không được trống!').matches(phoneNumberRegex, { message: 'SĐT không đúng định dạng!' }),
  //       email: string()
  //         .when('eSim', {
  //           is: 1,
  //           then: (s) => s.required('Email không được trống'),
  //           otherwise: (s) => s.notRequired()
  //         })
  //         .email('Email không đúng định dạng'),
  //       CityId: object().when('shipment_type', {
  //         is: DeliveryMethod.Home,
  //         then: (s) => s.required('Chọn Tỉnh/Thành phố'),
  //         otherwise: (s) => s.notRequired()
  //       }),
  //       DistrictId: object().when('shipment_type', {
  //         is: DeliveryMethod.Home,
  //         then: (s) => s.required('Chọn Quận/Huyện'),
  //         otherwise: (s) => s.notRequired()
  //       }),
  //       WardId: object().when('shipment_type', {
  //         is: DeliveryMethod.Home,
  //         then: (s) => s.required('Chọn Phường/Xã '),
  //         otherwise: (s) => s.notRequired()
  //       }),
  //       addr: string().when('shipment_type', {
  //         is: DeliveryMethod.Home,
  //         then: (s) => s.required('Địa chỉ không được trống'),
  //         otherwise: (s) => s.notRequired()
  //       }),
  //       StoreId: number().when('shipment_type', {
  //         is: DeliveryMethod.Itel,
  //         then: (s) => s.required('Chọn văn phòng giao dịch'),
  //         otherwise: (s) => s.notRequired()
  //       })
  //     })
  // })
});
