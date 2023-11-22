import imageTest1 from '@/components/pages/assets/image-test-1.png';
import CardNotification from '@/components/pages/profiles/component/card/card-notification';
import Image from 'next/image';
import React, { useState } from 'react';
import imageVoucher from '@/components/pages/assets/vourcher-image-test.png';

const dataNotification = [
  {
    image: imageTest1,
    title: 'Mã giảm giá dành riêng cho bạn! ❤️',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 50% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageVoucher,
    title: 'Tặng bạn Voucher Freeship 30k',
    description: 'Freeship 24K cho đơn hàng từ 250. HSD đến 21/06/2023.',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageVoucher,
    title: 'Giao hàng thành công',
    description: 'Kiện hàng của đơn hàng ITEL123458793 đã giao thành công đến bạn!',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 250% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 510% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 500% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 10% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: imageTest1,
    title: 'Ưu đãi giảm 20% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  }
];
const NotificationAll = () => {
  const [isClickViewAll, setIsClickViewAll] = useState<boolean>(false);

  return (
    <section className="-mx-1 mt-2 md:mt-6 flex flex-col max-md:mb-1.5">
      {dataNotification.slice(0, isClickViewAll ? dataNotification.length : 5).map((item) => (
        <CardNotification item={item} key={item.title} />
      ))}
      {!isClickViewAll && (
        <button
          onClick={() => setIsClickViewAll(true)}
          className="btn btn-secondary max-md:mb-4 max-md:mt-4 rounded-full w-full max-w-[160px] m-auto"
        >
          Xem thêm
        </button>
      )}
    </section>
  );
};
export default NotificationAll;
