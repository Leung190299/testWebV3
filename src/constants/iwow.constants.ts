import Routers from '@/routes/routers';

export const TAB_MENU_IWOW = [
  { id: 0, title: 'Ưu đãi iTel Club', path: Routers.PROMOTION_ICLUB },
  { id: 1, title: 'Săn quà iZui', path: Routers.PROMOTION_IZUI },
  { id: 2, title: 'Chương trình hot', path: Routers.PROMOTION_HOT }
];

export const TAB_CATEGORIES_CLUB = [
  { id: 0, title: 'Tất cả' },
  { id: 1, title: 'Làm đẹp - sức khỏe' },
  { id: 2, title: 'Ăn uống' },
  { id: 3, title: 'Tiện ích' },
  { id: 4, title: 'Giải trí' },
  { id: 5, title: 'Mua sắm' },
  { id: 6, title: 'eVoucher' }
];

export const FILTER_VOUCHER_BY_PPOINT = [
  { id: -1, name: 'Mặc định' },
  { id: 0, name: 'Dưới 1.000 điểm' },
  { id: 2, name: 'Từ 1.000 - 5.000 điểm' },
  { id: 3, name: 'Từ 5.000 - 10.000 điểm' },
  { id: 4, name: 'Trên 10.000 điểm' }
];
