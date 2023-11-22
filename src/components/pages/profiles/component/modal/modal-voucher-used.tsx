import Barcode from 'react-barcode';
import { VoucherDetail } from '@/components/pages/profiles/component/modal/voucher-info';
import { useModal } from '@/libs/modal';

export const ModalVoucherUsed = (data: itelClubModel.Content) => {
  const { done } = useModal();
  return (
    // padding modal confirm pb-24
    <div className="-mb-8 max-md:-mb-20">
      <VoucherDetail {...data} />
      <div className={'flex flex-col gap-y-4'}>
        <div className="mt-4 md:mt-10 flex flex-col items-center text-sm md:text-base">
          <Barcode displayValue={false} width={3} height={80} value="4456466774" textMargin={0} />4 4 5 6 4 6 6 7 7 4
        </div>
        <p className="text-subtle-content text-sm font-normal">
          Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán. Vui lòng không đưa ảnh chụp màn hình
        </p>
        <div className={'flex flex-col gap-y-1'}>
          <p className=" text-subtle-content text-sm font-normal">Hiệu lực</p>
          <p className=" text-neutral-800 text-sm font-bold">03.03.2023 - 10.03.2023</p>
        </div>
        <div className={'flex flex-col gap-y-1'}>
          <p className="text-subtle-content text-sm font-normal">Hotline</p>
          <p className="text-neutral-800 text-sm font-bold">1900299232</p>
        </div>
      </div>

      <div className="card-actions-ticket p-0 bg-neutral-0 mt-8">
        <button
          className="btn-primary btn btn-md text-center text-sm rounded-full px-16 max-md:w-full py-3 m-auto max-md:m-0"
          onClick={done}
        >
          Xem voucher
        </button>
      </div>
    </div>
  );
};
