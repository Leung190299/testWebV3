export const MAX_PRICE = 50_000_000;
export const IMALL_PRICE_LIST: { id: string; value: [number, number]; name: string }[] = [
  { id: 'all', value: [0, MAX_PRICE], name: 'Giá mặc định' },
  { id: '2', value: [0, 100_000], name: 'Dưới 100k' },
  { id: '3', value: [100_000, 150_000], name: 'Từ 100k - 150k' },
  { id: '4', value: [151_000, 199_000], name: 'Từ 151k - 199k' },
  { id: '5', value: [200_000, 500_000], name: 'Từ 200k - 500k' },
  { id: '6', value: [501_000, 1_000_000], name: 'Từ 501k - 1 triệu' },
  { id: '7', value: [1_000_000, MAX_PRICE], name: 'Trên 1 triệu' }
];

export const DEFAULT_PRICE = [50_000, 1_000_000] as [number, number];

export const IMALL_DEVICE_ATTRIBUTES = [
  {
    title: 'ROM',
    type: 'rom',
    options: [
      { value: 0, name: '256GB' },
      { value: 1, name: '128GB (Chọn nhiều)' },
      { value: 2, name: '64 GB' },
      { value: 3, name: '32GB' },
      { value: 4, name: '512GB' },
      { value: 5, name: '16GB' }
    ]
  },
  {
    title: 'RAM',
    type: 'ram',
    options: [
      { value: 0, name: '4GB' },
      { value: 1, name: '8GB (Chọn nhiều)' },
      { value: 2, name: '6GB' },
      { value: 3, name: '3 GB' },
      { value: 4, name: '2GB' }
    ]
  },
  {
    title: 'Camera sau',
    type: 'camera_behind',
    options: [
      { value: 0, name: '> 16MP' },
      { value: 1, name: '14MP - 16MP' },
      { value: 2, name: '11MP - 13MP' },
      { value: 3, name: '8MP - 10MP' },
      { value: 4, name: '<8MP' }
    ]
  },
  {
    title: 'Camera trước',
    type: 'camera_front',
    options: [
      { value: 0, name: '> 12MP' },
      { value: 1, name: '8MP - 12MP' },
      { value: 2, name: '5MP - 8MP' },
      { value: 3, name: '<8MP' }
    ]
  },
  {
    title: 'Kích thước màn hình',
    type: 'size',
    options: [
      { value: 0, name: '> 5.5 inch' },
      { value: 1, name: '5 inch - 5.5 inch' },
      { value: 2, name: '<4.5 inch' }
    ]
  },
  {
    title: 'Dung lượng Pin',
    type: 'battery',
    options: [
      { value: 0, name: '> 5.000 mAh' },
      { value: 1, name: '3.500 mAh - 5.000 mAh' },
      { value: 2, name: '2.500 mAh - 3.500 mAh' },
      { value: 3, name: '<2.500 mAh' }
    ]
  },
  {
    title: 'Màu sắc',
    type: 'color',
    options: [
      { value: 0, name: 'Xanh' },
      { value: 1, name: 'Đen' },
      { value: 2, name: 'Xanh dương' },
      { value: 3, name: 'Xám' },
      { value: 4, name: 'Đỏ' }
    ]
  }
];
