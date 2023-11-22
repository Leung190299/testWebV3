import Svg from '@/components/icon/svg';
import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import HeaderModalFull from '@/components/modal/header/header-modal-full';
import { useModal } from '@/libs/modal';
import LoginService from '@/services/loginService';
import { User } from '@/services/user/model';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ButtonLoading from '../button/button-loading';

type IForm = {
  currentPassword: string;
};
export enum LoginUserStatus {
  UseOtherPhone,
  UseOtp,
  LockUser,
  Success,
  ForgotPass
}
const ModalLoginUser = ({ isOtherNetwork, phone }: { isOtherNetwork: boolean; phone: string }) => {
  const { done, close } = useModal<Partial<loginModel.dataType>>();

  const { handleSubmit, watch, register, formState, setError, clearErrors } = useForm<IForm>({});
  const [numberError, setNumberError] = useState<number>(5);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isLoadOTP, setIsLoadOTP] = useState<boolean>(false);

  const loginNow: SubmitHandler<IForm> = async (param) => {
    const response = await User.login(phone, param.currentPassword);
    if (!response.success) return setError('currentPassword', { message: response.message });
    if (phone === '0351234568') {
      localStorage.setItem('isOtherNetwork', 'true');
    } else {
      localStorage.setItem('isOtherNetwork', 'false');
    }
    if (response.user) {
      localStorage.setItem('__logged_id', String(response.user.id));
      return done({ type: LoginUserStatus.Success });
    }

    if (param.currentPassword !== '123456') {
      setError('currentPassword', { message: 'Tài khoản hoặc mật khẩu chưa chính xác. Vui lòng thử lại' });
      return setNumberError((cur) => {
        if (cur === 1) {
          done({ type: LoginUserStatus.LockUser });
          return 0;
        }
        return cur - 1;
      });
    }
    return done({ type: LoginUserStatus.Success });
    // login thanh cong
  };
  const loginWithOtp = async () => {
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
  const forGotPassword = () => {
    return done({ type: LoginUserStatus.ForgotPass });
  };

  const loginWithOtherPhone = () => {
    return done({ type: LoginUserStatus.UseOtherPhone });
  };
  const dataPassWord = watch('currentPassword');

  return (
    <>
      <HeaderModalFull className="md:hidden border-none" title={''} />
      <div className="hidden md:block">
        <HeaderMiddleAndFull title="" />
      </div>
      <form className="flex flex-col justify-center text-center max-md:px-4 max-md:pt-10" onSubmit={handleSubmit(loginNow)}>
        <div className="mx-auto">
          <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
        </div>
        <p className="text-neutral-500 text-sm md:text-base font-normal mt-4 mb-8">
          Sử dụng mật khẩu hoặc OTP để đăng nhập <br /> với số điện thoại{' '}
          <span className="text-neutral-800 md:text-neutral-500 font-bold text-sm md:text-xl">{formatPhoneNumber(phone)}</span>
        </p>
        <div className="mb-4 md:mb-7">
          <div className="input-leading-icon relative text-xl">
            <input
              className={clsx(!isShowPass && dataPassWord ? 'text-3xl' : '', 'input-bordered input rounded-full pl-5 h-[64px] ')}
              type={isShowPass ? 'text' : 'password'}
              placeholder="Nhập mật khẩu của bạn"
              data-headlessui-focus-guard="true"
              {...register('currentPassword', {
                onChange: () => clearErrors()
              })}
            />
            <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-5" onClick={() => setIsShowPass((cur) => !cur)}>
              <Svg src={isShowPass ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
            </div>
          </div>
          {formState.errors.currentPassword && (
            <div className="flex flex-row gap-1 mt-2">
              <img src="/icons/others/error-cycle.png" width={16} height={16} alt="cover" />
              <span className="label-text-alt text-red-500 first-letter:capitalize whitespace-pre">
                {formState.errors.currentPassword.message}
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="btn-primary btn btn-lg w-full rounded-full mb-2">
            Đăng nhập
          </button>
          {formState.errors.currentPassword && (
            <span className="text-neutral-500 font-normal text-xs">
              Bạn còn <span className="label-text-alt text-red-500 text-xs">0{numberError}</span> lần thử lại trước khi tài khoản bị khóa
              tạm thời
            </span>
          )}
        </div>
        {!isOtherNetwork && (
          <>
            <div className="text-sm overflow-hidden px-8 text-center text-neutral-300 my-6 md:my-8">
              <div className="divider-hr">
                <span className="text-subtle-content text-sm font-medium">hoặc</span>
              </div>
            </div>
            <ButtonLoading onClick={loginWithOtp} type="button" className="bg-neutral-100 btn btn-lg w-full text-neutral-800 rounded-full"  isLoading={isLoadOTP}>
              Đăng nhập bằng OTP
            </ButtonLoading>
          </>
        )}
        <div className="flex flex-row justify-center mt-6 md:mt-7">
          <p onClick={forGotPassword} className="text-neutral-500 text-base font-bold cursor-pointer">
            Quên mật khẩu
          </p>
          <span className="text-neutral-500 h-6 w-[1px] ml-9 mr-9">|</span>
          <p onClick={loginWithOtherPhone} className="text-neutral-500 text-base font-bold cursor-pointer">
            Sử dụng SĐT khác
          </p>
        </div>
      </form>
    </>
  );
};
export default ModalLoginUser;
