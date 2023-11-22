import Svg from '@/components/icon/svg';
import Images from '@/components/imasge';
import { useModal } from '@/libs/modal';
import { toCurrency } from '@/utilities/currency';
import clsx from 'clsx';
import { useState } from 'react';

const VoucherInfo = ({ data }: { data: itelClubModel.Content }) => {
  return (
    <div className="mt-8 rounded-lg flex relative bg-neutral-50">
       <Images
                source={Object.keys(data.images_rectangle!).map((key) => ({
                  media: `(max-width:${key}px)`,
                  //@ts-ignore
                  srcSet: data.images_rectangle![key]
                }))}
                src={data.images_rectangle!['640']}
                className={'aspect-video w-48 rounded-l-lg object-cover'}
              />


      <div className="absolute bottom-[-0.5px] left-0">
        <span className={clsx( 'tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2')}>
          Giảm {toCurrency(Number(data.price!))}
        </span>
      </div>
      <div className={'mx-4 my-3 w-full'}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex'}>
            <div className={'text-neutral-800 font-bold block grow'}>
              <p>{data.title}</p>
            </div>
            <div className="relative aspect-square w-12 flex-shrink-0 overflow-hidden rounded-full">
              <img src={data.brandImage} alt="logo image" className="absolute inset-0 object-cover" />
            </div>
          </div>

          <div className={'text-neutral-500 block'}>
            <p>HSD: {data.expired_date!.split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoucherUsedDetail = ({ data, close = function () {}, done = function () {} }: { data: itelClubModel.Content; close: any; done: any }) => {
  return (
    <div className="px-4 py-6 md:p-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-s-md font-bold">Thông tin Voucher</h2>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <VoucherInfo data={data} />
      <div className={'flex flex-col gap-y-4'}>
        <div className="mt-4 md:mt-10 flex flex-col items-center text-sm md:text-base">
          <img src={data.image_code} alt="" />
        </div>
        <p className=" text-subtle-content">
          Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán. Vui lòng không đưa ảnh chụp màn hình
        </p>
        <div className={'flex flex-col gap-y-1'}>
          <p className="max-md:hidden text-subtle-content">Hiệu lực</p>
          <p className="max-md:hidden text-neutral-800 font-bold">{data.expired_date!.split('T')[0]}</p>
        </div>
        <div className={'flex flex-col gap-y-1'}>
          <p className="max-md:hidden text-subtle-content">Hotline</p>
          <p className="max-md:hidden text-neutral-800 font-bold">1900299232</p>
        </div>
      </div>

      <div className="card-actions-ticket p-0 bg-neutral-0 mt-8">
        <button className="btn-primary btn btn-lg text-center rounded-full py-4 px-16 m-auto" onClick={done}>
          Xem voucher
        </button>
      </div>
    </div>
  );
};

const DetailVoucher = ({
  data,
  close = function () {},
  onClickConfirm = function () {}
}: {
  data: any;
  close: any;
  onClickConfirm: any;
}) => {
  return (
    <div className="px-4 py-6 md:p-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-s-md font-bold">Xác nhận dùng Voucher</h2>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <p className=" mt-2 text-subtle-content">
        Bấm “<span className={'text-neutral-500 font-bold'}>Xác nhận</span>” để dùng Voucher ngay. Sau khi Xác nhận, Voucher sẽ được hiện
        thông tin Barcode của Voucher.
      </p>
      <VoucherInfo data={data}  />
      <div className="card-actions-ticket p-0 bg-neutral-0 mt-8">
        <button className="btn-secondary btn btn-lg w-1/2 rounded-full" onClick={close}>
          Để sau
        </button>
        <button className="btn-primary btn btn-lg w-1/2 rounded-full" onClick={onClickConfirm}>
          Xác nhận dùng˝
        </button>
      </div>
    </div>
  );
};

export const ModalVoucherConfirm = ({ data }: { data: itelClubModel.Content }) => {
  const { close, done } = useModal();
  const [showDetail, setShowDetail] = useState(false);

  const onClickConfirm = () => {
    setShowDetail(true);
  };

  if (showDetail) {
    return <VoucherUsedDetail data={data} close={close} done={done} />;
  }
  return <DetailVoucher data={data} close={close} onClickConfirm={onClickConfirm} />;
};
