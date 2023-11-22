import CheckBox from '@/components/form/CheckBox';
import InputField from '@/components/form/InputField';
import RadioInput from '@/components/form/RadioInput';
import SelectInput from '@/components/form/SelectInput';
import Svg from '@/components/icon/svg';
import { emailValidator, phoneValidator } from '@/constants/validator.constants';
import { useGlobalContext } from '@/context/global';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { Control, useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SelectMethodDelivery from './SelectMethodDelivery';

type FormValues = {
  phone: string;
  paymentMethod: string;
  fullName: string;
  email?: string;
  tp: string;
  qh: string;
  px: string;
  ak?: string;
  methodDelivery?: string;
  acceptNotify?: boolean;
  address?: string;
  vpgd?: string;
};

const InitValue = {
  phone: '',
  paymentMethod: 'vnPay',
  fullName: '',
  email: '',
  tp: '',
  qh: '',
  px: '',
  ak: '',
  methodDelivery: '',
  acceptNotify: true,
  address: '',
  vpgd: ''
};

const SchemaValidation = yup
  .object({
    phone: phoneValidator,
    email: emailValidator,
    fullName: yup.string().required('Họ và tên không được để trống'),
    tp: yup.string().required('Thành phố không được để trống'),
    qh: yup.string().required('Quận huyện không được để trống'),
    px: yup.string().required('Phường xã không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống')
  })
  .required();

const SchemaValidation2 = yup
  .object({
    phone: phoneValidator,
    email: emailValidator,
    fullName: yup.string().required('Họ và tên không được để trống'),
    tp: yup.string().required('Thành phố không được để trống'),
    qh: yup.string().required('Quận huyện không được để trống'),
    vpgd: yup.string().required('Văn phòng giao dịch không được để trống')
  })
  .required();

const PAYMENT_METHODS = [
  {
    type: 'vnPay',
    name: 'VNPay',
    icon: '/icons/payment/vnpay.svg'
  },
  {
    type: 'zalo',
    name: 'ZaloPay',
    icon: '/icons/payment/zalo.svg'
  },
  {
    type: 'momo',
    name: 'Ví Momo',
    icon: '/icons/payment/momo.svg'
  },
  {
    type: 'bank',
    name: 'Chuyển khoản ngân hàng',
    icon: '/icons/payment/transfer.svg'
  },
  {
    type: 'cod',
    name: 'Thanh toán khi nhận hàng',
    icon: '/icons/payment/cod.svg'
  }
];

const PaymentMethodItem: FC<{
  name: string;
  icon: string;
  active: boolean;
  onClick: Function;
}> = ({ name, icon, active, onClick }) => {
  return (
    <div
      className={clsx(
        'cursor-pointer p-4 flex col-span-1 gap-2 border rounded-xl bg-neutral-0 items-center',
        active ? 'border-red-500' : 'border-neutral-300'
      )}
      onClick={() => onClick()}
    >
      <div
        className={clsx(
          'h-5 w-5 min-w-[20px] rounded-full border flex justify-center items-center',
          active ? 'border-red-600' : 'border-neutral-300'
        )}
      >
        {active && <div className="h-3 w-3 rounded-full bg-red-600" />}
      </div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-neutral-500">
          Giảm đến <span className="text-red-500">200.000đ</span>
        </p>
      </div>

      <Svg className="w-8 h-8" src={icon} />
    </div>
  );
};

const PaymentMethodInput: FC<{
  control: Control<any>;
}> = ({ control }) => {
  const {
    field: { value, onChange }
  } = useController({ control, name: 'paymentMethod' });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 pt-4 border-t border-t-neutral-200 gap-4">
      {PAYMENT_METHODS.map((item) => (
        <PaymentMethodItem
          key={item.type}
          onClick={() => onChange(item.type)}
          name={item.name}
          icon={item.icon}
          active={value === item.type}
        />
      ))}
    </div>
  );
};

