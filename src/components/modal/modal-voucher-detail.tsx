import { modal, useModal } from '@/libs/modal';
import React from 'react';
import VoucherContent, { VoucherContentProps } from '../pages/voucher/voucher-content';
import Svg from '../icon/svg';
import HeaderAppDefault from '../header/header-app-default';

const ModalVoucherDetail = (props: VoucherContentProps) => {
  const { close } = useModal();
  return (
    <div className="max-md:px-0 pb-24 md:pb-12 xl:pb-0">
      <HeaderAppDefault type="fixed" mode="close" title="Thông tin Voucher" />
      <div>
        <button
          type="button"
          className="max-md:hidden left-4 md:left-auto md:right-4 fixed top-16 btn-tertiary z-10 transition-default btn btn-circle"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <VoucherContent {...props} isModal />
    </div>
  );
};

export const toggleModalVoucher = (props: VoucherContentProps) => {
  modal.open({
    render: <ModalVoucherDetail {...props} />,
    transition: false,
    closeButton: false,
    className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100 md:py-12',
    classNameContainer: 'modal-full md:modal-bottom-sheet',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
  });
};

export default ModalVoucherDetail;
