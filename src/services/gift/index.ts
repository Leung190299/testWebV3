export const giftProducts = [
  { id: 1, name: 'Tai nghe', category: 'Âm thanh' },
  { id: 2, name: 'Móc chìa khoá', category: 'Phụ kiện' },
  { id: 3, name: 'Bút bi cao cấp', category: 'Văn phòng phẩm' },
  { id: 4, name: 'Gấu bông', category: 'Đồ chơi' },
  { id: 5, name: 'Bình nước', category: 'Phụ kiện' },
  { id: 6, name: 'Ổ cắm điện thông minh', category: 'Gia dụng' },
  { id: 7, name: 'Áo thun', category: 'Thời trang' },
  { id: 8, name: 'Máy in mini', category: 'Công nghệ' },
  { id: 9, name: 'Hộp đựng đồ trang sức', category: 'Phụ kiện' },
  { id: 10, name: 'Balo du lịch', category: 'Phụ kiện' },
  { id: 11, name: 'Túi xách', category: 'Thời trang' },
  { id: 12, name: 'Gương trang điểm', category: 'Gia dụng' },
  { id: 13, name: 'Ốp lưng điện thoại', category: 'Phụ kiện' },
  { id: 14, name: 'Bộ sưu tập tem', category: 'Sưu tầm' },
  { id: 15, name: 'Khung ảnh', category: 'Trang trí' },
  { id: 16, name: 'Thẻ nhớ', category: 'Công nghệ' },
  { id: 17, name: 'Móc treo túi', category: 'Phụ kiện' },
  { id: 18, name: 'Gối massage', category: 'Gia dụng' },
  { id: 19, name: 'Đồ chơi xếp hình', category: 'Đồ chơi' },
  { id: 20, name: 'Thước kẻ', category: 'Văn phòng phẩm' },
  { id: 21, name: 'Tai nghe không dây chụp tai Sony WH-1000XM4', category: 'Phụ kiện' }
  // Thêm các sản phẩm khác vào đây
];

export function pickRandomGift() {
  const gift = giftProducts[Math.floor(Math.random() * giftProducts.length)];
  return gift;
}
