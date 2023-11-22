import Svg from '@/components/icon/svg'
import Modal from '@/libs/modal';
import React from 'react';

const ModalUnlinkAccount = ({ onClose }: { onClose?(): void }) => {
  return (
    <div className="space-y-4 md:space-y-8 z-50">
        <div className="flex">
            <Modal.Heading title="Hủy liên kết Google?" />
            <Svg
                src="/icons/line/close.svg"
                className="absolute right-2 top-2 md:right-4 md:top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
                onClick={onClose}
            />
        </div>
      <Modal.ModalContent className="">
        <p className="text-base font-normal text-neutral-500">
          Bạn có chắc chắn muốn hủy liên kết tài khoản với Zalo không? Bấm “Hủy liên kết” để thực hiện thao tác này. Bạn có thể liên kết lại
          nếu muốn thay đổi.
        </p>
      </Modal.ModalContent>
      <Modal.ModalActions className="text-center">
        <div className="flex flex-row justify-center gap-4 ">
          <button onClick={onClose} className="btn btn-secondary rounded-full h-[44px] md:h-[56px]  btn-lg w-full md:min-w-[14.5rem]">
            Không hủy
          </button>
          <button onClick={onClose} type="submit" className="btn-primary h-[44px] md:h-[56px] btn btn-lg w-full md:min-w-[14.5rem] rounded-full">
            Hủy liên kết
          </button>
        </div>
      </Modal.ModalActions>
    </div>
  );
};
export default ModalUnlinkAccount;
