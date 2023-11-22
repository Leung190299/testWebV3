import ModalFilter from '@/components/modal/modal-filter';
import { useModal } from '@/libs/modal';
import React from 'react';
import HeaderMiddle from '@/components/modal/header/header-middle';
import Svg from '@/components/icon/svg';

const ModalLoginLookUser = () => {
  const { done, close } = useModal();

  const retryWithOtp = () => {
    void done(1);
  };
  const retryWithOtherPhone = () => {
    void done(2);
  };

  return (
    <div className="text-center">
      <div className="flex items-center">
        <div>
          <h2 className="text-xl md:text-s-md font-bold">Tài khoản đã bị khóa!</h2>
        </div>
        <button
          className="btn-ghost btn btn-circle absolute right-4 md:right-5 top-3 md:top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <p className="mt-4 md:mt-8  text-base font-normal text-neutral-500 text-left whitespace-pre-line">
        Tài khoản iTel liên kết với số điện thoại <span className="font-bold">0351234567 </span> đã tạm thời bị khóa. Vui lòng xác thực OTP
        để kích hoạt lại tài khoản.
      </p>
      <div className="flex flex-row max-md:text-sm max-md:gap-3 gap-4 mt-4 md:mt-8">
        <button onClick={retryWithOtherPhone} className="max-md:px-3 btn-secondary btn btn-lg w-full rounded-full">
          Dùng<span className="max-md:hidden mx-1"> tài khoản </span>
          <span className="md:hidden mx-1"> SĐT </span>khác
        </button>
        <button onClick={retryWithOtp} className="btn-primary btn btn-lg w-full rounded-full">
          Xác thực OTP
        </button>
      </div>
    </div>
  );
};
export default ModalLoginLookUser;
