import Svg from '@/components/icon/svg';
import { ModalVoucherMobile } from '@/components/pages/profiles/component/modal/modal-voucher-mobile';
import PaginationSimple from '@/components/pagination/pagination-simple';
import { modal } from '@/libs/modal';
import vouchersServices from '@/services/vouchers/vouchers';
import type { Model } from '@/types/model';
import { useEffect, useState } from 'react';

export const DiscountUsed = () => {
  const [vouchers, setVouchers] = useState<Model.Voucher[]>([]);

  const voucherFilter = () => {
    modal.confirm({
      content: <ModalVoucherMobile />,
      type: 'middle-sheet',
      title: 'Mức điểm',
      onReject() {},
      rejectLable: 'Xóa bộ lọc',
      confirmLable: 'Áp dụng'
    });
  };

  useEffect(() => {
    async function getHistoryVoucher() {
      const data = await vouchersServices.getListVoucher({ limit: 9 });
      // Fake delay calling api
      setVouchers(data.data);
    }

    void getHistoryVoucher();
  }, []);

  return (
    <>
      <div className="flex items-center md:hidden mb-4">
        <div className="grow" />
        <div onClick={voucherFilter} className="flex items-center">
          <span className={'text-neutral-800 text-sm font-bold mr-3'}>Tất cả</span>
          <Svg src="/icons/bold/down.svg" height={20} width={20} className="" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-lg:gap-4 max-lg:gap-y-6 max-md:grid-cols-2 max-md:mt-0 max-md:gap-x-3 max-md:gap-y-3">
        {/* {vouchers.map((voucher) => (
          <CardDiscountDivider
            key={voucher.id}
            // img={'https://images-ng.pixai.art/images/orig/f2e4aa6c-aa10-4014-96f0-197d995cdc5a'}
            img={{}}
            logo={voucher.brand.thumbnail}
            point={voucher.point}
            redemptionDeadline={'60 ngày'}
            voucherUsed
            src={voucher.id}
            title={voucher.title}
          />
        ))} */}
      </div>
      <div className=" max-md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={4} />
      </div>
      <div className=" md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div>
    </>
  );
};
