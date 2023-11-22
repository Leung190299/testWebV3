import Svg from '@/components/icon/svg';
import VoucherProfileModal from '@/components/pages/profiles/component/modal/modal-voucher-profile';
import React from 'react';

const ModalVoucherDetail = ({ voucher, onClose, voucherUsed }: { voucher: any; onClose: any; voucherUsed: any }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.querySelector('.trigger-custom-scroll-modal');
      if (element) {
        element.scrollTo(0, 0);
      }
      if (window.innerWidth < 768) {
        const element = document.querySelector('.trigger-custom-scroll-modal-mobile');
        if (element) {
          const parent = element.closest('div.z-1.fixed.inset-0.overflow-y-auto');
          if (parent) {
            parent.scrollTo(0, 0);
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container p-0 md:pt-12 md:px-10 pb-28 lg:p-0 lg:pt-12 relative lg:pb-28 min-h-[17.125rem] ">
      <div className="flex items-center">
        <VoucherProfileModal {...voucher} isPopup voucherUsed={!!voucherUsed} />,
        <button onClick={onClose}>
          <Svg
            src="/icons/line/close.svg"
            className="lg:right-8 md:right-4 md:top-16 md:h-14 md:w-14 cursor-pointer rounded-full bg-neutral-100 md:p-4 z-10 left-2 md:left-auto top-3 w-10 h-10 p-2 fixed"
          />
        </button>
      </div>
    </div>
  );
};

export default ModalVoucherDetail;
