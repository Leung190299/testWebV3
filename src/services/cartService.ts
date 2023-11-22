import { API } from '@/network';

type Props = {
  addProduct: (param: cartModel.ParamAdd) => Promise<cartModel.responseResult<string>>;
  getListCart: (param: cartModel.ParamCart) => Promise<cartModel.responseResult<cartModel.ProductCart[]>>;
  payment: (param: cartModel.PaymentInfo) => Promise<cartModel.responseResult<string>>;
  getDelivery: (
    param: cartModel.ParamDelivery,
    type: cartModel.NameDelivery
  ) => Promise<cartModel.responseResult<cartModel.ResultDelivery[]>>;
  getFee: (param: cartModel.paramFee) => Promise<cartModel.responseResult<cartModel.Fee>>;
  getFeeAndDeliveryTime: (param: cartModel.IsFast) => Promise<cartModel.responseResult<cartModel.ResultFee>>;
  getStores: (param: cartModel.ParamDelivery) => Promise<cartModel.responseResult<cartModel.Store[]>>;
  createOrder: (param: cartModel.PaymentInfo) => Promise<cartModel.responseResult<any>>;
  payOrder: (param: cartModel.ParamPayment) => Promise<cartModel.responseResult<cartModel.ResultPayment>>;
  createOrderBaseus: (param: cartModel.ParamBaseus) => Promise<cartModel.responseResult<string>>;
  deleteProduct: (id: string | number) => Promise<cartModel.responseResult<string>>;
  getOTPCOD: (phone: string) => Promise<cartModel.responseResult<null>>;
  setQuality: (param: cartModel.paramQuality) => Promise<cartModel.responseResult<any>>;
  getMethodPayment: () => Promise<cartModel.responseResult<cartModel.resultPayment>>;
  getCheckCode: (param: cartModel.PaymentInfo) => Promise<cartModel.ResultCheckCode>;
  getPayment: () => Promise<cartModel.responseResult<cartModel.payment>>,
  getCheckMGT:(param: cartModel.PaymentInfo)=>Promise<cartModel.responseResult<{phoneMGT?:string}>>
};

const CartService: Props = {
  addProduct: (param) => API.instance.post('cart/save-cart', param),
  getListCart: (param) => API.instance.post('cart/get-list-cart', param),
  payment: (param) => API.instance.post('order/create-order', param),
  getDelivery: (param, type) => API.instance.post(`getMasterData/${type}`, param),
  getFee: (params) => API.instance.get('shipment/calculate_fee', { params }),
  getFeeAndDeliveryTime: (params) => API.instance.post('get_fee_and_delivery_time', params),
  getStores: (param) => API.instance.post('getMasterData/Stores1', param),
  createOrder: (param) => API.instance.post('order/create-order', param),
  payOrder: (param) => API.instance.post('order/pay-order', param),
  createOrderBaseus: (param) => API.instance.post('baseus/createdOrder', param),
  deleteProduct: (id) => API.instance.get(`cart/delete-cart/${id}`),
  getOTPCOD: (phone) => API.instance.get(`otp_cod/${phone}`),
  setQuality: (param) => API.instance.post('cart/up-quantity', param),
  getMethodPayment: () => API.instance.post('get-payment-method'),
  getCheckCode: (param) => API.instance.post('order/check-code', param),
  getPayment: () => API.instance.post('/get-payment-method', {}),
  getCheckMGT:(param)=>API.instance.post('/check-MGT',param)
};

export default CartService;
