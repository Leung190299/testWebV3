import phone1 from '@/components/pages/assets/phone-1.png';
import phone2 from '@/components/pages/assets/phone-2.png';
import phone3 from '@/components/pages/assets/phone-3.png';
import phone4 from '@/components/pages/assets/phone-4.png';
import CardNotification from '@/components/pages/profiles/component/card/card-notification';
import React, { useState } from 'react';

const dataNotificationOrder = [
  {
    image: phone1,
    title: 'Giao hàng thành công',
    description: 'Kiện hàng của đơn hàng ITEL123458793 đã giao thành công đến bạn!',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: phone1,
    title: 'Đơn hàng đã hoàn tất',
    description: 'Kiện hàng của đơn hàng ITEL123458793 đã giao thành công đến bạn!',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: phone3,
    title: 'Giao hàng thành công',
    description: 'Đơn mua GÓI CƯỚC  ITELMATHE34563 đã hoàn thành.',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: phone4,
    title: 'Giao hàng thành công',
    description: 'Đơn mua GÓI CƯỚC  ITELMATHE34563 đã hoàn thành.',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: phone2,
    title: 'Giao hàng thành công',
    description: 'Kiện hàng của đơn hàng ITEL123458793 đã giao thành công đến bạn!',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: phone1,
    title: 'Đơn hàng đã hoàn tất',
    description: 'Kiện hàng của đơn hàng ITEL123458793 đã giao thành công đến bạn!',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: phone2,
    title: 'Giao hàng thành công',
    description: 'Đơn mua GÓI CƯỚC  ITELMATHE34563 đã hoàn thành.',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: phone4,
    title: 'Giao hàng thành công',
    description: 'Đơn mua GÓI CƯỚC  ITELMATHE34563 đã hoàn thành.',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  }
];
const NotificationOrder = () => {
  const [isClickViewAll, setIsClickViewAll] = useState<boolean>(false);

  return (
    <section className="-mx-1 mt-2 md:mt-6 flex flex-col ">
      {dataNotificationOrder.slice(0, isClickViewAll ? dataNotificationOrder.length : 5).map((item) => (
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
export default NotificationOrder;
