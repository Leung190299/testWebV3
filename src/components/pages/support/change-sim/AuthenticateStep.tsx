import { FC, useMemo, useState } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RadioInput from '@/components/form/RadioInput';
import Svg from '@/components/icon/svg';
import { modal } from '@/libs/modal';
import { phoneValidator } from '@/constants/validator.constants';
import { TestBtn } from '../TestBtn';

type FormPhoneValues = {
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  phone5: string;
};

const InitPhoneValues = {
  phone1: '',
  phone2: '',
  phone3: '',
  phone4: '',
  phone5: ''
};

const SchemaPhoneValidation = yup
  .object({
    phone1: phoneValidator,
    phone2: phoneValidator,
    phone3: phoneValidator,
    phone4: phoneValidator,
    phone5: phoneValidator
  })
  .required();

const Phone: FC<{ submit: Function; phonNumber: string }> = ({ submit, phonNumber }) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormPhoneValues>({
    defaultValues: InitPhoneValues,
    resolver: yupResolver(SchemaPhoneValidation),
    mode: 'all'
  });

  const submitForm = (payload: FormPhoneValues) => {
    if (payload.phone1 == '1') {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              <Svg className="h-full w-full" src="/icons/others/payment-failed.svg" />
              {/* <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" /> */}
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Số liên hệ chưa chính xác</h2>
            <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              Các số thuê bao bạn vừa nhập chưa trùng khớp với các số liên hệ gần đây nhất của thuê bao <b>{phonNumber}</b>.
              <br />
              Vui lòng kiểm tra lại thông tin hoặc thử cách xác thực khác.
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    submit(payload);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid col-span-3 gap-6">
        {['phone1', 'phone2', 'phone3', 'phone4', 'phone5'].map((name, index) => (
          <div key={name} className="col-span-1 ">
            <InputField inputLabel={`Số thuê bao ${index + 1}`} placeholder="Nhập số thuê bao" control={control} name={name} />
          </div>
        ))}
      </div>

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </>
  );
};

type FormIMeiValues = {
  iMei: string;
};

const InitIMeiValues = {
  iMei: ''
};

const SchemaIMeiValidation = yup
  .object({
    iMei: yup.string().required('Nhập số IMEI của máy dùng Sim')
  })
  .required();

const IMei: FC<{ submit: Function; phonNumber: string }> = ({ submit, phonNumber }) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormIMeiValues>({
    defaultValues: InitIMeiValues,
    resolver: yupResolver(SchemaIMeiValidation),
    mode: 'all'
  });

  const submitForm = (payload: FormIMeiValues) => {
    if (payload.iMei === '1') {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              <Svg className="h-full w-full" src="/icons/others/payment-failed.svg" />
              {/* <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" /> */}
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Số IMEI chưa chính xác</h2>
            <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              Số IMEI bạn vừa cung cấp chưa trùng khớp với thông tin thiết bị gần nhất sử dụng Sim <b>{phonNumber}</b>.
              <br />
              Vui lòng kiểm tra lại số IMEI hoặc thử cách xác thực khác.
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    submit(payload);
  };
  return (
    <>
      <div>
        <img src="/images/IMei.png" alt="" className="w-full max-w-full" />
      </div>
      <div className="flex justify-around md:-mt-10 mb-6">
        <p className="font-bold pr-5 md:pr-10">Cách 1</p>
        <p className="font-bold">Cách 2</p>
      </div>
      <div>
        <InputField inputLabel="Số IMEI" placeholder="Nhập số IMEI của máy dùng Sim" control={control} name="iMei" />
      </div>

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </>
  );
};

type FormDeviceValues = {
  deviceName: string;
};

const InitDeviceValues = {
  deviceName: ''
};

const SchemaDeviceValidation = yup
  .object({
    deviceName: yup.string().required('Nhập tên dòng máy điện thoại')
  })
  .required();

const Device: FC<{ submit: Function; phonNumber: string }> = ({ submit, phonNumber }) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormDeviceValues>({
    defaultValues: InitDeviceValues,
    resolver: yupResolver(SchemaDeviceValidation),
    mode: 'all'
  });

  const submitForm = (payload: FormDeviceValues) => {
    if (payload.deviceName === '1') {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              <Svg className="h-full w-full" src="/icons/others/payment-failed.svg" />
              {/* <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" /> */}
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Dòng máy chưa chính xác</h2>
            <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              Dòng máy điện thoại bạn vừa cung cấp chưa trùng khớp với thông tin thiết bị gần nhất sử dụng Sim <b>{phonNumber}</b>.
              <br />
              Vui lòng kiểm tra lại hoặc thử cách xác thực khác.
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    submit(payload);
  };
  return (
    <>
      <InputField
        inputLabel="Dòng máy điện thoại được sử dụng để lắp Sim gần nhất "
        placeholder="Nhập tên dòng máy điện thoại"
        control={control}
        name="deviceName"
      />

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px]  btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </>
  );
};

const OPTIONS = [
  {
    type: 'phone',
    title: '5 số liên hệ gần nhất',
    content: Phone
  },
  {
    type: 'iMei',
    title: 'Số IMEI máy điện thoại',
    content: IMei
  },
  {
    type: 'device',
    title: 'Dòng máy điện thoại',
    content: Device
  }
];

const AuthenticateStep: FC<{ submit: Function; phonNumber: string }> = ({ submit, phonNumber }) => {
  const [tab, setTab] = useState(0);

  const Content = useMemo(() => OPTIONS[tab].content, [tab]);
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {OPTIONS.map((option, index) => (
          <div key={option.type} className="gr">
            <RadioInput radioId={option.type} label={option.title} isChecked={tab === index} onClick={() => setTab(index)} />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Content submit={(v: any) => submit({ type: OPTIONS[tab].type, ...v })} phonNumber={phonNumber} />
      </div>
    </div>
  );
};

export default AuthenticateStep;
