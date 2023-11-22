import icon2 from '@/components/pages/assets/icon-cancel.png';
import ProductItem from '@/components/pages/profiles/detail-order/product-item';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const productSession = [
  {
    id: 'ITEL123456',
    product: {
      productName: 'Sim 0876 331357 và gói cước',
      productDescription: '087 544 4676/ eSim',
      price: '298.000đ',
      productChild: [
        { name: '087 633 1357', description: 'eSim', price: '149.000đ' },
        { name: 'Gói ITEL77', description: 'Cam kết trong 36 tháng', price: '149.000đ' }
      ]
    }
  },
  {
    id: 'ITEL123489',
    product: {
      productName: 'SSim và gói cước',
      productDescription: '087 544 4676/ eSim',
      price: '298.000đ',
      productChild: [
        { name: 'Tai nghe Sony không dây', description: 'Quà tặng', price: '149.000đ' },
        { name: 'Gói ITEL77', description: 'Cam kết trong 36 tháng', price: '149.000đ' },
        { name: '087 633 1357', description: 'eSim', price: '149.000đ' },
        { name: 'Gói ITEL77', description: 'Cam kết trong 36 tháng', price: '149.000đ' }
      ]
    }
  }
];
const OrderCancel = () => {
  const router = useRouter();

  const handlerViewDetail = useCallback(
    (id: string) => {
      void router.push(`/profile/order/detail-package/1?step=5&idItem=${id}&tabs=notification_delivered`);
    },
    [router]
  );

  return (
    <section className="-mx-1 mt-2 md:mt-6 flex flex-col ">
      {productSession.map((item) => (
        <div key={item.id} className="mb-[1rem]">
          <div className="don-hang px-4 py-4 md:px-8 md:py-6 bg-neutral-0 rounded-xl">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <p className="text-neutral-800 font-bold text-xl">Đơn hàng #{item.id}</p>
                <p className="text-neutral-500 text-xs font-medium">1 sản phẩm</p>
              </div>
              <hr className="border-neutral-300 mb-6 mt-6" />
            </div>
            <div className="wrap-item">
              <ProductItem product={item.product} />
            </div>
            <div className="bg-neutral-50 px-4 py-3 md:px-4 md:py-5 rounded-xl mt-2 md:mt-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-2">
                  <Image src={icon2} alt="ad" />
                  <p className="font-normal text-neutral-800 text-sm md:text-base">Đơn hàng đã bị hủy từ phía người dùng</p>
                </div>
                <p className="gap-2 hidden md:flex flex-row">
                  <span className="text-neutral-500 text-base font-medium">Tổng tiền:</span>
                  <span className="text-neutral-800 text-base font-bold">50.000đ</span>
                </p>
              </div>
            </div>
            <p className="gap-2 flex md:hidden flex-row justify-between mt-4 mb-4">
              <span className="text-neutral-500 text-base font-medium">Tổng tiền:</span>
              <span className="text-neutral-800 text-base font-bold">50.000đ</span>
            </p>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-4">
              <div className="flex flex-row gap-1 mt-4 md:mt-0">
                <p className="hidden md:inline-block font-normal text-xs md:text-sm text-neutral-500">
                  Quý khách vui lòng bấm <span className="text-neutral-800 text-sm md:text-base font-bold">Đặt lại</span> để tiếp tục đặt
                  hàng
                </p>

                <p className="inline-block text-center md:hidden font-normal text-xs md:text-sm text-neutral-500">
                  Quý khách vui lòng bấm <span className="text-neutral-800 text-sm md:text-base font-bold">Đặt lại</span> để tiếp tục đặt
                  hàng
                </p>
              </div>
              <div className="flex flex-row gap-4 w-full md:w-fit">
                <button
                  onClick={() => handlerViewDetail(item.id)}
                  className="md:min-w-max text-sm btn btn-secondary rounded-full w-full md:w-fit"
                >
                  Xem chi tiết
                </button>
                <button className="md:min-w-max transition-default text-sm btn-primary btn w-full rounded-full md:w-fit">Đặt lại</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
export default OrderCancel;
