import Svg from '@/components/icon/svg';
import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import Modal from '@/libs/modal';
import { useModal } from '@/libs/modal';
import clsx from 'clsx';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type IForm = {
  password: string;
  rePassword: string;
};
const ModalLoginUpdatePassword = () => {
  const { done, reject } = useModal();

  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isShowRePass, setIsShowRePass] = useState<boolean>(false);
  const { handleSubmit, watch, register, formState, setError, clearErrors } = useForm<IForm>({});
  const handlerClose = () => {
    return reject(null);
  };
  const onSubmit: SubmitHandler<IForm> = (value) => {
    if (value && value.password !== value.rePassword) {
      return setError('rePassword', { message: 'oke' });
    }
    return done(null);
  };
  const dataPassWord = watch('password');
  const dataRePassword = watch('rePassword');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div onClick={handlerClose} className="max-md:hidden flex flex-row gap-2 items-center cursor-pointer -mt-2">
        <Svg src="/icons/line/arrow-left.svg" width={15} height={15} />
        <p className="font-bold"> Quay lại</p>
      </div>
      <HeaderMiddleAndFull title="" />
      <div className="mx-auto max-md:mt-10">
        <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
      </div>
      <div className="container md:px-0 bg-neutral-0 pt-4 text-subtle-content text-center">
        <p className="text-center max-md:text-sm">
          Bổ sung mật khẩu mới để bảo mật cho tài khoản của bạn & sử dụng cho những lần đăng nhập sau
        </p>
        <div className="input-leading-icon relative text-xl mt-8">
          <input
            className={clsx(!isShowPass && dataPassWord ? 'text-3xl' : '', 'h-[64px] input-bordered input rounded-full pl-14')}
            type={isShowPass ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            {...register('password', {
              required: true,
              onChange: () => clearErrors()
            })}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <Svg src="/icons/line/lock.svg" width={24} height={24} />
          </div>
          <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-5" onClick={() => setIsShowPass((cur) => !cur)}>
            <Svg src={isShowPass ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
          </div>
        </div>

        <div className="input-leading-icon relative text-xl mt-4 md:mt-6">
          <input
            className={clsx(!isShowRePass && dataRePassword ? 'text-3xl' : '', 'input-bordered input  rounded-full pl-14 h-[64px]')}
            type={isShowRePass ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            {...register('rePassword', {
              required: true,
              onChange: () => clearErrors()
            })}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
            <Svg src="/icons/line/lock.svg" width={24} height={24} />
          </div>
          <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-5" onClick={() => setIsShowRePass((cur) => !cur)}>
            <Svg src={isShowRePass ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
          </div>
        </div>
        {formState.errors.rePassword && (
          <div className="flex flex-row gap-1 mt-2">
            <img src="/icons/others/error-cycle.png" width={16} height={16} alt="cover" />
            <span className="label-text-alt text-red-500 first-letter:capitalize">Mật khẩu không trùng khớp. Vui lòng thử lại</span>
          </div>
        )}

        <Modal.ModalActions className="text-center mt-4 md:mt-6">
          <button disabled={!formState.isValid} type="submit" className="btn-primary btn btn-lg w-full rounded-full">
            Hoàn tất
          </button>
        </Modal.ModalActions>
      </div>
    </form>
  );
};
export default ModalLoginUpdatePassword;
