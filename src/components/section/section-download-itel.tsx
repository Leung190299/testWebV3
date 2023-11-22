import clsx from 'clsx';
import Svg from '../icon/svg';
import { FC } from 'react';

const EXAMPLE_AD = [
  {
    id: '1',
    icon: '/icons/bold/account.svg',
    title: 'Quản lý tài khoản',
    description: 'MAX NHANH'
  },
  {
    id: '2',
    icon: '/icons/bold/movie.svg',
    title: 'Chơi Game, xem Phim',
    description: 'MIỄN PHÍ'
  },
  {
    id: '3',
    icon: '/icons/bold/izui.svg',
    title: 'Tích điểm đổi quà',
    description: 'MAX MÊ'
  },
  {
    id: '4',
    icon: '/icons/bold/iclub.svg',
    title: 'Voucher bao la, giá rẻ',
    description: 'QUÁ ĐÃ'
  }
];

interface Props {
  className?: string;
}

const SectionDownloadiTel: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('bg-neutral-0 rounded-lg text-center', className)}>
      <div className="container p-9">
        <h5 className="text-center md:text-center text-md md:text-2xl font-bold">iTel - Theo là thích. App đa tiện ích</h5>
        <h6 className="text-center md:text-center text-xs md:text-sm text-neutral-500 mt-2">
          Hàng ngàn tiện ích thú vị. Giải trí cực đỉnh
        </h6>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-3 md:mt-4">
          {EXAMPLE_AD.map((item, index) => (
            <div key={index} className="py-4 px-1">
              <Svg className="w-10 h-10 xl:w-12 xl:h-12 text-red-500 mx-auto" src={item.icon} />
              <p className="text-xs md:text-sm mt-3 md:mt-4">{item.title}</p>
              <p className="font-bold xl:mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SectionDownloadiTel;
