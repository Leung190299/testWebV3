import { toCurrency, toNumber } from '@/utilities/currency';
import React, { useCallback, useState } from 'react';

import Svg from '@/components/icon/svg';
import { quickViewVoucher } from '@/components/modal/modal-voucher-view';
import { useGlobalContext } from '@/context/global';
import { useLoading } from '@/hooks/useLoading';
import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import itelClubService from '@/services/itelClubService';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type VoucherContentProps = {
  dataVoucher?: itelClubModel.voucherClient;
  data: itelClubModel.DetailVoucher;
  isModal?: boolean;
  isReceived?: boolean;
  isRequiredPoint?: boolean;
  isDetail?: boolean;
  isHot?: boolean;
  isShowDebug?: boolean;
  closeOnReceive?: boolean;
  onDone?(): void;
};

enum DemoStatus {
  Succes,
  IsNotMemeber,
  NotEnoughPoint,
  LowRank,
  ToMuch
}

const ERROR_NULL = 'Hệ thống đang bảo trì. Bạn vui lòng quay lại sau nhé';
const DiscountTag = ({ price }: { price: number }) => (
  <span className="tag tag-vector h-auto bg-gradient-to-r from-yellow-500 to-red-500 px-4 py-2">Giảm {toCurrency(price)}</span>
);
const VoucherContent = ({
  dataVoucher,
  data,
  isDetail,
  isModal,
  isReceived,
  isRequiredPoint,
  onDone,
  isHot,
  isShowDebug = true,
  closeOnReceive
}: VoucherContentProps) => {
  const { withAuth, user, info } = useGlobalContext();
  const { done } = useModal();
  const router = useRouter();
  const [demo, setDemo] = useState<DemoStatus>(DemoStatus.Succes);
  const { openLoading, closeLoading } = useLoading();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [voucher, setdataVoucher] = useState<itelClubModel.voucherClient>(dataVoucher || {});

  const attributes = [
    { title: 'Điểm đổi', value: toNumber(data.point||0) },
    { title: 'Hiệu lực', value: data.expire_duration }
  ];
  const handleChangeConfirm = useCallback(
    (type: DemoStatus, voucherData?: itelClubModel.voucherClient) => {
      const title: Record<DemoStatus, string> = {
        [DemoStatus.Succes]: isHot ? 'Bạn thật nhanh tay!\nDeal hot đã thuộc về bạn.' : 'Đổi ưu đãi thành công!',
        [DemoStatus.IsNotMemeber]: 'Tiếc quáaa!!! Bạn chưa phải là hội viên iTel',
        [DemoStatus.LowRank]: 'Nhận ưu đãi không thành công',
        [DemoStatus.NotEnoughPoint]: 'Nhận ưu đãi không thành công',
        [DemoStatus.ToMuch]: 'Nhận ưu đãi không thành công'
      };
      const messages: Record<DemoStatus, React.ReactNode> = {
        [DemoStatus.Succes]: isHot ? (
          <>
            Bạn thật nhanh tay! Deal hot đã thuộc về bạn.
            <br />
            iTel đã gửi thông tin Voucher về SMS đến bạn hoặc bạn có thể xem tại{' '}
            <Link href={Routers.PROFILE_DISCOUNT} className="text-red-500">
              <b>Ưu đãi đã nhận</b>
            </Link>
          </>
        ) : (
          <>
            Bạn nhớ sử dụng Voucher <b>{data.title}</b> trước {data.expire_duration} kể từ lúc nhận được bạn nhé!
          </>
        ),
        [DemoStatus.IsNotMemeber]: (
          <>
            Số điện thoại của bạn <b>chưa đủ điều kiện</b> để trở thành hội viên iTel Club.
            <br />
            Sau 3 ngày kể từ ngày kích hoạt, số điện thoại của bạn sẽ được tham gia chương trình Hội viên thân thiết iTel Club.
            <br />
            <br className="max-md:hidden" />
            Chi tiết liên hệ <b>087708787</b> (Miễn phí với Thuê bao iTel)
          </>
        ),
        [DemoStatus.LowRank]: 'Tiếc quá!!! Ưu đãi không dành cho hạng hội viên của bạn \nMời bạn tham khảo ưu đãi khác nha ❤️',
        [DemoStatus.NotEnoughPoint]: (
          <>
            Buồn quá!!! Bạn không đủ điểm để nhận ưu đãi này.
            <br />
            Mời bạn tham khảo ưu đãi khác nha ❤️
            <br />
            Nếu bạn muốn nhận thêm điểm iTel, hãy đọc bài viết{' '}
            <Link href={Routers.QUESSTION_TUTORIAL} className="text-red-500">
              <b>Hướng dẫn cách nhận điểm iTel</b>
            </Link>{' '}
            này nhé!
          </>
        ),
        [DemoStatus.ToMuch]: 'Teng teng!!! Bạn đã sử dụng quá số lần nhận ưu đãi VIP trong tháng Mời bạn tham khảo ưu đãi khác nha ❤️'
      };
      const otherOptions =
        type == DemoStatus.Succes
          ? {
              confirmLable: 'Xem voucher',
              rejectLable: 'Dùng ngay',
              onDone() {
                quickViewVoucher({ voucher: data, dataVoucher: voucherData || {} });
              },
              onReject() {
                quickViewVoucher({ voucher: data, forceView: true, dataVoucher: voucherData || {} });
              }
            }
          : undefined;

      modal.confirm({
        content: (
          <div className="text-base-content text-center">
            <Svg
              src={type === DemoStatus.Succes ? '/icons/others/order-complete.svg' : '/icons/others/phone-failed.svg'}
              className="mx-auto h-16 md:h-20 w-16 md:w-20"
            />
            <h3 className="text-lg md:text-s-md mt-8">
              <b>{title[type]}</b>
            </h3>
            <p className="text-sm md:text-base text-neutral-500 md:text-base-content mt-4 md:text-left">{messages[type]}</p>
          </div>
        ),
        ...otherOptions
      });
    },
    [data, demo, isHot, voucher, info]
  );

  const handleExchange = withAuth(() => {
    modal.confirm({
      title: 'Bạn muốn đổi ưu đãi này?',
      content: (
        <p data-theme="light">
          Bạn có muốn sử dụng <b>{data.point} điểm</b> để đổi Ưu đãi <b>{data.title}</b>
        </p>
      ),
      confirmLable: 'Xác nhận',
      rejectLable: 'Hủy bỏ',
      onDone: () => getVoucherClient()
    });
  }, [handleChangeConfirm]);

  const handleReceive = withAuth(() => {
    closeOnReceive && done(null);
    onDone ? onDone() : handleChangeConfirm(DemoStatus.Succes);
  }, [handleChangeConfirm]);
  const handleUse = () => {
    quickViewVoucher({ voucher: data, forceView: true, dataVoucher: voucher });
  };
  const handleView = () => {
    router.push(Routers.PROFILE_DISCOUNT);
  };

  const getVoucherClient = async () => {
    try {
      if (!info.rankId) {
        return handleChangeConfirm(DemoStatus.LowRank);
      }
      if (info.currentPoint! < data.point!) {
        return handleChangeConfirm(DemoStatus.NotEnoughPoint);
      }

      openLoading();
      const param: itelClubModel.payloadVoucher = { voucherId: data.voucher_id?.toString() };
      const res = await itelClubService.getVoucherClent(param);
      if (res.result.error?.includes('SUCCESS')) {
        setdataVoucher(res.result.data!);
        handleChangeConfirm(DemoStatus.Succes, res.result.data!);
      }
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError?.message || ERROR_NULL,
        rejectLable: 'Đóng',
        onDone: close
      });
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  return (
    <div className="container xl:flex gap-x-10">
      {/* {isShowDebug && (
        <DebugUI className="bg-neutral-0 rounded-lg shadow-itel" title="voucher">
          <DebugUI.OptionsList
            options={[
              { value: DemoStatus.Succes, name: 'Thành công' },
              { value: DemoStatus.IsNotMemeber, name: 'Không phải hội viên' },
              { value: DemoStatus.NotEnoughPoint, name: 'Không đủ điểm' },
              { value: DemoStatus.LowRank, name: 'Hạng không đủ' },
              { value: DemoStatus.ToMuch, name: 'Nhận nhiều quá' }
            ]}
            onChange={(v) => setDemo(v.value)}
            checkedValue={demo}
          />
        </DebugUI>
      )} */}
      {/* Banner and main content */}
      <div className="flex-1">
        {/* Banner */}
        <div className={clsx(isModal ? '-mx-4 md:mx-0 md:rounded-xl' : 'rounded-xl', 'block-img block-video overflow-hidden relative')}>
          <img src={data.images_rectangle?.[640] || ''} alt={data.title} className="object-cover" />
          <div className="max-md:hidden w-[5.5rem] absolute bottom-6 left-6">
            <div className="block-img block-square rounded-full overflow-hidden">
              <img src={data.brandImage} alt={data.brand} className="object-cover" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 md:hidden">
            <DiscountTag price={Number(data.price || '0')} />
          </div>
        </div>
        {/* Content */}
        <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
          <div>
            <div className="max-md:hidden xl:hidden">
              <DiscountTag price={Number(data.price || '0')} />
            </div>
            <h1 className="text-s-sm md:text-s-sm md:mt-3 xl:mt-0">
              <b>{data.title}</b>
            </h1>
          </div>
          <div className="xl:hidden flex flex-wrap gap-x-4">
            {attributes.map(({ title, value }) => {
              return (
                <div key={title} className="min-w-[7.75rem] md:min-w-[15rem]">
                  <p className="text-neutral-500 text-sm">{title}</p>
                  <p className="text-lg font-bold mt-1">{value}</p>
                </div>
              );
            })}
          </div>
          {/* <div className="xl:hidden space-y-4 md:space-y-2">
            <p className="text-lg">
              <b>Điều kiện</b>
            </p>
            <p>
              Giảm <b>50k</b> cho đơn từ <b>{toCurrency(120000)}</b>
            </p>
            <p>
              Áp dụng cho các sản phẩm nước uống, bánh ngọt, snack tại của hàng The Coffee House trên toàn quốc.{' '}
              <b>(Trừ các cửa hàng Destination tại Phú Quốc, Bà Đen Tây Ninh, Signature).</b>
              <br />
              <br />
              <b>Chi tiết vui lòng xem thông tin bên trái.</b>
            </p>
          </div> */}
          <div className="xl:hidden"></div>
          <hr className="xl:hidden border-neutral-300" />
          {isDetail && (
            <div>
              <div className="flex">
                <div className="text-center py-4 px-6 rounded-lg bg-neutral-0 mx-auto">
                  {/* <div className="w-min mx-auto">
                    <Barcode displayValue={false} width={3.3} height={80} value="4456466774" margin={0} />
                  </div>
                  <p className="mt-1">4 4 5 6 4 6 6 7 7 4</p> */}
                  <img src={voucher.codeImage || ''} alt={voucher.code} />
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-neutral-500">
                Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán.
              </div>
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        </div>
      </div>
      {!isModal && (
        <div className="xl:hidden space-y-6 mt-6">
          {isReceived ? (
            <>
              <div className="md:w-1/2 mx-auto">
                <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleUse}>
                  Dùng ngay
                </button>
              </div>
              <div className="md:w-1/2 mx-auto">
                <button className="btn btn-ghost btn-lg w-full rounded-full" onClick={handleView}>
                  Xem ưu đãi trong kho của bạn
                </button>
              </div>
            </>
          ) : isRequiredPoint ? (
            <div className="md:w-1/2 mx-auto">
              <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleExchange}>
                Đổi ngay {data.point} điểm
              </button>
            </div>
          ) : (
            <div className="md:w-1/2 mx-auto">
              <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleReceive}>
                Nhận ngay
              </button>
            </div>
          )}
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full z-10 xl:hidden bg-neutral-0">
        <div className="flex border-t border-neutral-200 py-4 container">
          <div className="flex-1">
            {isReceived ? (
              <div className="max-md:hidden">
                <p className="text-sm text-neutral-500">Voucher</p>
                <p className="md:text-s-sm">
                  <b>Giảm ngay 50.000đ</b>
                </p>
              </div>
            ) : (
              isRequiredPoint && (
                <div>
                  <p className="text-sm text-neutral-500">Đổi điểm</p>
                  <p className="md:text-s-sm">
                    <b>{data.point} điểm</b>
                  </p>
                </div>
              )
            )}
          </div>
          {isReceived ? (
            <button className="btn btn-primary rounded-full max-md:h-11 w-full md:w-[9rem]" onClick={handleUse}>
              Dùng ngay
            </button>
          ) : isRequiredPoint ? (
            <button className="btn btn-primary rounded-full max-md:h-11 md:w-[9rem]" onClick={handleExchange}>
              Đổi ngay
            </button>
          ) : (
            <button className="btn btn-primary rounded-full max-md:h-11 w-full md:w-[9rem]" onClick={handleReceive}>
              Nhận ngay
            </button>
          )}
        </div>
      </div>
      {/* Side map */}
      <div className="max-xl:hidden xl:w-[25.5rem]">
        <div className="bg-neutral-0 rounded-2xl border border-neutral-300 p-8">
          <RightContent data={data} />
          {!isDetail && (
            <div className="mt-6 space-y-6">
              {isReceived ? (
                <>
                  <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleUse}>
                    Dùng ngay
                  </button>
                  <button className="btn btn-ghost btn-lg w-full rounded-full" onClick={handleView}>
                    Xem ưu đãi trong kho của bạn
                  </button>
                </>
              ) : isRequiredPoint ? (
                <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleExchange}>
                  Đổi ngay {toNumber(data.point||0)} điểm
                </button>
              ) : (
                <button className="btn btn-primary btn-lg w-full rounded-full" onClick={handleReceive}>
                  Nhận ngay
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RightContent = ({ data }: VoucherContentProps) => {
  const attributes = [
    { title: 'Điểm đổi', value: toNumber(data.point||0) },
    { title: 'Hiệu lực', value: data.expire_duration }
  ];

  return (
    <div className="space-y-6">
      <div>
        <DiscountTag price={Number(data.price || '0')} />
        <h3 className="mt-3 text-s-sm font-bold">{data.title}</h3>
      </div>
      <div className="space-y-4">
        {attributes.map(({ title, value }) => {
          return (
            <div key={title}>
              <p className="text-neutral-500 text-sm">{title}</p>
              <p className="text-lg font-bold mt-1">{value}</p>
            </div>
          );
        })}
      </div>
      <hr className="border-neutral-400" />
      <div className="space-y-2">
        <p className="text-lg">
          <b>Điều kiện</b>
        </p>
        <div className=" max-h-56 overflow-auto noteVoucher" dangerouslySetInnerHTML={{ __html: data.note || '' }} />
      </div>
    </div>
  );
};

export default VoucherContent;
