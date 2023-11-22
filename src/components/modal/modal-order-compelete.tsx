import Svg from '@/components/icon/svg';
import ModalFilter from '@/components/modal/modal-filter';
import { useModal } from '@/libs/modal';
import React from 'react';

const ModalOrderComplete = ({ onClose }: { onClose?(): void }) => {
  const { done } = useModal();

  const onCloseModal = () => {
    if (onClose) {
      void onClose();
    }
  };
  const handlerRating = () => {
    if (onClose) {
      void onClose();
    }
    void done(1);
  };

  return (
    <div className="text-center">
      <div className="flex">
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-2 top-2 md:right-4 md:top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={onClose}
        />
      </div>
      <div className="w-16 h-16 mx-auto max-md:mt-8 mb-5">
        <Svg className="h-full w-full" src="/icons/others/order-complete.svg" />
      </div>
      <h2 className="text-xl md:text-s-md font-bold">Đơn hàng đã hoàn thành!</h2>
      <p className="mt-4 md:mt-8 text-sm md:text-base text-subtle-content whitespace-pre-line">
        Đơn hàng <span className="text-neutral-800 font-bold">#ITEL123456</span> đã được xác nhận giao thành công. Bạn có thể xem lại thông
        tin & đánh giá sản phẩm, dịch vụ trong đơn hàng tại mục đơn hàng đã giao. Cảm ơn bạn đã sử dụng dịch vụ của iTel!
      </p>
      <div className="flex flex-row gap-4 mt-4 md:mt-8">
        <button onClick={onCloseModal} className="btn-secondary text-sm md:text-base max-md:h-[44px] btn btn-lg w-full rounded-full">
          Tôi đã hiểu
        </button>
        <button onClick={handlerRating} className="btn-primary text-sm md:text-base hidden md:flex btn btn-lg w-full rounded-full">
          Đánh giá sản phẩm
        </button>
        <button
          onClick={handlerRating}
          className="btn-primary text-sm md:text-base max-md:h-[44px] md:hidden btn btn-lg w-full rounded-full"
        >
          Đánh giá
        </button>
      </div>
    </div>
  );
};
export default ModalOrderComplete;
