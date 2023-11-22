const formattedPrice = (price: number = 0) => {
  const str = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  return str.slice(0, -1).trim() + 'đ';
};

export { formattedPrice };
