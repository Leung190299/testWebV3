export enum DeliveryMethod {
  Home = 'home',
  Itel = 'itel'
}
export enum SimSingle {
  Single = 'single',
  NoSingle = 'noSingle'
}
export enum NameDelivery {
  cities = 'GHTK_Cities',
  districts = 'GHTK_Districts',
  wards = 'GHTK_Wards',
  hamlet = 'GHTK_Hamlets'
}
export enum DemoStatus {
  NORMAL,
  OUT_OF_STOCK,
  PRICE_CHANGED,
  OUT_OF_STOCK_GIFT,
  EXPIRED_DISCOUNT,
  INVALID_METHOD,
  PRODUCT_HAS_NO_GIFT
}
export const statusCheckout = [
  { value: DemoStatus.NORMAL, name: 'Bình thường' },
  { value: DemoStatus.INVALID_METHOD, name: 'Hình thức thanh toán không khả dụng' },
  { value: DemoStatus.EXPIRED_DISCOUNT, name: 'Mã giảm giá hết hạn' }
];
export const statusCart = [
  { value: DemoStatus.NORMAL, name: 'Bình thường' },
  { value: DemoStatus.OUT_OF_STOCK, name: 'Có sản phẩm hết hàng' },
  { value: DemoStatus.PRICE_CHANGED, name: 'Giá sản phẩm bị thay đổi' },
  { value: DemoStatus.OUT_OF_STOCK_GIFT, name: 'Quà chọn hết' },
  { value: DemoStatus.PRODUCT_HAS_NO_GIFT, name: 'Sp hết quà' }
];

export type InstallmentMethod = {
  method: string;
  name: string;
  desc: string;
};

export enum CheckoutType {
  Recharge = 'recharge',
  BuyCode = 'code',
  BuyData = 'data',
  Item = 'item',

  // Installment
  Card = 'card',
  Profile = 'profile'
}
export const INSTALLMENT_METHODS = [
  {
    method: CheckoutType.Card,
    name: 'Trả góp qua thẻ',
    desc: 'Visa, Mastercard, JCB, Amex',
    secondaryName: 'Trả góp qua thẻ',
    secondaryDesc: 'Visa, Mastercard, JCB, Amex',
    tertiaryName: 'Trả góp qua thẻ tín dụng'
  },
  {
    method: CheckoutType.Profile,
    name: 'Trả góp qua hồ sơ',
    desc: 'Thủ tục đơn giản & nhanh chóng',
    secondaryName: 'Trả góp 0%',
    secondaryDesc: 'Duyệt hồ sơ trong 5 phút',
    tertiaryName: 'Trả góp qua TPBank'
  }
];

export const CARD_OPTIONS = [
  { id: 1, name: 'Thẻ VISA', img: '/logo/bank/VISA.png' },
  { id: 2, name: 'Thẻ Mastercard', img: '/logo/bank/Mastercard.png' },
  { id: 3, name: 'Thẻ JCB', img: '/logo/bank/JCB.png' }
];

export type InstallmentAttribute = 'price' | 'monthly_payment' | 'total_payment' | 'difference';
export const INSTALLMENT_ATTRIBUTES: { title: string; attribute: InstallmentAttribute }[] = [
  {
    title: 'Giá mua trả góp',
    attribute: 'price'
  },
  {
    title: 'Góp mỗi tháng',
    attribute: 'monthly_payment'
  },
  {
    title: 'Tổng tiền trả góp',
    attribute: 'total_payment'
  },
  {
    title: 'Chênh lệch với mua thẳng',
    attribute: 'difference'
  }
];

export const PAYMENT_METHOD_NAME = 'paymentMethod';
export const DELIVERY_METHOD_NAME = 'deliveryMethod';
export const NOTIFICATION_NAME = 'notification';

// Basic field
export const FULL_NAME = 'name';
export const PHONE_NAME = 'phone';
export const EMAIL_NAME = 'email';
export const ADDRESS_NAME = 'address';
export const IDENTITY_ID_NAME = 'identity_id';

// Delivery information
export const DELIVERY_INFOMATION = 'deliveryInfomation';
export const DELIVERY_NAME = 'deliveryInfomation.name';
export const DELIVERY_PHONE = 'deliveryInfomation.phone';
export const DELIVERY_EMAIL = 'deliveryInfomation.email';
export const DELIVERY_ADDRESS = 'deliveryInfomation.address';

export const DELIVERY_PROVINCE = 'cart_info.CityId';
export const DELIVERY_DISTRICT = 'cart_info.DistrictId';
export const DELIVERY_WARD = 'cart_info.WardId';
export const DELIVERY_HAMLET = 'cart_info.HamletId';
