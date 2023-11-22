import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';

import { PHONE_NAME } from '@/constants/checkout.constants';
import { PhoneSchemaValidation } from '@/constants/validator.constants';

import dataService from '@/services/dataService';
import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';

type Props = {
  pack: dataModel.Pack;
};

const ModalCheckPhone = (props: Props) => {
  const { done, initialFocus } = useModal();
  const methods = useForm<{ phone: string }>({ resolver: yupResolver(PhoneSchemaValidation) });

  const onSubmit: SubmitHandler<{ phone: string }> = async (values) => {
    if (!values.phone.startsWith('087')) {
      methods.setError('phone', { message: 'Vui lòng nhập số điện thoại thuộc nhà mạng iTel để sử dụng dịch vụ!' });
    } else {
      try {
        const res = await dataService.checkPhonePack({ phone: values.phone, pack: props.pack.Name! });
        return done({ ...res, phone: values.phone });
      } catch (error) {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        return done({ ...dataError, phone: values.phone });
      }
    }
  };

  const isValid = methods.formState.isValid;
  const { ref, ...rest } = methods.register(PHONE_NAME);
  return (
    <>

        <HeaderMiddleAndFull title="Thông tin thuê bao" desc="Vui lòng nhập số điện thoại muốn đăng ký gói cước." />
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4">
          <p className="md:hidden text-subtle-content">Vui lòng nhập số điện thoại muốn đăng ký gói cước.</p>
          <div className="mt-8 md:mt-0">
            <span className="label-text text-base" aria-required>
              Số điện thoại
            </span>
            <input
              className="input w-full input-bordered mt-2"
              placeholder="Nhập số điện thoại"
              {...rest}
              ref={(r) => (ref(r), (initialFocus!.current = r))}
            />
            <ErrorMessage
              errors={methods.formState.errors}
              name={PHONE_NAME}
              render={({ message }) => (
                <p className="label-text mt-2 text-red-500 flex">
                  <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                  {message}
                </p>
              )}
            />
          </div>
          <div className="mt-8">
            <div className="w-1/2 px-3 mx-auto">
              <button className="btn btn-primary rounded-full w-full" disabled={!isValid} onClick={methods.handleSubmit(onSubmit)}>
                Tiếp tục
              </button>
            </div>
            <p className="mt-6 text-subtle-content text-center">
              <span className="max-md:block">Bạn chưa có Sim?</span>
              <Link href={Routers.SIM} className="text-red-500">
                <b> Mua Sim với gói cước </b>
              </Link>
              ngay nhé.
            </p>
          </div>
        </div>

      {/* <DebugUI>
        <div className="bg-neutral-50 rounded-r-xl p-3">
          {[

            { name: 'Gói cước đang dùng bị trùng', value: ModalCheckPhone.PHONE_USING_SAME_DATA_PACK },
            { name: 'Đang dùng gói khác', value: ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK },
            { name: 'Chưa có gói nào', value: ModalCheckPhone.PHONE_NOT_USING_DATA_PACK },

          ].map(({ name, value }) => (
            <label key={value} className="flex gap-x-2">
              <input
                type="radio"
                value={value}
                name="phone"
                onChange={(e) => {
                  methods.setValue('phone', e.target.value);
                  methods.trigger('phone', { shouldFocus: true });
                }}
              />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </DebugUI> */}
    </>
  );
};

// ModalCheckPhone.INVALID_PHONE = '0987654321';
ModalCheckPhone.PHONE_USING_SAME_DATA_PACK = 402;
ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK = 410;
ModalCheckPhone.PHONE_NOT_USING_DATA_PACK = 401;
ModalCheckPhone.SUCCESS = 200;

export function modalPhoneCheck(
  pack: dataModel.Pack,
  done?: (
    data: dataModel.Response<dataModel.resultPack> & {
      phone: string;
    }
  ) => void | Promise<void>
) {

  return modal.open({
    render: <ModalCheckPhone pack={pack} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone: done
  });
}

export default ModalCheckPhone;
