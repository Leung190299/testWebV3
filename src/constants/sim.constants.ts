import { SimModel } from '@/types/pick-sim';

type Options = { id: string | number; name: string };

export const simTypes: SimModel.TypeOption[] = [
  { id: 1, name: 'Các số >= 6' },
  { id: 2, name: 'Số gánh' },
  { id: 3, name: 'Tam hoa' },
  { id: 4, name: 'Lộc phát' },
  { id: 5, name: 'Taxi' },
  { id: 6, name: 'Số lặp' },
  { id: 7, name: 'Tứ quý' },
  { id: 8, name: 'Sim 0 đồng' },
  { id: 9, name: 'Đặc biệt' }
  // { id: 10, name: 'Năm sinh' }
];

export const packs: SimModel.TypeOptionPack[] = [
  {
    id: 'all',
    name: 'Tất cả'
  },
  {
    id: 'MAY_B',
    name: 'MAY'
  },
  {
    id: 'ITEL100_B',
    name: 'ITEL100'
  },
  {
    id: 'ITEL149_B',
    name: 'ITEL149'
  },
  {
    id: 'ITEL199_B',
    name: 'ITEL199'
  }
];

export const sorts: Array<{ id: string; name: string; property?: string; value?: string }> = [
  { id: 'all', name: 'Giá mặc định', value: 'default' },
  { id: '3', name: 'Giá tăng dần', property: 'price', value: 'asc' },
  { id: '2', name: 'Giá giảm dần', property: 'price', value: 'desc' },
  { id: '4', name: 'Giá ngẫu nhiên', property: 'price', value: 'random' }
];

export const MAX_PRICE = 5_000_000;
export const priceRange: Array<Options & { value: [number, number] }> = [
  { id: 'all', value: [0, 5_000_000], name: 'Mặc định' },
  { id: '2', value: [0, 100_000], name: 'Dưới 100k' },
  { id: '3', value: [100_000, 150_000], name: 'Từ 100k - 150k' },
  { id: '4', value: [151_000, 199_000], name: 'Từ 151k - 199k' },
  { id: '5', value: [200_000, 500_000], name: 'Từ 200k - 500k' },
  { id: '6', value: [501_000, 1_000_000], name: 'Từ 501k - 1 triệu' },
  { id: '7', value: [1_000_000, MAX_PRICE], name: 'Trên 1 triệu' }
];
export const searchTabs = [
  { id: 1, label: 'Sim Phong thủy' },
  { id: 2, label: 'Chấm điểm SIM' }
];
export enum SimQuery {
  Basic = '1',
  MarkPhone = '2'
}

export const fengShuiTabs = [
  { id: SimQuery.Basic, label: 'Sim Phong thuỷ' },
  { id: SimQuery.MarkPhone, label: 'Chấm điểm SIM' }
];
export const numerologyTabs = [
  { id: SimQuery.Basic, label: 'Sim Thần số học' },
  { id: SimQuery.MarkPhone, label: 'Chấm điểm SIM' }
];

export const paramsSimSearch = {
  columnFilters: {
    vip: true,
    normal: true,
    year: 0,
    price1: 0,
    // simCategory: 0,
    except: [],
    simGroup: [17, 16, 48, 41, 19, 135, 18, 12],

    price: [1, 2, 3, 4],
    simPriceFrom: 0,
    simPriceTo: 0,
    packName: '',
    search: ''
  },
  extra: {
    price_sort: 'default'
  },
  sort: [],
  page: 1,
  pageSize: typeof window != 'undefined' && innerWidth > 500 ? 20 : 10
};

export const gift = {
  id: 1,
  name: 'Khung ảnh',
  category: 'Trang trí',
  image: 'https://images-ng.pixai.art/images/orig/aa4ede38-2087-41de-a71b-d99257bda3ef',
  price: 500000,
  count: 1
};

export const paramsListPack = {
  dataPerDay: 0,
  page: 1,
  pageSize: 10,
  paramSearch: '',
  searchType: 0,
  typePrice: 0,
  type: 0
};
