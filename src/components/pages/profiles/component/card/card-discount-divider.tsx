import Svg from '@/components/icon/svg';
import Images from '@/components/imasge';
import { ModalMobileVoucherDetail } from '@/components/pages/profiles/component/modal/modal-mobile-voucher-detail';
import { ModalVoucherConfirm } from '@/components/pages/profiles/component/modal/modal-voucher-confirm';
import ModalVoucherDetail from '@/components/pages/profiles/component/modal/modal-voucher-detail';
import { ModalVoucherUsed } from '@/components/pages/profiles/component/modal/modal-voucher-used';
import { modal } from '@/libs/modal';
import vouchersServices from '@/services/vouchers/vouchers';
import type { CustomProps } from '@/types/element-type';
import { toCurrency } from '@/utilities/currency';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: itelClubModel.Images;
  logo: string;
  point: number;
  voucherUsed?: boolean;
  src: string | number;
  voucher:itelClubModel.Content
}>;


const CardDiscountDivider = ({
  title,
  img = {},
  logo = '/image/url',
  redemptionDeadline,
  className,
  point,
  src = '',
  voucherUsed = false,
  voucher,
  ...rest
}: Props) => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUse, setOpenUse] = useState<boolean>(false);
  const [openUseMobile, setOpenUseMobile] = useState<boolean>(false);
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const [openSeeDetail, setOpenSeeDetail] = useState<boolean>(false);
  const [useVoucherDetail, setUseVoucherDetail] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);

    setUseVoucherDetail(false);
    setOpenUseMobile(false);
  };

  const handleCloseVoucher = () => {
    setOpenUse(false);

    setUseVoucherDetail(false);
    setOpenUseMobile(false);
  };

  const onCloseMobile = () => {
    setOpenUseMobile(false);
    setOpenSeeDetail(false);

  };

  const handleOpenConfirm = async () => {
    if (!src) return;
    try {
      const res = await vouchersServices.getDetailVoucher({ id: Number(src) });

      setOpen(true);
    } catch (e) {}
  };

  const handleOpenConfirmMobile = async () => {
    if (!src) return;
    try {
      const res = await vouchersServices.getDetailVoucher({ id: Number(src) });

      setOpenMobile(true);
      setOpen(true);
    } catch (e) {}
  };

  const handleOpenUseConfirm = async () => {
    try {

      openMobile ? setOpenUseMobile(true) : setOpenUse(true);

    } catch (e) {}
  };

  useEffect(() => {
    if (open && voucher) {
      modal.open({
        render(props) {
          return <ModalVoucherDetail voucherUsed={voucherUsed || useVoucherDetail} voucher={voucher} onClose={props.close} />;
        },
        transition: false,
        closeButton: false,
        className: 'modal-box shadow-itel !bg-neutral-50  trigger-custom-scroll-modal',
        classNameContainer: 'modal-full md:modal-bottom-sheet  trigger-custom-scroll-modal-mobile',
        modalId: 'trigger-custom-scroll-modal',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        onClose: handleClose,
        onDone: handleOpenUseConfirm
      });
      return;
    }
  }, [voucher, open, voucherUsed, useVoucherDetail]);

  useEffect(() => {
    if (openUse && voucher) {
      modal.open({
        render: <ModalVoucherConfirm data={voucher} />,
        onClose: handleCloseVoucher,
        onDone() {
          handleCloseVoucher();
          setUseVoucherDetail(true);
          handleOpenConfirm().catch(() => {});
        },
        transition: false,
        className: 'modal-box shadow-itel md:max-w-[35rem]',
        classNameContainer: 'modal-full md:modal-middle',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
      });
      return;
    }
  }, [voucher, open, openUse, img, logo]);

  useEffect(() => {
    if (openUseMobile && voucher) {
      modal.confirm({
        content: <ModalMobileVoucherDetail {...voucher} />,
        type: 'middle-sheet',
        title: 'Thông tin Voucher',
        onReject() {
          onCloseMobile();
        },
        onClose() {
          onCloseMobile();
        },
        onDone() {
          setOpenSeeDetail(true);
        },
        rejectLable: 'Để sau',
        confirmLable: 'Xác nhận dùng'
      });
      return;
    }
  }, [voucher, open, openUseMobile, img, logo]);

  useEffect(() => {
    if (openUseMobile && voucher && openSeeDetail) {
      modal.confirm({
        content: <ModalVoucherUsed {...voucher} />,
        onClose() {
          setOpenSeeDetail(false);

          onCloseMobile();
        },
        onDone() {
          setOpenSeeDetail(false);
          onCloseMobile();
          setOpenUseMobile(false);
          setUseVoucherDetail(true);
          handleOpenConfirm().catch(() => {});
        },
        type: 'middle-sheet',
        title: 'Thông tin Voucher'
      });
      return;
    }
  }, [voucher, open, openSeeDetail, openUseMobile, img, logo]);

  return (
    <>
      <div className="max-md:hidden">
        <div className={clsx('card rounded-t-xl', className)} {...rest}>
          <figure className="aspect-video">
            <div className="relative aspect-video overflow-hidden lg:w-full">
              <Images
                source={Object.keys(img).map((key) => ({
                  media: `(max-width:${key}px)`,
                  //@ts-ignore
                  srcSet: img[key]
                }))}
                src={img['640']}
                className="h-full w-full bg-neutral-0 object-cover "
              />

              <div className="absolute bottom-0 left-0">
                <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2">Giảm {toCurrency(Number(voucher.price!))}</span>
              </div>
            </div>
          </figure>
          <div className="card-body gap-1 bg-neutral-0 px-4 py-3">
            <h5 className="card-title justify-between gap-3 font-bold">
              {title}
              <div className="relative aspect-square w-12 flex-shrink-0 overflow-hidden rounded-full">
                <img src={logo} alt="logo image" className="absolute inset-0 object-cover" />
              </div>
            </h5>
            <p className="card-desc text-sm">HSD: {voucher.expired_date!.split('T')[0]}</p>
          </div>
          <div className="card-divider bg-neutral-0" />
          {!voucherUsed && (
            <div className="card-actions-ticket bg-neutral-0  ">
              {/* <button className="btn-secondary btn btn-sm w-1/2 rounded-full" onClick={handleOpenConfirm}>
                <span className={'whitespace-nowrap'}>Chi tiết</span>
              </button> */}
              <button className="btn-secondary btn btn-sm w-full rounded-full" onClick={handleOpenUseConfirm}>
                <span className={'whitespace-nowrap'}>Dùng mã</span>
              </button>
            </div>
          )}
          {voucherUsed && (
            <div className="card-actions-ticket bg-neutral-0 ">
              <button className="btn-secondary btn btn-sm w-full rounded-full" onClick={handleOpenConfirm}>
                <span className={'whitespace-nowrap'}>Chi tiết</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden" onClick={handleOpenConfirmMobile}>
        <div className={clsx('bg-neutral-0 rounded-lg border border-solid border-neutral-200', className)}>
          <div className="relative w-full">
            <Images
              source={Object.keys(img).map((key) => ({
                media: `(max-width:${key}px)`,
                //@ts-ignore
                srcSet: img[key]
              }))}
              src={img['640']}
              className={clsx('rounded-lg', 'object-cover aspect-video')}
            />

            <div className="absolute bottom-0 left-0">
              <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 font-bold text-xs pl-2 py-1">
                Giảm {toCurrency(Number(voucher.price!))}
              </span>
            </div>
          </div>
          <div className={'p-2 pb-4'}>
            <div className="flex items-start space-x-3">
              <p className="text-neutral-800  font-medium">{voucher.title}</p>
              <Image src={voucher.brandImage!} width={30} height={30} alt={''} className='bg-neutral-200 rounded-full' />
            </div>
            <span className="text-neutral-500 font-medium text-xs">HSD: {voucher.expired_date!.split('T')[0]}</span>
            <div className="mt-1">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center w-full">
                    <div className="flex items-center grow">
                      <Svg src="/icons/line/calendar.svg" width={14} height={15} />
                      <p className="text-neutral-500 font-medium text-xs mx-1.5">{redemptionDeadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!voucherUsed && (
              <button className="btn-secondary btn btn-xs px-3 rounded-full mt-2" onClick={handleOpenUseConfirm}>
                <span className={'whitespace-nowrap'}>Dùng mã</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDiscountDivider;
