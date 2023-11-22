import { Fragment, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Barcode from 'react-barcode';

import { Dialog, Transition } from '@headlessui/react';
import { useGlobalContext } from '@/context/global';
import { Data } from '@/types/model';

import Svg from '../icon/svg';
import dayjs from 'dayjs';
import ContentFailVoucher, { TypeIdFailed } from './ContentFailVoucher';
import clsx from 'clsx';
import DebugUI from '../common/debug';

type IPropsPopupConfirmVoucher = {
  data: Data.VoucherDetail;
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};

export interface MethodPopupConfirmVoucher {
  onMakeIsUseNow(): void;
}

// eslint-disable-next-line react/display-name
const PopupConfirmVoucher = forwardRef<MethodPopupConfirmVoucher, IPropsPopupConfirmVoucher>(
  ({ open, setOpen, data, handleClose }, ref) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isUseNow, setIsUseNow] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [typeFail, setTypeFail] = useState<TypeIdFailed | undefined>(undefined);
    const [option, setOption] = useState<TypeIdFailed | 0>(0);

    const { status, toggleModalAuth } = useGlobalContext();
    const cancelButtonRef = useRef(null);
    const isLogin = status === 'authenticated';
    const handleSubmit = () => {
      if (!isLogin) {
        toggleModalAuth();
        return;
      }
      const res = { success: option === 0, error: option === 0 ? 1 : option };
      setIsSuccess(res.success);
      setIsFailed(!res.success);
      if (!res.success) {
        setTypeFail(res.error);
      }
    };

    useEffect(() => {
      if (open) {
        setIsSuccess(false);
        setIsUseNow(false);
        setIsFailed(false);
      }
    }, [open, option]);

    const handleCloseInside = () => {
      handleClose();
    };

    const onUseNow = () => {
      if (!isLogin) {
        toggleModalAuth();
        return;
      }
      setIsUseNow(true);
      setIsSuccess(false);
    };

    const ContentConfirm = () => (
      <div className="text-left">
        <h1 className="md:text-[32px] text-[18px]">
          <b>Bạn muốn đổi ưu đãi này?</b>
        </h1>
        <p className="py-8 text-base">
          Bạn có muốn sử dụng <b>{data.point}</b> để đổi Ưu đãi <b>{data.title}</b>
        </p>
        <div className="flex w-full justify-center gap-4">
          <button className="btn-secondary btn w-full rounded-full" onClick={handleCloseInside}>
            Hủy bỏ
          </button>
          <button className="btn-primary btn w-full rounded-full" onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    );

    const ContentSuccess = () => (
      <div className="flex flex-col items-center">
        <Svg src="/images/iwow/successVoucher.svg" className="h-20 w-20" />
        <h1 className="md:text-[32px] text-[18px]">
          <b>Đổi ưu đãi thành công!</b>
        </h1>
        <p className="py-8 text-base">
          Bạn nhớ sử dụng Voucher <b>{data.title}</b> trước ngày <b>{dayjs(data.expired_at).format('DD.MM.YYYY')}</b> bạn nhé!
        </p>
        <div className="flex w-full justify-center gap-4">
          <button className="btn-secondary btn w-full rounded-full" onClick={onUseNow}>
            Dùng ngay
          </button>
          <button className="btn-primary btn w-full rounded-full" onClick={handleCloseInside}>
            Xem Voucher
          </button>
        </div>
      </div>
    );

    const ContentUseNow = () => (
      <>
        <h1 className="text-[18px] md:text-[32px]">
          <b>Thông tin Voucher</b>
        </h1>
        <div className="relative md:mt-8 mt-4 flex gap-4 overflow-hidden rounded-lg bg-neutral-50">
          <div className="aspect-square md:aspect-video w-[108px] md:w-48 overflow-hidden">
            <img src={data.banner} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-1 md:pr-16">
            <p className="text-base font-bold text-neutral-800 md:max-w-none max-w-[200px]">{data.title}</p>
            <p className="text-sm text-neutral-500">HSD: 28/01/2023</p>
          </div>
          <div className="hidden md:block absolute right-4 top-3 h-12 w-12 overflow-hidden rounded-full">
            <img src={data.brand.thumbnail} alt={data.brand.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="mt-4 md:mt-10 flex flex-col items-center gap-2 text-sm md:text-base">
          <Barcode displayValue={false} width={3} height={80} value="4456466774" />4 4 5 6 4 6 6 7 7 4
        </div>
        <div className="flex flex-col gap-4 text-neutral-500">
          <p className="mt-4 text-sm md:text-base">
            Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán. Vui lòng không đưa ảnh chụp màn hình
          </p>
          <p className="text-sm">
            Hiệu lực:
            <br />
            <b className="text-sm md:text-base text-neutral-800">03.03.2023 - 10.03.2023</b>
          </p>
          <p className="text-sm">
            Hotline:
            <br />
            <b className="text-sm md:text-base text-neutral-800">1900299232</b>
          </p>
        </div>
        <div className="mt-8 flex w-full justify-center">
          <button className="btn-primary btn rounded-full px-16 py-4" onClick={handleCloseInside}>
            Xem Voucher
          </button>
        </div>
      </>
    );

    const ContentModal = () => {
      if (isFailed) return <ContentFailVoucher typeId={typeFail} />;
      if (isSuccess) return <ContentSuccess />;
      if (isUseNow) return <ContentUseNow />;
      return <ContentConfirm />;
    };

    return (
      <Dialog open={open} as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="fixed inset-0 bg-overlay-popup bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className={clsx(isUseNow ? 'items-end p-0' : 'p-4', 'flex min-h-full justify-center items-center')}>
            <div
              className={clsx('relative w-[560px] rounded-3xl bg-neutral-0 md:p-10 py-6 px-4', isUseNow && 'rounded-b-none md:rounded-3xl')}
            >
              <Svg
                src="/icons/line/close.svg"
                className="absolute right-4 top-4 max-sm:top-3 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
                onClick={handleCloseInside}
              />
              <ContentModal />
            </div>
          </div>
        </div>
        <DebugUI>
          <div className="p-2 bg-neutral-0">
            <div className="text-xs pb-6">
              Test các trường hợp
              <div>
                <select
                  value={option}
                  onChange={(e) => setOption(Number(e.target.value) as TypeIdFailed)}
                  className="border border-neutral-200 p-2 bg-neutral-0 w-full"
                >
                  <option value={0}>Thành công</option>
                  <option value={1}>Lỗi - Chưa phải hội viên</option>
                  <option value={2}>Lỗi - Không dành cho hạng hội viên của bạn</option>
                  <option value={3}>Lỗi - Không đủ điểm</option>
                  <option value={4}>Lỗi - Teng teng</option>
                </select>
              </div>
            </div>
          </div>
        </DebugUI>
      </Dialog>
    );
  }
);

export default memo(PopupConfirmVoucher);
