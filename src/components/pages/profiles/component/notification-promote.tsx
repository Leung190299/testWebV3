import imagePromote from '@/components/pages/assets/promote-1.png';
import CardNotification from '@/components/pages/profiles/component/card/card-notification';
import React, { useState } from 'react';

const dataNotification = [
  {
    image: imagePromote,
    title: 'Tặng bạn Voucher Freeship 30k️',
    description: 'Freeship 24K cho đơn hàng từ 250. HSD đến 21/06/2023.',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: false
  },
  {
    image: imagePromote,
    title: 'Ưu đãi giảm 50% thẻ nạp điện thoại',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: false
  },
  {
    image: imagePromote,
    title: 'Ưu đãi giảm 50% các sản phẩm Oppo',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: false
  },
  {
    image: imagePromote,
    title: 'Ưu đãi giảm 50% các sản phẩm Oppo',
    description: 'Ưu đãi giảm 50% thẻ nạp điện thoại',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: false
  },
  {
    image: imagePromote,
    title: 'Ưu đãi giảm 50% các sản phẩm Oppo',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: true
  },
  {
    image: imagePromote,
    title: 'Ưu đãi giảm 50% các sản phẩm Oppo',
    description: 'Ưu đãi giảm 50% thẻ nạp điện thoại',
    dateTime: '11:30 07/03/2023',
    link: '/profile/notification/promote/1',
    isViewEd: true
  }
];
const NotificationPromote = () => {
  const [isClickViewAll, setIsClickViewAll] = useState<boolean>(false);
  return (
    <section className="-mx-1 mt-2 md:mt-6 flex flex-col">
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
export default NotificationPromote;
