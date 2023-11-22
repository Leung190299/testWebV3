export const datas = [
  { id: 0, name: 'Tất cả dung lượng' },
  { id: 4, name: 'Từ 4GB/ ngày' },
  { id: 3, name: 'Từ 2-4GB/ ngày' },
  { id: 2, name: 'Từ 1-2GB/ ngày' },
  { id: 1, name: 'Dưới 1GB/ ngày' }
];
export const sorts: Array<{ id: number; name: string; property?: string; value?: string }> = [
  { id: 0, name: 'Mặc định' },
  { id: 1, name: 'Giá từ thấp đến cao', property: 'price', value: 'asc' },
  { id: 2, name: 'Giá từ cao đến thấp', property: 'price', value: 'desc' }
];
