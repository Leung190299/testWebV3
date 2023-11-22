import imageTest1 from '@/components/pages/assets/image-test-1.png';
import CardNotification from '@/components/pages/profiles/component/card/card-notification';
import React, { useState } from 'react';

const dataNotificationSystem = [
  {
    image: imageTest1,
    title: 'Mệt mỏi vì xếp hàng mua vé xe khách?',
    description: 'Sao phải khổ cực vậy, cứ lên My iTel chọn tuyến đường, ghế ngồi và thanh toán cực dễ dàng',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Mệt mỏi vì xếp hàng mua vé xe khách?',
    description: 'Sao phải khổ cực vậy, cứ lên My iTel chọn tuyến đường, ghế ngồi và thanh toán cực dễ dàng',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Mệt mỏi vì xếp hàng mua vé xe khách?',
    description: 'Sao phải khổ cực vậy, cứ lên My iTel chọn tuyến đường, ghế ngồi và thanh toán cực dễ dàng',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Mệt mỏi vì xếp hàng mua vé xe khách?',
    description: 'Sao phải khổ cực vậy, cứ lên My iTel chọn tuyến đường, ghế ngồi và thanh toán cực dễ dàng',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Mệt mỏi vì xếp hàng mua vé xe khách?',
    description: 'Sao phải khổ cực vậy, cứ lên My iTel chọn tuyến đường, ghế ngồi và thanh toán cực dễ dàng',
    dateTime: '11:30 07/03/2023',
    isViewEd: false
  },
  {
    image: imageTest1,
    title: 'Bạn quá bận rộn? Hãy để My iTel giúp!',
    description: 'Với tính năng tiện ích, bạn có thể dễ dàng nạp tiền điện thoại, 3G/4G, thanh toán hóa đơn dù ở bất kỳ đâu.',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: imageTest1,
    title: 'Bạn quá bận rộn? Hãy để My iTel giúp!',
    description: 'HSD đến 21/06/2023. ⏰ Sử dụng ngay trước khi hết hạn',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  },
  {
    image: imageTest1,
    title: 'Bạn quá bận rộn? Hãy để My iTel giúp!',
    description: 'Với tính năng tiện ích, bạn có thể dễ dàng nạp tiền điện thoại, 3G/4G, thanh toán hóa đơn dù ở bất kỳ đâu.',
    dateTime: '11:30 07/03/2023',
    isViewEd: true
  }
];
const NotificationSystem = () => {
  const [isClickViewAll, setIsClickViewAll] = useState<boolean>(false);

  return (
    <section className="-mx-1 mt-2 md:mt-6 flex flex-col ">
      {dataNotificationSystem.slice(0, isClickViewAll ? dataNotificationSystem.length : 5).map((item) => (
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
export default NotificationSystem;
