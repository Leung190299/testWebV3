import { useModal } from '@/libs/modal';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';

import { PHONE_NAME } from '@/constants/checkout.constants';
import useIsClient from '@/hooks/useIsClient';
import LoginService from '@/services/loginService';
import { phoneNumberRegex } from '@/utilities/validator';
import { ErrorMessage } from '@hookform/error-message';
import toast from 'react-hot-toast';
import ButtonLoading from '../button/button-loading';

type ModalAuthProps = {
  tabIndex?: number;
  type?: 'primary' | 'secondary';
  // onValid: SubmitHandler<IFormSignIn>;
};
 enum LoginUserStatus {
	UseOtherPhone,
	UseOtp,
	LockUser,
	Success,
	ForgotPass
  }

interface ISignIn {
  phone: string;
}

const ModalOtpLogin = (props: ModalAuthProps) => {
	const { type = 'primary' } = props;
	const [isLoadOTP, setIsLoadOTP] = useState<boolean>(false);

  useIsClient();

  const { done } = useModal();
  const methods = useForm<ISignIn>();

	const onSubmit: SubmitHandler<ISignIn> = (params) => {
		loginWithOtp(params.phone)
  };

  const onDeletePhone = () => {
    methods.resetField('phone');
  };
  const loginWithOtp = async (phone:string) => {
    setIsLoadOTP(true)
    const res = LoginService.getOPt(phone);
    await res
      .then((data) => {
        if (data.code == 200) {
          return done({ phone, type: LoginUserStatus.UseOtp });
        }
        setIsLoadOTP(false)
        return toast.error(data.message);
      })
      .catch((e) => {
        const errorResult: loginModel.response = e.response.data;
        setIsLoadOTP(false)
        return toast.error(errorResult.message);
      });
  };

  return (
    <div className="theme-light" data-theme="light">
      <HeaderMiddleAndFull title="" mobileTitle={''} desc="" />
      {type === 'primary' ? (
        <div className="w-full max-md:hidden text-center">
          <div className="text-center flex mb-4">
            <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
          </div>
          <span>
            Đăng nhập/ đăng ký tài khoản iTel <br /> để tận hưởng muôn vàn trải nghiệm, ưu đãi hấp dẫn.
          </span>
        </div>
      ) : (
        <div className="max-md:hidden">
          <h1 className="text-h4 font-bold">Yêu cầu đăng nhập/ đăng ký</h1>
          <p className="mt-2 text-subtle-content">Chức năng chỉ dành cho hội viên iTel. Bạn đã có tài khoản chưa?</p>
        </div>
      )}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 md:px-6 mt-6">
        <div className="md:hidden my-10">
          <div className="text-center flex">
            <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
          </div>
          <p className="max-md:text-sm text-center mt-6">
            Đăng nhập/ đăng ký tài khoản iTel <br />
            để tận hưởng muôn vàn trải nghiệm, ưu đãi hấp dẫn.
          </p>
        </div>
        <div className="input-leading-icon relative text-xl">
          <input
            className="input-bordered input rounded-full py-4d:py-[1.125rem] pl-14 pr-8"
            type="text"
            placeholder="Số điện thoại"
            data-headlessui-focus-guard="true"
            {...methods.register('phone', {
              validate(value) {
                const isValid = phoneNumberRegex.test(value.replace(/ /g, ''));
                return isValid || 'Số điện thoại không đúng định dạng. Vui lòng thử lại2';
              },
              onBlur: () => methods.trigger('phone'),
              required: 'Số điện thoại không đúng định dạng. Vui lòng thử lại'
            })}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <Svg src="/icons/line/phone.svg" width={24} height={24} />
          </div>
          {methods.watch('phone') && (
            <div onClick={onDeletePhone} className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-5">
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </div>
          )}
        </div>
        {methods.watch('phone') && (
          <ErrorMessage
            errors={methods.formState.errors}
            name={PHONE_NAME}
            render={({ message }) => (
              <p className="label">
                <span className="label-text-alt flex items-center text-red-500 first-letter:capitalize">
                  <Svg className="mr-1 h-4 w-4 inline" src="/icons/line/danger-circle.svg" />
                  {message}
                </span>
              </p>
            )}
          />
        )}
        <ButtonLoading
          className="btn-primary btn btn-sm max-md:h-12 md:btn-lg mt-6 w-full rounded-full"
          disabled={!methods.formState.isValid || methods.formState.isSubmitting}
          isLoading={isLoadOTP}
          type={'submit'}
        >
          Đăng nhập OTP
        </ButtonLoading>
      </form>
    </div>
  );
};

export default ModalOtpLogin;
