import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Comment from '@/components/comment/comment';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import ModalCanCelOrder from '@/components/modal/modal-cancel-order';
import ModalConfirmOrder from '@/components/modal/modal-confirm-order';
import ModalOrderComplete from '@/components/modal/modal-order-compelete';
import ModalOrderSupport from '@/components/modal/modal-order-support';
import ModalReviewOrderComplete from '@/components/modal/modal-review-complete-order';
import ModalSupport, { OrderSupport, exampleOrder } from '@/components/modal/modal-support';
import imageProduct from '@/components/pages/assets/image-product.png';
import imageCard from '@/components/pages/assets/image-sim.png';
import Momo from '@/components/pages/assets/Momo.png';
import payment1 from '@/components/pages/assets/payment-1.png';
import imageGift from '@/components/pages/assets/product-gift.png';
import packageSim from '@/components/pages/assets/goi-cuoc.png';

import ProductItem from '@/components/pages/profiles/detail-order/product-item';
import { modal } from '@/libs/modal';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import SectionDetail from '@/components/pages/profiles/component/section-detail';
import { changeAddress } from '@/components/modal/modal-change-address';

const schedulesOrder = [
  {
    time: '12:15, 11 tháng 3',
    active: false,
    title: 'Đơn hàng đã đến bưu cục 20-HNI Ha Dong LM Hub'
  },
  {
    time: '12:15, 10 tháng 3',
    active: false,
    title: 'Đơn hàng đã rời kho phân loại'
  },
  {
    time: '12:15, 9 tháng 3',
    active: false,
    title: 'Đơn hàng đã đến kho phân loại HN SOC'
  },
  {
    time: '12:15, 8 tháng 3',
    active: false,
    title: 'Đơn hàng đã bàn giao cho đơn vị vận chuyển'
  },
  {
    time: '12:15, 8 tháng 3',
    active: false,
    title: 'Đang chuẩn bị',
    description: 'iTel đang chuẩn bị hàng'
  },
  {
    time: '12:15, 8 tháng 3',
    active: false,
    title: 'Đơn đã đặt',
    description: 'Đơn hàng đã được đặt'
  }
];
const productSession = [
  {
    productName: 'Sim và gói cước',
    productDescription: '087 544 4676/ eSim',
    price: '298.000đ',
    quantity: 2,
    image: imageProduct,
    productChild: [{ name: 'Tai nghe Sony không dây', description: 'Quà tặng', price: '149.000đ', image: imageGift }]
  },
  {
    productName: 'Sim 0876 331357 và gói cước',
    productDescription: '087 544 4676/ eSim',
    price: '298.000đ',
    image: imageCard,
    productChild: [
      { name: '087 633 1357', description: 'eSim', price: '149.000đ', icon: true },
      { name: 'Gói ITEL77', description: 'Cam kết trong 36 tháng', price: '149.000đ' }
    ]
  }
];
const OrderProgessBar = ({ step, idItem }: { step: number; idItem: string }) => {
  return (
    <div className="progress-bar-order">
      <div className="progress-bar flex flex-row justify-between mb-4">
        <div className="step-1 flex flex-col items-start md:flex-row flex-1 md:items-center">
          <div className="flex h-6 md:w-6 items-center justify-center">
            <Svg src="/icons/bold/cart.svg" className="w-[15px] h-[15px] md:w-[23px] md:h-[23px]" />
          </div>
          <p className="text-xs md:text-sm font-medium text-neutral-800 pl-[2px]">Đã đặt hàng</p>
        </div>
        <div className="step-2 flex flex-col items-start md:flex-row flex-1 md:items-center">
          <div className="flex h-6 md:w-6 items-center justify-center">
            <Svg
              src={step === 1 || step == 5 ? '/icons/bold/order-pending.svg' : '/icons/bold/order-paid.svg'}
              className="w-[15px] h-[15px] md:w-[23px] md:h-[23px]"
            />
          </div>
          <p className="text-xs md:text-sm font-medium text-neutral-800 pl-[2px] overflow-hidden [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
            {step === 1 || step == 5 ? 'Chờ thanh toán' : 'Đã thanh toán'}
          </p>
        </div>
        {step !== 5 && idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && idItem !== 'ITEL12345689' && (
          <div className="step-3 flex flex-col items-start md:flex-row flex-1 md:items-center">
            <div className="flex h-6 md:w-6 items-center justify-center">
              <Svg
                src="/icons/bold/order-shipping.svg"
                className={clsx(
                  step < 3 && step !== 2 ? 'text-neutral-400' : 'text-neutral-800',
                  'w-[15px] h-[15px] md:w-[23px] md:h-[23px]'
                )}
              />
            </div>
            <p
              className={clsx(
                step < 3 && step !== 2 ? 'text-neutral-400' : 'text-neutral-800',
                'text-xs md:text-sm font-medium pl-[2px] overflow-hidden [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]'
              )}
            >
              {step === 2 && 'Chờ Vận chuyển'}
              {step === 3 ? 'Đang vận chuyển' : ''}
              {step === 1 && 'Vận chuyển'}
              {step === 4 && 'Đã lấy hàng'}
            </p>
          </div>
        )}
        <div className="step-4 flex flex-col items-start md:flex-row flex-1 md:items-center">
          {step !== 5 && (
            <>
              <div className="flex h-6 md:w-6 items-center justify-center">
                <Svg
                  src="/icons/bold/order-delivered.svg"
                  className={clsx(step < 4 ? 'text-neutral-400' : 'text-neutral-800', 'w-[15px] h-[15px] md:w-[23px] md:h-[23px]')}
                />
              </div>
              <p className={clsx(step < 4 ? 'text-neutral-400' : 'text-neutral-800', 'text-xs md:text-sm font-medium pl-[2px]')}>
                Hoàn thành
              </p>
            </>
          )}
          {step === 5 && (
            <>
              <div className="flex h-6 md:w-6 items-center justify-center">
                <Svg
                  src="/icons/bold/order-cancel.svg"
                  className={clsx(step < 4 ? 'text-neutral-400' : 'text-neutral-800', 'w-[15px] h-[15px] md:w-[23px] md:h-[23px]')}
                />
              </div>
              <p className={clsx(step < 4 ? 'text-neutral-400' : 'text-neutral-800', 'text-xs md:text-sm font-medium pl-[2px]')}>Đã hủy</p>
            </>
          )}
        </div>
      </div>
      <div className="progress-bar flex flex-row justify-between">
        <div className="step-1 flex flex-row flex-1 items-center">
          <div className="w-[8px] h-[8px] rounded-[50%] bg-neutral-wf-700" />
          <hr className="bg-neutral-800 h-[1px] w-full" />
        </div>
        <div className="step-2 flex flex-row  flex-1 items-center">
          {step === 1 ? (
            <div className="w-[14px] h-[14px] p-[2px] border-[1px] border-solid border-[#666666] rounded-full bg-white">
              <div className="w-full h-full rounded-[50%] bg-neutral-wf-700 aspect-square" />
            </div>
          ) : (
            <div className="w-[8px] h-[8px] rounded-[50%] bg-neutral-wf-700" />
          )}
          <hr className={clsx(step < 2 ? 'opacity-50' : 'opacity-100', 'bg-[#999999] h-[1px] w-full')} />
        </div>
        {step !== 5 && idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && idItem !== 'ITEL12345689' && (
          <div className="step-3 flex flex-row flex-1 items-center">
            {(step === 3 || step === 2) && (
              <div className="w-[14px] h-[14px] p-[2px] border-[1px] border-solid border-[#666666] rounded-full bg-white">
                <div className="w-full h-full rounded-[50%] bg-neutral-wf-700 aspect-square" />
              </div>
            )}
            {step !== 3 && step !== 2 && (
              <div className={clsx('w-[8px] h-[8px] rounded-[50%] bg-[#999999]', step < 3 ? 'bg-[#999999]' : 'bg-neutral-wf-700')} />
            )}
            <hr className={clsx(step < 3 ? 'opacity-50' : 'opacity-100', 'bg-[#999999] h-[1px] w-full')} />
          </div>
        )}
        <div className="step-4 flex flex-row flex-1 items-center">
          <div className={clsx('w-[8px] h-[8px] rounded-[50%] ', step < 4 ? 'bg-[#999999]' : 'bg-neutral-wf-700')} />
          <hr className={clsx(step < 4 ? 'opacity-50' : 'opacity-100', 'bg-[#999999] h-[1px] w-full')} />
        </div>
      </div>
    </div>
  );
};

