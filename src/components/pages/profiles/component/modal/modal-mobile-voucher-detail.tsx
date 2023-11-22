import React from 'react';
import { VoucherDetail } from '@/components/pages/profiles/component/modal/voucher-info';

export const ModalMobileVoucherDetail = (data:itelClubModel.Content) => {
  return (
    <div className="-mb-1">
      <VoucherDetail {...data} />
      <div className="text-neutral-500 font-normal text-sm mt-4">
        Bấm <span className="text-neutral-800 font-bold">“Xác nhận”</span> để dùng Voucher ngay. Sau khi Xác nhận, Voucher sẽ được hiện
        thông tin Barcode của Voucher.
      </div>
    </div>
  );
};
