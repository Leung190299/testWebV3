import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import React, { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const ModalCanCelOrder = ({ onClose }: { onClose?(): void }) => {
  const { done } = useModal();

  const handlerConfirm = useCallback(() => {
    if (onClose) {
      void onClose();
    }
    done(2);
    toast.success('Hủy đơn hàng #ITEL123456 thành công');
  }, [onClose, done]);

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex">
        <span className="md:text-s-md text-xl font-bold text-neutral-800">Xác nhận hủy đơn hàng?</span>
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-2 top-2 md:right-4 md:top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={onClose}
        />
      </div>
      <div className="">
        <p className="text-base font-normal text-neutral-500">
          Bạn chắc chắn muốn hủy đơn hàng #ITEL123456? <br /> Khi bấm xác nhận, sản phẩm sẽ không còn tồn tại trong giỏ hàng và bạn không
          thể quay trở lại thao tác này.
        </p>
      </div>
      <div className="text-center">
        <div className="flex flex-row justify-center gap-4 ">
          <button onClick={onClose} className="btn btn-secondary rounded-full h-[44px] md:h-[56px]  btn-lg w-full md:min-w-[14.5rem]">
            Không
          </button>
          <button
            onClick={handlerConfirm}
            type="submit"
            className="btn-primary h-[44px] md:h-[56px] btn btn-lg w-full md:min-w-[14.5rem] rounded-full"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalCanCelOrder;
