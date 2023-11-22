import { RootState } from '../store';

export function selectCartItems(state: RootState) {
  return state.cart.cartItems;
}
export function selectCartSimItems(state: RootState) {
  return state.cart.cartSimItem;
}
export function getTotalItemInCart(state: RootState) {
  return state.cart.cartItems.length + state.cart.cartSimItem.length;
}
export function getCartProduct(state: RootState) {
return state.cartApi
}
export function getInfoEKYC(state: RootState){
  return state.activeSim
}
export function getUpdateInfo(state: RootState){
  return state.updateInfo
}
export function getFee(state: RootState) {
  return state.fee.fees
}
export function getVoucher(state: RootState) {
  return state.fee.voucher
}
export function getMGT(state: RootState) {
  return state.fee.MGT
}
export function getSims(state: RootState) {
  return state.fee.sims
}
