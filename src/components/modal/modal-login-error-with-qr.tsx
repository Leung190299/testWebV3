import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import { useModal } from '@/libs/modal';
import React from 'react';

const ModalLoginErrorWithQr = () => {
  const { done } = useModal();

  const retryWithPhone = () => {
    void done(1);
  };
  const retryWithQr = () => {
    void done(0);
  };

  return (
    <div className="text-center max-md:px-4">
      <HeaderMiddleAndFull title="Đã có lỗi xảy ra" />
      <p className="mt-4 md:mt-8  text-base font-normal text-neutral-500 text-left whitespace-pre-line">
        Đã có lỗi xảy ra trong quá trình đăng nhập <br /> Vui lòng thử lại hoặc chọn cách đăng nhập khác!
      </p>
      <div className="flex flex-row gap-4 mt-4 md:mt-8">
        <button onClick={retryWithPhone} className="btn-secondary max-md:text-sm btn btn-lg w-full rounded-full">
          Đăng nhập bằng SĐT
        </button>
        <button onClick={retryWithQr} className="btn-primary max-md:text-sm btn btn-lg w-full rounded-full">
          Thử lại
        </button>
      </div>
    </div>
  );
};
export default ModalLoginErrorWithQr;
