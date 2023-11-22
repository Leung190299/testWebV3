import HeaderProfileModal from '@/components/header/header-profile-modal';
import Svg from '@/components/icon/svg';
import Modal from '@/libs/modal';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
type IForm = {
  currentPassword: string;
  newPassword: string;
  reTypePassword: string;
};
const ModalUpdatePassword = ({ onClose }: { onClose?(): void }) => {
  const { handleSubmit, register, formState } = useForm<IForm>({});
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isShowRePass, setIsShowRePass] = useState<boolean>(false);
  const [isShowRePass2, setIsShowRePass2] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IForm> = (values) => {
    onClose?.();
    toast.success('Đã cập nhật Mật khẩu');
  };
  const isValid = formState.isValid && formState.isDirty;
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="h-full">
      <div className="md:flex hidden">
        <Modal.Heading title="Đổi mật khẩu" />
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={onClose}
        />
      </div>
      <HeaderProfileModal onClose={onClose} title="Đổi mật khẩu" />
      <div className="h-2 bg-neutral-100 md:hidden" />
      <div className="body-modal flex flex-col justify-between h-[88%] p-4">
        <Modal.ModalContent className="flex flex-col md:mb-8">
          <div className="input-leading-icon relative text-xl mb-4 md:mb-7">
            <input
              className="input-bordered input rounded-xl py-4d:py-[1.125rem] max-md:!pl-4 md:pl-14"
              type={isShowPass ? 'text' : 'password'}
              placeholder="Nhập mật khẩu hiện tại"
              {...register('currentPassword', {
                required: true
              })}
            />
            <div className="pointer-events-none max-md:hidden absolute inset-y-0 left-0 flex items-center pl-5">
              <Svg src="/icons/line/lock.svg" width={24} height={24} />
            </div>
            <div
              className="cursor-pointer md:hidden absolute inset-y-0 right-0 flex items-center pr-5"
              onClick={() => setIsShowPass((cur) => !cur)}
            >
              <Svg src={isShowPass ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
            </div>
          </div>
          <div className="input-leading-icon relative text-xl mb-4 md:mb-7">
            <input
              className="input-bordered input rounded-xl py-4d:py-[1.125rem] max-md:!pl-4 md:pl-14"
              type={isShowRePass ? 'text' : 'password'}
              placeholder="Nhập mật khẩu mới"
              {...register('newPassword', {
                required: true
              })}
            />
            <div className="pointer-events-none max-md:hidden absolute inset-y-0 left-0 flex items-center pl-5">
              <Svg src="/icons/line/lock.svg" width={24} height={24} />
            </div>
            <div
              className="cursor-pointer md:hidden absolute inset-y-0 right-0 flex items-center pr-5"
              onClick={() => setIsShowRePass((cur) => !cur)}
            >
              <Svg src={isShowRePass ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
            </div>
          </div>
          <div className="input-leading-icon relative text-xl">
            <input
              className="input-bordered input rounded-xl py-4d:py-[1.125rem] max-md:!pl-4 md:pl-14"
              type={isShowRePass2 ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu mới"
              {...register('reTypePassword', {
                required: true
              })}
            />
            <div className="pointer-events-none max-md:hidden absolute inset-y-0 left-0 flex items-center pl-5">
              <Svg src="/icons/line/lock.svg" width={24} height={24} />
            </div>
            <div
              className="cursor-pointer md:hidden absolute inset-y-0 right-0 flex items-center pr-5"
              onClick={() => setIsShowRePass2((cur) => !cur)}
            >
              <Svg src={isShowRePass2 ? '/icons/line/eye-on.svg' : '/icons/line/eye-off.svg'} width={24} height={24} />
            </div>
          </div>
        </Modal.ModalContent>
        <Modal.ModalActions className="text-center">
          <button type="submit" disabled={!isValid} className="btn-primary btn btn-lg w-full md:w-fit md:min-w-[14.5rem] rounded-full">
            Xác nhận
          </button>
        </Modal.ModalActions>
      </div>
    </form>
  );
};
export default ModalUpdatePassword;
