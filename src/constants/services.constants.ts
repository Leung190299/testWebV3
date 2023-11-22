import Routers from '@/routes/routers';
import { uniqueId } from '@/utilities/unique';

export const TAB_MENU_SERVICES = [
  { id: 0, title: 'Du lịch & di chuyển', path: Routers.ITRAVEL_SERVIVE },
  { id: 1, title: 'Tài chính & Bảo hiểm', path: Routers.IFINANCE_SERVIVE },
  { id: 2, title: 'Mua sắm', path: Routers.SHOPING_SERVIVE },

];

export const FILTER_CITY = [
  { id: +uniqueId(), name: 'Hà Nội' },
  { id: +uniqueId(), name: 'An Giang' },
  { id: +uniqueId(), name: 'Bạc Liêu' },
  { id: +uniqueId(), name: 'Bắc Giang' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' },
  { id: +uniqueId(), name: 'Bắc Cạn' }
];
