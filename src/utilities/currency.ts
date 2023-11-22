export function toCurrency(price: number) {
  return price.toLocaleString('vi') + 'đ';
}
export function toNumber(price: number) {
  return price.toLocaleString('vi')+'' ;
}