const StatusOrder = ({ step }: { step: string }) => {
  const concatArray = [
    step === '4'
      ? { time: '12:15, 13 tháng 3', active: true, title: 'Hoàn thành', description: 'Đơn hàng đã được giao đến bạn' }
      : step === '5'
      ? {
          time: '12:15, 12 tháng 3',
          active: true,
          title: 'Đơn hàng đã bị hủy',
          description: 'Lý do: Giao hàng thất bại'
        }
      : {
          time: '12:15, 12 tháng 3',
          active: true,
          title: 'Đang vận chuyển',
          description: 'Đơn hàng đang trên đường giao tới bạn'
        },
    ...schedulesOrder
  ];
  const finalStep = step === '4' ? concatArray : concatArray;
  const length = finalStep.length;

  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  return (
    <div className="">
      <p className="text-base md:text-xl font-bold">Trạng thái đơn hàng #ITEL123456</p>

      <div className="border-t border-neutral-200 my-4 md:mt-5 md:mb-6" />

      {finalStep.slice(0, isViewAll ? length : 1).map((item: any, index: number) => (
        <div key={index} className="flex min-h-[72px]">
          <div className="min-w-[120px] w-[120px] text-right pt-0.5">
            <p className={clsx({ 'font-medium text-sm text-neutral-500': true, 'opacity-50': !item.active })}>{item.time}</p>
          </div>
          <div className="mx-5 text-center flex flex-col items-center">
            <div className={clsx({ 'w-[9px] h-[9px] rounded-full bg-neutral-800': true, 'opacity-50': !item.active })} />
            {index < finalStep.length - 1 && <div className={clsx({ 'flex-1 w-[1px] bg-neutral-800': true, 'opacity-50': '' })} />}
          </div>
          <div className={clsx({ 'pb-6': true, 'opacity-50': !item.active })}>
            <p className="font-bold max-md:text-sm">{item.title}</p>
            <p className="text-neutral-500 max-md:text-sm">{item.description}</p>
          </div>
        </div>
      ))}
      <div
        aria-hidden
        className="flex justify-center text-center w-full flex-row items-center cursor-pointer"
        onClick={() => setIsViewAll((cur) => !cur)}
      >
        <div className=" text-neutral-800 text-sm font-medium pr-2">{isViewAll ? 'Ẩn bớt' : 'Xem thêm'} </div>
        <Svg src="/icons/line/arrow-left.svg" width={20} height={20} className={clsx(isViewAll ? 'rotate-90' : '-rotate-90')} />
      </div>

      <div className="border-t border-neutral-200 my-4 md:my-6" />
    </div>
  );
};

