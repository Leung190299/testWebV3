import Svg from '@/components/icon/svg';
import CardDiscountDivider from '@/components/pages/profiles/component/card/card-discount-divider';
import { ModalVoucherMobile } from '@/components/pages/profiles/component/modal/modal-voucher-mobile';
import { modal } from '@/libs/modal';
import vouchersServices from '@/services/vouchers/vouchers';
import type { Model } from '@/types/model';
import { useEffect, useState } from 'react';
type Props = {
  data:itelClubModel.Content[]
}
export const DiscountNotUsed = ({data}:Props) => {
  const [vouchers, setVouchers] = useState<Model.Voucher[]>([]);
  const [dataSelect, setDataSelect] = useState<string>('Tất cả');
  const voucherFilter = () => {
    modal.confirm({
      content: <ModalVoucherMobile onSelect={setDataSelect} />,
      type: 'middle-sheet',
      title: 'Mức điểm',
      onReject() {
        setDataSelect('Tất cả');
      },
      onDone() {},
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
          <span className={'text-neutral-800 text-sm font-bold mr-3'}>{dataSelect}</span>
          <Svg src="/icons/bold/down.svg" height={20} width={20} className="" />
        </div>
      </div>
      <div className=" grid grid-cols-3  max-lg:gap-4 max-lg:gap-y-6 gap-3 max-md:grid-cols-2 max-md:mt-0 max-md:gap-x-3 max-md:gap-y-3">
        {data.map((voucher, index) => (
          <CardDiscountDivider
            key={voucher.id}
            img={voucher.images_rectangle!}
            logo={voucher.brandImage!}
            point={0}
            src={0}
            redemptionDeadline={'60 ngày'}
            title={voucher.title!}
            voucher={voucher}
          />
        ))}
      </div>
      {/* <div className=" max-md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={4} />
      </div>
      <div className=" md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div> */}
    </>
  );
};
