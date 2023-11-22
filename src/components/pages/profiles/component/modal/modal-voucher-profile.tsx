import React, { useRef } from 'react';
import dayjs from 'dayjs';
import { Data, Model } from '@/types/model';
import clsx from 'clsx';
import { MethodPopupConfirmVoucher } from '@/components/voucher/PopupConfirmVoucher';
import { useModal } from '@/libs/modal';
import Barcode from 'react-barcode';

type PropsDetailVoucher = Data.VoucherDetail & {
  isPopup?: boolean;
  voucherUsed?: boolean;
};

export default function VoucherProfileModal({ isPopup, voucherUsed = false, ...data }: PropsDetailVoucher) {
  const popupRef = useRef<MethodPopupConfirmVoucher>(null);
  const { close, done } = useModal();

  const handleOpenConfirm = () => {
    if (isPopup) {
      popupRef.current?.onMakeIsUseNow();
    }
    close();
    done({});
  };

  return (
    <>
      <div className={`w-full lg:flex lg:gap-10`}>
        <div className="lg:w-[60%]">
          <div className="w-full md:px-0">
            <div className="relative aspect-video overflow-hidden md:rounded-2xl lg:w-full">
              <img className="w-full object-cover" src={data.banner} alt={data.title} />
              <div className="absolute bottom-6 left-6 aspect-square w-18 overflow-hidden rounded-full">
                <img className="w-full object-cover md:block hidden" src={data.logo} alt={data.title} />
              </div>
              <div className="md:hidden absolute left-0 bottom-0 tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 p-2 text-sm font-bold">
                Giảm 50.0000đ
              </div>
            </div>
          </div>
          <div className="hidden md:block w-fit rounded-r-2xl bg-gradient-price px-4 py-2 text-xl text-neutral-0 lg:hidden md:mt-6">
            Giảm 50.000đ
          </div>
          <h1 className={clsx('py-3 md:text-[40px] leading-tight text-xl text-neutral-800  md:px-0', isPopup && 'px-4')}>
            <b>
             { data.title}
            </b>
          </h1>
          {voucherUsed && (
            <div className="max-md:hidden">
              <div className="mt-3 md:mt-3 flex flex-col items-center text-sm md:text-base">
                <Barcode displayValue={false} width={3} height={80} value="4456466774" textMargin={0} />4 4 5 6 4 6 6 7 7 4
              </div>
              <p className="max-md:hidden text-subtle-content text-center text-sm mb-6 mt-3">
                Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán.
              </p>
            </div>
          )}

          <div className={clsx('mt-3 lg:hidden md:px-0', isPopup && 'px-4')}>
            <div className="flex md:gap-40 text-sm gap-12">
              <div>
                <p>Điểm đổi</p>
                <b className="md:text-xl text-base">{data.point} điểm</b>
              </div>
              <div>
                <p>Hiệu lực</p>
                <b className="md:text-xl text-base">
                  {dayjs(data.avaiable_from).format('DD.MM.YYYY')} - {dayjs(data.expired_at).format('DD.MM.YYYY')}
                </b>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 text-base">
              <b className="text-xl">Điều kiện</b>
              <div dangerouslySetInnerHTML={{ __html: data.require.descHTML }} />
            </div>
          </div>
          <div className={clsx('md:px-0', isPopup && 'px-4')}>
            <div className="my-6 h-[1px] w-full bg-neutral-300 lg:hidden" />
          </div>
          {voucherUsed && (
            <div className="md:hidden">
              <div className="mt-3 md:mt-3 flex flex-col items-center text-sm md:text-base">
                <Barcode displayValue={false} width={3} height={80} value="4456466774" textMargin={0} />4 4 5 6 4 6 6 7 7 4
              </div>
              <p className="text-subtle-content text-center text-sm mb-6 mt-3">
                Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán.
              </p>
            </div>
          )}
          <b className={clsx('text-xl md:px-0 max-md:text-neutral-800 max-md:font-bold max-md:text-base', isPopup && 'px-4')}>Thông tin chương trình</b>
          <div>
            {/* {Responsive for PC} */}
            <div className="pt-6 px-2 max-md:px-4 xl:pr-4 md:pl-0 bg-neutral-0 md:bg-transparent md:pb-0">
              <div className="font-semibold">Phạm vi sử dụng:</div>
              <ul className="list-disc px-8 mt-2">
                <li><b>Offline:</b> Sử dụng tại tất cả các cửa hàng The Coffee House. <b>(Trừ các cửa hàng Destination tại Phú Quốc, Bà Đen Tây Ninh, Signature)</b>. Vui lòng xem thông tin cửa hàng tại "Vị trí cửa hàng".</li>
                <li><b>Online</b> trên website <b>https://thecoffeehouse.com/</b> hoặc sử dụng trên <b>app The Coffee House.</b> </li>
              </ul>
              (Lưu ý: Đơn đặt hàng online phải trước 21H hàng ngày)

              <div className="font-semibold mt-8">Lưu ý, áp dụng, không áp dụng:</div>
              <ul className="list-disc px-8 mt-2">
                <li>Voucher áp dụng mua bánh, nước, snack.</li>
                <li>Không áp dụng mua sản phẩm CPG (trà đóng gói, trà túi lọc, cà phê hoà tan).</li>
                <li>eGift được tích điểm thành viên trên app của The Coffee House.</li>
                <li>Chỉ sử dụng 01 voucher / 1 hóa đơn.</li>
                <li>eGift không áp dụng với các chương trình khuyến mãi khác tại: cửa hàng / website / app.</li>
                <li>eGift chỉ có giá trị sử dụng một lần. Không chấp nhận eGift quá hạn sử dung, trạng thái “Đã sử dụng”.</li>
                <li>eGift sẽ không được hoàn lại tiền thừa và không có giá trị quy đổi thành tiền mặt. Khách hàng có thể được yêu cầu trả thêm tiền nếu sử dụng quá giá trị của eGift.</li>
                <li>Khách hàng có trách nhiệm bảo mật thông tin eGift sau khi đặt mua. UrBox sẽ không chịu trách nhiệm hoàn trả các eGift bị mất hoặc ở trạng thái “Đã sử dụng” sau thời gian eGift được xuất ra với bất kì lý do gì.</li>
                <li>rBox không chịu trách nhiệm đối với chất lượng của sản phẩm hoặc dịch vụ được cung cấp cũng như đối với các tranh chấp về sau giữa khách hàng và The Coffee House.</li>
                <li>UrBox có quyền sửa chữa hoặc thay đổi điều khoản và điều kiện mà không thông báo trước.</li>
              </ul>

              <div className="font-semibold mt-8">Hỗ trợ:</div>
              Hotline UrBox: <b>1900 299 232</b> (từ 8h-22h hàng ngày, bao gồm lễ tết) để được hỗ trợ.

              <div className="mt-8 mb-4 text-2xl font-semibold">Hướng dẫn sử dụng</div>
              <ul className="list-disc px-8 mt-2">
                <li><b>Bước 1:</b> Khách hàng thực hiện "Đổi điểm" để lấy mã voucher</li>
                <li><b>Bước 2:</b> Xem chi tiết mã voucher và điều kiện sử dụng tại "Quà của tôi"</li>
                <li><b>Bước 3:</b> Khách hàng đến trực tiếp cửa hàng của hệ thống The Coffee House, app hoặc website The Coffee House để sử dụng voucher. Vui lòng cung cấp mã cho nhân viên tại quầy khi thanh toán để được áp dụng giảm trừ, Sản phẩm/dịch vụ vượt quá giá trị của voucher, khách hàng vui lòng thanh toán bổ sung phần giá trị vượt quá.</li>
              </ul>

              <div className="mt-8 mb-4 text-2xl font-semibold">Thông tin thương hiệu</div>
              The Coffee House có lẽ đã là chuỗi cửa hàng cà phê quá quen thuộc với giới trẻ.
              <br/>Bắt đầu ra mắt vào năm 2014 nhưng với cái tên The Coffee House và sự phát triển của thương hiệu là điều đáng mơ ước, đặc biệt trong ngành F&B. Ngôi nhà cà phê tự tin cho biết sẽ trở thành Starbucks thứ 2 ở Việt Nam, khi nhắc tới The Coffee House là nhắc tới một thương hiệu cà phê Việt.
            </div>
          </div>

        </div>
        <div className="hidden h-fit w-[40%] rounded-2xl border border-neutral-200 bg-neutral-0 p-8 max-md:pt-0 lg:block">
          <div className=" w-fit rounded-r-2xl bg-gradient-price px-4 py-2 text-xl text-neutral-0 ">Giảm 50.000đ</div>
          <p className="py-3 text-2xl text-neutral-800">
            <b>{data.title}</b>
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p>Hạn sử dụng</p>
              <b className="text-xl">{dayjs(data.from).format('DD/MM/YYYY')}</b>
            </div>
          </div>
          <div className="my-6 h-[1px] w-full bg-neutral-300" />
          <div className="mt-6 flex flex-col gap-2 text-base">
            <b className="text-xl">Điều kiện</b>
            <div dangerouslySetInnerHTML={{ __html: data.require.descHTML }} />
            <br />
            <b> Chi tiết vui lòng xem thông tin bên trái.</b>
            {!voucherUsed && (
              <button className="btn-primary btn mt-6 rounded-full px-24 py-4 text-base" onClick={handleOpenConfirm}>
                Dùng ngay
              </button>
            )}
          </div>
        </div>
      </div>

      {!voucherUsed && (
        <div className="fixed bottom-0 left-0 z-[51] w-full lg:hidden max-md:hidden">
          <div className="flex justify-between border-t border-neutral-200 bg-neutral-0 px-10 py-4">
            <div>
              <p className="text-sm text-neutral-400">Voucher</p>
              <p className="text-2xl text-neutral-800">
                <b>Giảm ngay 50.000đ</b>
              </p>
            </div>
            <button className="btn-primary btn rounded-full md:px-9 md:py-4 py-3 px-4 text-base" onClick={handleOpenConfirm}>
              Dùng ngay
            </button>
          </div>
        </div>
      )}
      {!voucherUsed && (
        <div className="fixed bottom-0 left-0 z-30 w-full md:hidden">
          <div className="flex justify-between border-t border-neutral-200 bg-neutral-0 px-6 py-4 pt-2">
            <button
              className="btn-primary btn rounded-full w-full text-base"
              onClick={() => {
                handleOpenConfirm();
                done({});
              }}
            >
              Dùng ngay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
