import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import React from 'react';

const ModalConfirmOrder = ({ onClose }: { onClose?(): void }) => {
  const { done } = useModal();

  const closeModal = () => {
    if (onClose) {
      void onClose();
    }
  };
  const onConfirm = () => {
    if (onClose) {
      void onClose();
    }
    void done(1);
  };

  return (
    <div className="text-center">
      <div className="flex">
        <h2 className="text-[17px] md:text-s-md text-left font-bold">Xác nhận đã nhận được hàng</h2>
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-2 top-2 md:right-4 md:top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={onClose}
        />
      </div>
      <p className="mt-4 md:mt-8  text-base font-normal text-neutral-500 text-left whitespace-pre-line">
        Tôi xác nhận tôi đã nhận và hài lòng với sản phẩm. Sẽ không có yêu cầu Hoàn tiền hay Trả hàng sau khi tôi xác nhận
      </p>
      <div className="flex flex-row gap-4 mt-4 md:mt-8">
        <button onClick={closeModal} className="btn-secondary max-md:h-[44px] btn btn-lg w-full rounded-full">
          Không
        </button>
        <button onClick={onConfirm} className="btn-primary btn max-md:h-[44px] btn-lg w-full rounded-full">
          Xác nhận
        </button>
      </div>
    </div>
  );
};
export default ModalConfirmOrder;