const DetailPackage: NextPage = () => {
  const router = useRouter();
  const [isReview, setIsReview] = useState<boolean>(false);
  const { step, idItem } = router?.query;
  const handlerModalCancelModal = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalCanCelOrder onClose={close} />;
      },
      className: 'modal-box modal-box-lg md:max-w-[35rem]',
      closeButton: false
    });
  }, []);

  const handlerModalSupport = useCallback((step: string) => {
    modal.open({
      render({ close }) {
        return <ModalOrderSupport onClose={close} step={step} />;
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem] z-[100]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, []);

  const handlerReviewItem = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalReviewOrderComplete onClose={close} />;
      },
      onDone(data) {
        if (data) {
          setIsReview(true);
        }
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, []);

  const handlerModalOrderComplete = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalOrderComplete onClose={close} />;
      },
      onDone(data) {
        if (data) {
          void handlerReviewItem();
        }
      },
      className: 'modal-box modal-box-lg md:max-w-[35rem]',
      closeButton: false
    });
  }, [handlerReviewItem]);

  const handlerModalConfirm = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalConfirmOrder onClose={close} />;
      },
      onDone(data) {
        if (data) {
          void handlerModalOrderComplete();
        }
      },
      className: 'modal-box modal-box-lg md:max-w-[35rem] ',
      closeButton: false
    });
  }, [handlerModalOrderComplete]);
  const handlerCopy = useCallback(() => {
    navigator?.clipboard?.writeText('3291 8231 0275 135');
    toast.success('Đã sao chép');
  }, []);

  const handleChangeAddress = useCallback(() => {
    changeAddress(undefined);
  }, []);
  // renderName

  const renderNameAddress = useMemo(() => {
    if (idItem === 'ITEL12345689') {
      return 'Thông tin nhận hàng';
    } else if (idItem === 'ITEL123489') {
      return 'Nhận tại điểm bán';
    }
    return 'Giao hàng tận nơi';
  }, [idItem]);

  // idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' sim and card

  // handlerScroll
  const [showStick, setShowStick] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const div = document.getElementById('id-section-info');
      if (div) {
        const rect = div.getBoundingClientRect();
        const isScrolledPast = rect.bottom < 0;
        setShowStick(isScrolledPast);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const pages = useMemo(() => {
    const { tabs } = router.query;

    return [
      { name: 'Đơn hàng của tôi', href: `/profile/my-order?tabs=${tabs}`, current: false },
      { name: 'Chi tiết đơn hàng', href: '#', current: true }
    ];
  }, [router.query]);

  const isShowAddress = idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121';
  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi `}</title>
      </Head>
      <HeaderWebDefault title="Chi tiết đơn hàng" withMenu />
      <div className="bg-neutral-0 max-md:hidden">
        <div className="container py-4.5">
          <Breadcrumbs breadcrumbs={pages} />
        </div>
      </div>
      <div className="bg-neutral-100">
        <div className="container xl:px-56 xl:my-14 max-md:mt-4 md:my-8">
          <h2 className="font-itel text-xl md:text-h4 font-bold text-neutral-800">Chi tiết đơn hàng #ITEL123456</h2>
          <section className="mt-6 md:mt-12">
            <OrderProgessBar step={parseInt(step as string, 10) || 1} idItem={idItem?.toString() || ''} />
          </section>
          {step === '1' && (
            <section
              id="id-section-info"
              className="mt-6 md:mt-12 py-4 px-4 md:py-5 md:px-8 bg-neutral-0 rounded-md flex flex-col md:flex-row justify-between  gap-4 md:gap-8"
            >
              <p className="text-neutral-500 text-sm font-bold">
                Vui lòng thanh toán trước <span className="text-neutral-800">14:42 14/03/2023</span> để tránh hệ thống tự động hủy đơn hàng
                này.
              </p>
              <div className="flex flex-row gap-4 max-md:w-full md:min-w-[285px]">
                <button
                  onClick={handlerModalCancelModal}
                  className="md:min-w-max btn text-[14px]  btn-secondary rounded-full max-md:w-full"
                >
                  Hủy đơn
                </button>
                <button className="md:min-w-max transition-default btn-primary btn text-[14px]  max-md:w-full rounded-full">
                  Thanh toán ngay
                </button>
              </div>
            </section>
          )}
          {step === '2' && (
            <section
              id="id-section-info"
              className="mt-6 md:mt-12 px-4 py-4 md:py-5 md:px-8 bg-neutral-0 rounded-md flex flex-col md:flex-row justify-between gap-4 md:gap-8"
            >
              <p className="text-neutral-500 text-sm font-normal">
                iTel và đối tác đang chuẩn bị sản phẩm & làm việc với đơn vị vận chuyển.
                <br /> Lựa chọn Yêu cầu hỗ trợ nếu bạn cần iTel thay đổi thông tin đơn hàng.
              </p>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => handlerModalSupport(step)}
                  className="min-w-max transition-default btn-primary xl:h-10 btn w-full rounded-full"
                >
                  Yêu cầu hỗ trợ
                </button>
              </div>
            </section>
          )}
          {step === '3' && (
            <section
              id="id-section-info"
              className="mt-6 md:mt-12 px-4 py-4 md:py-5 md:px-8 bg-neutral-0 rounded-md flex flex-col md:flex-row justify-between gap-4 md:gap-8"
            >
              <p className="text-neutral-500 text-sm font-normal">
                Đơn hàng đang vận chuyển. <br />
                Vui lòng chọn Đã nhận được hàng nếu bạn đã nhận được sản phẩm.
              </p>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => handlerModalSupport(step)}
                  className="min-w-max btn xl:min-w-[80px] xl:h-10 text-[14px] btn-secondary rounded-full w-full"
                >
                  Hỗ trợ
                </button>
                <button
                  onClick={handlerModalConfirm}
                  className="min-w-max md:hidden text-[14px] xl:h-10 transition-default btn-primary btn w-full rounded-full"
                >
                  Đã nhận hàng
                </button>
                <button
                  onClick={handlerModalConfirm}
                  className="min-w-max text-[14px] max-md:hidden xl:h-10 transition-default btn-primary btn w-full rounded-full"
                >
                  Đã nhận được hàng
                </button>
              </div>
            </section>
          )}

          {step === '4' && (
            <section
              id="id-section-info"
              className="mt-6 md:mt-12 px-4 py-4 md:py-5 md:px-8 bg-neutral-0 rounded-md flex flex-col md:flex-row justify-between gap-4 md:gap-8"
            >
              {idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && idItem !== 'ITEL12345689' && (
                <p className="text-neutral-500 text-sm font-normal">
                  Cảm ơn bạn đã sử dụng dịch vụ của iTel. Vui lòng Đánh giá sản phẩm để iTel có cơ sở phát huy, nâng cấp dịch vụ trong tương
                  lai.
                </p>
              )}
              {(idItem === 'ITEL123489ddd' || idItem === 'ITEL123489ddddd121' || idItem === 'ITEL12345689') && (
                <p className="text-neutral-500 text-sm font-normal">
                  Đơn hàng đã hoàn tất.
                  <br />
                  Cảm ơn bạn đã sử dụng dịch vụ của iTel.
                </p>
              )}
              <div className="flex flex-row gap-4  md:min-w-[285px] justify-end">
                <button
                  className={clsx(
                    idItem === 'ITEL123489ddd' || idItem === 'ITEL123489ddddd121' ? 'btn-primary' : 'btn-secondary',
                    idItem === 'ITEL12345689' ? '!btn-primary' : '',
                    'min-w-max btn text-sm w-full md:text-base rounded-full md:!w-[80px]'
                  )}
                >
                  Mua lại
                </button>
                {!isReview && idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && idItem !== 'ITEL12345689' && (
                  <button
                    onClick={handlerReviewItem}
                    className="min-w-max text-sm md:text-base transition-default btn-primary btn w-full rounded-full"
                  >
                    Đánh giá sản phẩm
                  </button>
                )}
              </div>
            </section>
          )}
          {step === '5' && (
            <section
              id="id-section-info"
              className="mt-6 md:mt-12 px-4 py-4 md:py-5 md:px-8 bg-neutral-0 rounded-md flex flex-col md:flex-row justify-between gap-4 md:gap-8"
            >
              <p className="text-neutral-500 text-sm font-normal">
                Đơn hàng đã bị hủy. <br /> Lý do: Khách hàng yêu cầu hủy đơn
              </p>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => handlerModalSupport(step)}
                  className="min-w-max btn text-[14px] md:min-w-[90px] xl:h-10  btn-secondary rounded-full w-full "
                >
                  Hỗ trợ
                </button>
                <button className="min-w-max transition-default btn-primary xl:h-10  text-[14px] md:min-w-[90px] btn w-full rounded-full">
                  Đặt lại
                </button>
              </div>
            </section>
          )}
          {isShowAddress && (
            <SectionDetail
              title={renderNameAddress}
              className="mt-3 md:mt-4 pb-4 md:pb-6"
              rightHeader={
                idItem === 'ITEL123489' ? (
                  <button className="flex gap-2 items-center md:hidden">
                    <Svg src="/icons/line/location-1.svg" width={20} height={20} />
                    <p className="text-sm text-neutral-800 hover:text-red-500 font-bold">Chỉ đường</p>
                  </button>
                ) : null
              }
            >
              <div className="border rounded-lg border-neutral-300 p-4 md:p-6 flex items-center">
                <div className="flex-1">
                  <p className="text-sm md:text-base">
                    {idItem === 'ITEL123489' ? (
                      <b>Công ty cổ phần thế giới di động</b>
                    ) : (
                      <b>
                        Đào Thị Hải Yến <span>|</span> 0867896716
                      </b>
                    )}
                  </p>

                  {idItem === 'ITEL123489' ? (
                    <div className="mt-3 md:mt-2 space-y-1">
                      {[
                        { icon: '/icons/bold/location.svg', title: 'Thôn 9, Xã Thạch Hòa, Huyện Thạch Thất, Thành phố Hà Nội' },
                        { icon: '/icons/line/timemer.svg', title: 'Giờ mở cửa: 8h - 17h, từ thứ 2 - chủ nhật' },
                        { icon: '/icons/line/phone-number.svg', title: '0877 333 444' }
                      ].map(({ icon, title }, index) => {
                        return (
                          <div key={index} className="flex">
                            <Svg src={icon} width={16} height={16} className="mr-1" />
                            <p className="text-xs font-medium md:text-sm">{title}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="font-normal text-xs md:text-base text-neutral-500 md:text-base-content line-clamp-1">
                        {idItem === 'ITEL12345689' ? 'yen.dao22@gmail.com' : 'Tòa CT2 Ngô Thì Nhậm, Phường Hà Cầu, Quận Hà Đông, Hà Nội'}
                      </p>
                    </div>
                  )}
                </div>
                {idItem !== 'ITEL123489' ? (
                  <button className="btn btn-sm btn-ghost items-center px-0 ml-4 hover:bg-transparent" onClick={handleChangeAddress}>
                    Thay đổi
                  </button>
                ) : (
                  <button className="max-md:hidden btn btn-sm btn-ghost gap-2 items-center px-0 ml-4 hover:bg-transparent">
                    <Svg src="/icons/line/location-1.svg" width={20} height={20} />
                    <p>Chỉ đường</p>
                  </button>
                )}
              </div>
            </SectionDetail>
          )}

          {(step === '3' || step === '4' || step === '5') &&
            idItem !== 'ITEL123489ddd' &&
            idItem !== 'ITEL123489ddddd121' &&
            idItem !== 'ITEL12345689' && (
              <section className="mt-4 py-4 px-4 md:py-6 md:px-8  bg-neutral-0 rounded-md">
                <StatusOrder step={step} />
              </section>
            )}
          <section className="mt-3 md:mt-4 py-4 px-4 md:py-6 md:px-8  bg-neutral-0 rounded-md">
            <div className="flex flex-row justify-between items-center">
              <p className="text-base md:text-xl text-neutral-800 font-bold ">Chi tiết đơn hàng</p>
              <div className="hidden md:flex flex-row cursor-pointer gap-3">
                <Svg src="/icons/bold/print.svg" className="w-5 h-5" />
                <p className="text-primary">In đơn hàng</p>
              </div>
            </div>
            {idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && (
              <hr className="border-neutral-200 mb-4 mt-4 md:mb-6 md:mt-6" />
            )}
            {(idItem === 'ITEL123489ddd' || idItem === 'ITEL123489ddddd121') && (
              <hr className="md:hidden border-neutral-200 mb-4 mt-4 md:mb-6 md:mt-6" />
            )}
            {idItem &&
              !['ITEL123489ddd', 'ITEL123489ddddd121', 'ITEL12345689']?.includes(idItem?.toString()) &&
              productSession.map((item) => (
                <div key={item.productName} className="mb-8">
                  <ProductItem product={item} />
                </div>
              ))}
            {/*package sim */}
            {idItem === 'ITEL123489ddddd121' && (
              <div className="flex border-solid md:border-[1px] md:p-4 rounded-xl border-[#CCCCCC] flex-col  mb-4 mt-4 md:mb-6 md:mt-6 gap-4">
                <div className="flex flex-row gap-6 items-center">
                  <Image src={packageSim} alt="goi cuco" />
                  <div>
                    <p className="text-neutral-800 font-bold md:text-base text-sm">iTel 49</p>
                    <p className="text-neutral-500 text-xs md:text-sm">Gói cước tháng</p>
                  </div>
                </div>
                <div className="md:flex-1 p-3 bg-neutral-50 rounded-xl flex flex-row justify-between items-center">
                  <div>
                    <p className="text-neutral-800 font-bold md:text-base text-sm">3291 8231 0275 135</p>
                    <p className="text-neutral-500 text-xs md:text-sm">Số Seri: 20000236912641</p>
                  </div>
                  <div className="flex flex-row gap-8">
                    <button className="cursor-pointer">
                      <Svg src="/icons/line/forward.svg" width={24} height={24} />
                    </button>
                    <button className="cursor-pointer" onClick={handlerCopy}>
                      <Svg src="/icons/line/copy.svg" width={24} height={24} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/*san pham gois cuoc thang*/}
            {idItem === 'ITEL123489ddd' && (
              <div className="flex border-solid md:border-[1px] md:p-4 rounded-xl border-[#CCCCCC] flex-row justify-between items-center mb-4 mt-4 md:mb-6 md:mt-6">
                <div className="flex flex-row md:flex-1 gap-6 items-center">
                  <Image src={packageSim} alt="goi cuco" />
                  <div>
                    <p className="text-neutral-800 font-bold md:text-base text-sm">iTel 49</p>
                    <p className="text-neutral-500 text-xs md:text-sm">Gói cước tháng</p>
                  </div>
                </div>
                <div className="md:flex-1">
                  <p className="text-neutral-800 font-bold md:text-base text-sm">0964124715</p>
                  <p className="text-neutral-500 text-xs md:text-sm">Số điện thoại nhận</p>
                </div>
              </div>
            )}
            {/*san pham chi mua sim only */}
            {idItem === 'ITEL12345689' && (
              <ProductItem
                product={{
                  productName: 'Sim 0876 331357 và gói cước',
                  productDescription: '087 544 4676/ eSim',
                  price: '298.000đ',
                  image: imageCard,
                  productChild: [
                    { name: '087 633 1357', description: 'eSim', price: '149.000đ', icon: true },
                    { name: 'Gói ITEL77', description: 'Cam kết trong 36 tháng', price: '149.000đ' }
                  ]
                }}
              />
            )}
            {idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && (
              <hr className="border-neutral-200 mb-4 mt-4 md:mb-6 md:mt-6" />
            )}
            {(idItem === 'ITEL123489ddd' || idItem === 'ITEL123489ddddd121') && (
              <hr className="md:hidden border-neutral-200 mb-4 mt-4 md:mb-6 md:mt-6" />
            )}
            <div className="flex flex-col">
              <div className="flex flex-row justify-between py-2">
                <p className="font-normal text-sm  text-neutral-800">Tổng tiền hàng</p>
                <p className="font-medium text-sm text-neutral-800">11.259.000đ</p>
              </div>
              <div className="flex flex-row justify-between py-2">
                <p className="font-normal text-sm  text-neutral-800">Phí vận chuyển</p>
                <p className="font-medium text-sm text-neutral-800">20.000đ</p>
              </div>
              <div className="flex flex-row justify-between py-2">
                <p className="font-normal text-sm  text-neutral-800">KM vận chuyển</p>
                <p className="font-medium text-sm text-neutral-800">-15.000đ</p>
              </div>
              <div className="flex flex-row justify-between py-2">
                <p className="font-normal text-sm  text-neutral-800">Voucher giảm giá</p>
                <p className="font-medium text-sm text-neutral-800">-20.000đ</p>
              </div>
            </div>
            <hr className="border-neutral-200 mb-4 mt-4 md:mb-6 md:mt-6" />
            <div className="flex flex-row justify-between py-2">
              <p className="font-normal text-sm  text-neutral-800">Thành tiền</p>
              <p className="font-bold text-base text-neutral-800">11.244.000đ</p>
            </div>
          </section>
          <section className="mt-4 py-4 px-4 md:py-6 md:px-8  bg-neutral-0 rounded-md">
            <p className="md:text-xl text-base text-neutral-800 font-bold ">Phương thức thanh toán</p>
            <div className="mt-3 md:mt-5 py-4 px-4 md:py-6 md:px-8 border-solid border-[1px] border-[#CCCCCC] rounded-md flex items-center justify-between flex-row">
              {idItem === 'ITEL123489' ? (
                <div className="flex flex-row items-center">
                  <Image src={payment1} alt="cash" className="object-contain w-[40px] h-[30px]" />
                  <div className="ml-4">
                    <p className="text-neutral-800 font-medium text-base">Thanh toán khi nhận hàng</p>
                    <p className="text-neutral-500 text-sm font-normal">SĐT người nhận 0977 *** ***</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row">
                  <Image src={Momo} alt="momo" className="w-[40px] h-[40px]" />
                  <div className="ml-4">
                    <p className="text-neutral-800 font-normal text-base">Ví Momo</p>
                    <p className="text-neutral-500 text-sm font-normal">096412****</p>
                  </div>
                </div>
              )}
            </div>
          </section>
          {/*comment step4*/}
          {step === '4' && isReview && (
            <section className="mt-4 py-6 px-8  bg-neutral-0 rounded-md">
              <p className="md:text-xl text-base text-neutral-800 font-bold ">Đánh giá sản phẩm</p>
              <Comment
                key="123"
                userName="Nguyễn Văn Thủy"
                userAvatar="https://images-ng.pixai.art/images/orig/dc23707b-5535-4c23-a97b-5c642f4bd179"
                userRating={5}
                createdAt={'03.03.2023'}
                content={
                  'Máy sử dụng mượt sạc pin nhanh chơi game ổn định camera chụp cũng tạm ổn. Chỉ có quay video hơi tệ nó cứ mờ làm sao ấy. Nhưng mà nói chung là máy rất tốt,đã sử dụng hơn một tuần và cảm thấy sử dụng rất tốt!'
                }
                className="pt-6 first:block md:block"
              />
            </section>
          )}
          <section className="mt-2 mb-4 md:mt-4 px-4 py-4 md:py-6 md:px-8  bg-neutral-0 rounded-md">
            <OrderSupport order={exampleOrder} />
          </section>
          {/*stick button */}
          {showStick && (
            <section className="md:hidden flex -ml-[1rem] z-[49] -mr-[-1rem] fixed bottom-0 h-[86px] border-t-[#F1F1F2]  border-solid border-[1px] bg-neutral-0 w-full">
              <div className="p-4 w-full flex flex-row justify-between gap-4">
                {step === '1' && (
                  <>
                    <button
                      onClick={handlerModalCancelModal}
                      className="md:min-w-max btn text-[14px]  btn-secondary rounded-full max-md:w-full"
                    >
                      Hủy đơn
                    </button>
                    <button className="md:min-w-max transition-default btn-primary btn text-[14px]  max-md:w-full rounded-full">
                      Thanh toán ngay
                    </button>
                  </>
                )}
                {step === '2' && (
                  <button onClick={() => handlerModalSupport(step)} className="transition-default btn-primary btn w-full rounded-full">
                    Yêu cầu hỗ trợ
                  </button>
                )}
                {step === '3' && (
                  <>
                    <button
                      onClick={() => handlerModalSupport(step)}
                      className="min-w-max btn xl:min-w-[80px] xl:h-10 text-[14px] btn-secondary rounded-full w-full"
                    >
                      Hỗ trợ
                    </button>
                    <button
                      onClick={handlerModalConfirm}
                      className="min-w-max md:hidden text-[14px] xl:h-10 transition-default btn-primary btn w-full rounded-full"
                    >
                      Đã nhận hàng
                    </button>
                  </>
                )}
                {step === '4' && (
                  <>
                    <button
                      className={clsx(
                        idItem === 'ITEL123489ddd' || idItem === 'ITEL123489ddddd121' ? 'btn-primary' : 'btn-secondary',
                        idItem === 'ITEL12345689' ? '!btn-primary' : '',
                        'min-w-max btn text-sm w-full md:text-base rounded-full md:!w-[80px]'
                      )}
                    >
                      Mua lại
                    </button>
                    {!isReview && idItem !== 'ITEL123489ddd' && idItem !== 'ITEL123489ddddd121' && idItem !== 'ITEL12345689' && (
                      <button
                        onClick={handlerReviewItem}
                        className="min-w-max text-sm md:text-base transition-default btn-primary btn w-full rounded-full"
                      >
                        Đánh giá sản phẩm
                      </button>
                    )}
                  </>
                )}
                {step === '5' && (
                  <>
                    <button
                      onClick={() => handlerModalSupport(step)}
                      className="min-w-max btn text-[14px] md:min-w-[90px] xl:h-10  btn-secondary rounded-full w-full "
                    >
                      Hỗ trợ
                    </button>
                    <button className="min-w-max transition-default btn-primary xl:h-10  text-[14px] md:min-w-[90px] btn w-full rounded-full">
                      Đặt lại
                    </button>
                  </>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
DetailPackage.getLayout = LayoutWithChatBox;
export default DetailPackage;
