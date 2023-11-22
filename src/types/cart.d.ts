namespace cartModel {
  interface ParamAdd {
    carts?: Cart[];
    userId?: string;
  }
  interface Cart {
    cartDetails?: ProductCart[];
    orderType?: number;
    totalPrice?: number;
  }
  interface ProductCart {
    eSim?: number;
    image?: string;
    originPrice?: number;
    origin_type?: string;
    price?: number;
    productId?: string;
    productType?: number;
    origin_type?: string;
    quantity?: number;
    variant?: any;
    cartId?: string;
    id?: number;
    name?: string;
    eligible?: boolean;
    months?: number;
  }
  interface responseResult<T> {
    result: T;
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }

  interface ParamCart {
    page?: number;
    pageSize?: number;
    userId?: string;
  }

  interface PaymentInfo {
    MGT?: string;
    Phone?: string;
    TotalPrice?: number;
    ShipmentFee?: number;
    vnp_Bill_Mobile?: string;
    fullName?: string;
    cart_info?: CartInfo;
    cart?: ProductCart[];
    Source?: string;
    PromotionCode?: string;
    DiscountAmount?: number;
    eligible?: boolean;
    Event?: string;
  }

  interface CartInfo {
    deliver_work_ship?: null;
    shipment_type?: string;
    ghtk_fee?: number;
    _track?: string;
    StoreId?: number;
    fullName?: string;
    ContactPhone?: string;
    email?: string;
    OTP?: string;
    CityId?: number | ResultDelivery;
    DistrictId?: number | ResultDelivery;
    WardId?: number | ResultDelivery;
    HamletId?: number | ResultDelivery;
    IsFast?: number;
    vnp_TxnRef?: string;
    addr?: string;
    eSim?: 0 | 1;
    singleEsim?: SimSingle;
    fast?: 0 | 1;
    paymentChannel?: string;
    paymentChannelObject?: Fee;
  }

  interface ParamDelivery {
    columnFilters?: ColumnFilters;
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }
  interface ColumnFilters {
    DistrictId?: number;
    CityId?: number;
    WardId?: number;
  }
  interface ResultDelivery {
    id?: number;
    value?: number;
    text?: string;
    text1?: string;
    name?: string;
  }
  enum NameDelivery {
    cities = 'GHTK_Cities',
    districts = 'GHTK_Districts',
    wards = 'GHTK_Wards',
    hamlet = 'GHTK_Hamlets'
  }
  enum DeliveryMethod {
    Home = 'home',
    Itel = 'itel'
  }

  interface paramFee {
    province?: number;
    district?: number;
    ward?: number;
    totalPrice?: number;
    fast?: 0 | 1;
    paymentChannel?: string;
    address?: string;
  }
  interface Fee {
    fee?: number;
    discountedFee?: number;
    delivery_time?: string;
  }
  interface FeeClass {
    name?: string;
    fee?: number;
    insurance_fee?: number;
    include_vat?: string;
    cost_id?: string;
    delivery_type?: string;
    a?: string;
    dt?: string;
    extFees?: any[];
    ship_fee_only?: number;
    promotion_key?: string;
    delivery?: boolean;
  }
  interface IsFast {
    addr?: string;
    city_id?: number;
  }
  interface ResultFee {
    ahamove_fee?: number;
    last_fee?: number;
    delivery_time?: string;
  }

  interface Store {
    Id: number;
    Address: string;
    Name: string;
    Lat: string;
    Long: string;
    Location: string;
  }
  enum DeliveryMethod {
    Home = 'home',
    Itel = 'itel'
  }

  enum SimSingle {
    Single = 'single',
    NoSingle = 'noSingle'
  }
  interface ParamPayment {
    orderIds?: string[];
    paymentChannel?: string;
    paymentOptions?: PaymentOptions;
  }

  interface PaymentOptions {
    VNPAY_vnp_BankCode?: string;
    OTP?: string;
  }

  export interface ResultPayment {
    orderId?: string;
    orderIds?: string[];
    paymentId?: string;
    paymentUrl?: string;
    bankId?: null;
    bankName?: null;
    bankAccountName?: null;
    bankAccountNo?: null;
    amount?: null;
    info?: null;
    qrUrl?: null;
    message?: null;
  }

  interface ParamBaseus {
    order?: Order;
  }

  interface Order {
    email?: string;
    phone?: string;
    first_name?: string;
    total_spent?: number;
    fulfillment_status?: string;
    note?: string;
    line_items?: LineItem[];
    shipping_address?: ShippingAddress;
    shipping_lines?: ShippingLine[];
  }

  interface LineItem {
    quantity?: number;
    variant_id?: number;
    variant_title?: string;
    price?: number;
    type?: string;
  }

  interface ShippingAddress {
    address1?: string;
    city?: string;
    country?: string;
    last_name?: string;
    phone?: string;
    province?: string;
    name?: string;
    country_code?: string;
    default?: boolean;
    district?: string;
    ward?: string;
  }

  interface ShippingLine {
    price?: number;
  }

  interface variantSelect {
    variant_type?: string;
    variant_name?: string;
    variant_label?: string;
    variants?: Selected[];
    selected?: Selected;
  }

  interface Selected {
    name?: string;
    value?: string;
  }

  interface paramQuality {
    UserId?: string;
    CartId?: string;
    Quantity?: number;
    ProductId?: string;
  }
  interface resultPayment {
    VIETQR: 0 | 1;
    VNPAY_VNPAYQR: 0 | 1;
    VNPAY_INTCARD: 0 | 1;
    VNPAY_VNBANK: 0 | 1;
    MOMO: 0 | 1;
    ZALOPAY: 0 | 1;
    COD: 0 | 1;
  }

  interface ResultCheckCode {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: ResultCheckCodeResult;
    extra?: null;
  }

  interface ResultCheckCodeResult {
    headers?: Headers;
    body?: Body;
    statusCode?: string;
    statusCodeValue?: number;
  }

  interface Body {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: PaymentInfo;
    extra?: null;
  }
  interface paramTimeFee {
    address: string;
    province: string;
    district: string;
    ward: string;
    fast: string;
    cod: string;
  }
  interface payment{

      VIETQR: number
      VNPAY_VNPAYQR: number
      VNPAY_INTCARD: number
      VNPAY_VNBANK: number
      MOMO: number
      ZALOPAY: number
      COD: number


  }
}