const AcceptInput: FC<{
  control: Control<any>;
}> = ({ control }) => {
  const {
    field: { value, onChange }
  } = useController({ control, name: 'acceptNotify' });
  return (
    <div className="md:col-span-3 flex gap-2.5 items-center">
      <CheckBox disabled value={value} onChange={onChange} />
      <p className="text-sm text-neutral-500">Tôi sẵn sàng nhận thêm thông tin ưu đãi từ iTel</p>
    </div>
  );
};

const PaymentStep: FC<{ submit: Function; phoneNumber: string; typeSim: string }> = ({ submit, phoneNumber, typeSim }) => {
  const { status } = useGlobalContext();

  const isLogin = useMemo(() => status === 'authenticated', [status]);
  const [isEdit, setEdit] = useState(!isLogin);
  const [typePayment, setTypePayment] = useState(1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(typePayment == 1 ? SchemaValidation : SchemaValidation2),
    mode: 'all'
  });

  const submitForm = (payload: FormValues) => {
    submit(payload);
  };

  useEffect(() => {
    if (isLogin) {
      reset(
        {
          phone: '0867896716',
          email: 'email@example.com',
          fullName: 'Đào Thị Hải Yến',
          tp: 'hn',
          qh: 'hn',
          px: 'hn',
          address: 'Tòa CT2 Ngô Thì Nhậm, Phường Hà Cầu, Quận Hà Đông, Hà Nội'
        },
        { keepDefaultValues: true }
      );
    }
  }, [isLogin]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <img className="w-18 h-18 " src="images/iconCart.png" alt="" />
        <div className="flex-1">
          <p className="text-sm md:text-base font-bold">Số thuê bao {phoneNumber}</p>
          <p className="text-neutral-500 text-xs md:text-sm">{typeSim == 'eSim' ? 'eSim' : 'Sim Vật lý'}</p>
        </div>
        <p className="text-sm md:text-base font-bold">65.000đ</p>
      </div>
      <div className="md:p-8 md:pt-5 md:bg-neutral-50 rounded-lg mt-4">
        <p className="font-bold md:text-xl">Thông tin nhận hàng</p>
        {isEdit && (
          <div className="grid col-span-1 md:grid-cols-3 mt-5 pt-6 border-t border-t-neutral-200 gap-5 md:gap-6">
            <div className="col-span-1">
              <InputField inputLabel="Họ và tên" placeholder="Nhập họ và tên" control={control} name="fullName" />
            </div>
            <div className="col-span-1">
              <InputField inputLabel="Số điện thoại" placeholder="Nhập số điện thoại" control={control} name="phone" />
            </div>
            <div className="col-span-1">
              <InputField inputLabel="Email" placeholder="Vidu@example.com" control={control} name="email" />
            </div>
            {typeSim !== 'eSim' && <AcceptInput control={control} />}
          </div>
        )}

        {typeSim == 'eSim' ? (
          <>
            {isLogin && !isEdit && (
              <div className="grid col-span-1 mt-5 pt-6 border-t border-t-neutral-200 gap-5 md:gap-6">
                <div className="flex gap-5 items-center cursor-default rounded-lg border border-neutral-300 py-4 px-6 text-base focus:border-neutral-800 bg-neutral-0">
                  <div className="flex-1 overflow-hidden">
                    <p>
                      <span className="font-bold">Đào Thị Hải Yến</span>
                      <> | </>
                      <span className="font-bold">0867896716</span>
                    </p>
                    <p className="truncate">email@example.com</p>
                  </div>

                  <button className="font-bold text-sm" onClick={() => setEdit(true)}>
                    Thay đổi
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 pt-4 border-t border-t-neutral-200 gap-5 md:gap-6">
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-10">
              <RadioInput radioId="sim" label="Giao hàng tận nơi" isChecked={typePayment === 1} onClick={() => setTypePayment(1)} />
              <RadioInput
                radioId="esim"
                label="Nhận tại phòng giao dịch iTel"
                isChecked={typePayment === 2}
                onClick={() => setTypePayment(2)}
              />
            </div>

            {isEdit && (
              <>
                <div className="col-span-1">
                  <InputField
                    inputLabel="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh/thành phố"
                    options={[{ value: 'hn', label: 'Ha Noi' }]}
                    control={control}
                    name="tp"
                    inputTag={SelectInput}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    inputLabel="Quận/Huyện"
                    placeholder="Chọn quận/huyện"
                    options={[{ value: 'hn', label: 'Ha Noi' }]}
                    control={control}
                    name="qh"
                    inputTag={SelectInput}
                  />
                </div>
                {typePayment == 2 ? (
                  <>
                    <div className="col-span-1 md:col-span-2">
                      <InputField
                        inputLabel="Văn phòng giao dịch"
                        placeholder="Chọn văn phòng giao dịch"
                        options={[{ value: 'hn', label: 'Ha Noi' }]}
                        control={control}
                        name="vpgd"
                        inputTag={SelectInput}
                        // required={false}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-1">
                      <InputField
                        inputLabel="Phường/Xã"
                        placeholder="Chọn phường/xã"
                        options={[{ value: 'hn', label: 'Ha Noi' }]}
                        control={control}
                        name="px"
                        inputTag={SelectInput}
                      />
                    </div>
                    <div className="col-span-1">
                      <InputField
                        inputLabel="Ấp/ khu"
                        placeholder="Chọn ấp/ khu"
                        options={[{ value: 'hn', label: 'Ha Noi' }]}
                        control={control}
                        name="ak"
                        inputTag={SelectInput}
                        required={false}
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <InputField inputLabel="Địa chỉ" placeholder="Nhập địa chỉ" control={control} name="address" />
                    </div>
                  </>
                )}
              </>
            )}

            {isLogin && !isEdit && (
              <div className="col-span-1 md:col-span-2">
                <div className=" ừ flex gap-5 items-center cursor-default rounded-lg border border-neutral-300 py-4 px-6 text-base focus:border-neutral-800 bg-neutral-0">
                  <div className="flex-1 overflow-hidden">
                    <p>
                      <span className="font-bold">Đào Thị Hải Yến</span>
                      <> | </>
                      <span className="font-bold">0867896716</span>
                    </p>
                    <p className="truncate">Tòa CT2 Ngô Thì Nhậm, Phường Hà Cầu, Quận Hà Đông, Hà Nội</p>
                  </div>

                  <button className="font-bold text-sm" onClick={() => setEdit(true)}>
                    Thay đổi
                  </button>
                </div>
              </div>
            )}

            {typePayment == 1 && (
              <div className="col-span-1 md:col-span-2">
                <InputField
                  inputLabel=""
                  control={control}
                  name="methodDelivery"
                  inputTag={SelectMethodDelivery}
                  placeholder=""
                  options={[{ value: 'gh', label: 'Giao hàng Nhanh' }]}
                />
              </div>
            )}
            {/* <div className="col-span-2r"></div> */}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 -ml-4 -mr-4 mt-4" />

      <div className="md:px-6 md:pt-5 md:pb-8 md:bg-neutral-50 rounded-lg mt-4">
        <p className="font-bold text-xl">Phương thức thanh toán</p>
        <p className="text-neutral-500 text-sm mt-1">Lựa chọn phương thức thanh toán phù hợp và làm theo hướng dẫn</p>

        <PaymentMethodInput control={control} />
      </div>
      <div className="border-t border-neutral-200 -ml-4 -mr-4 mt-4" />
      <div className="md:px-6 md:pt-5 pb-8 md:bg-neutral-50 rounded-lg mt-4">
        <p className="font-bold md:text-xl">Đơn hàng</p>

        <div className="border-y border-y-neutral-200 mt-5 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">Phí đổi/ Cấp lại Sim</p>
            <p className="text-sm font-medium">65.000đ</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Phí vận chuyển</p>
            <p className="text-sm font-medium">20.000đ</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="font-medium">Tổng tiền</p>
          <p className="font-bold">85.000đ</p>
        </div>
      </div>

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default PaymentStep;
