import Svg from '@/components/icon/svg';
import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import { useModal } from '@/libs/modal';
import React from 'react';
import HeaderModalFull from '@/components/modal/header/header-modal-full';

const ModalLoginUserNotFound = ({ phone }: { phone?: string }) => {
  const { done, close } = useModal();

  const useOtherPhoneNumber = () => {
    void done(1);
  };

  const registerNow = () => {
    void done(2);
  };

  return (
    <div className="text-center">
      <div className="flex items-center">
        <div>
          <h2 className="text-xl md:text-s-md font-bold">Tài khoản chưa tồn tại</h2>
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
        Chưa có tài khoản iTel được lập cho số điện thoại <span className="font-bold">{phone || '0351234567'}.</span> <br /> Vui lòng đăng
        ký tài khoản hoặc nhập số điện thoại khác.
      </p>
      <div className="flex flex-row gap-2 md:gap-4 mt-4 md:mt-8">
        <button
          onClick={useOtherPhoneNumber}
          className="btn-secondary max-md:h-[44px] max-md:px-2 max-md:text-sm btn btn-lg w-full rounded-full"
        >
          Sử dụng SĐT khác
        </button>
        <button onClick={registerNow} className="btn-primary max-md:h-[44px] max-md:px-2 max-md:text-sm btn btn-lg w-full rounded-full">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};
export default ModalLoginUserNotFound;
