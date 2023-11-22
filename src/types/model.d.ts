import { CheckoutType } from '@/constants/checkout.constants';
import { Location } from './location';
import { rechrageModel } from './recharge';

export declare namespace Model {
  interface BaseModel {
    id: number;
    updated_at: number; // we save timestamp in database
    created_at: number;
    deleted_at?: number?;
  }

  interface User {
    id: number;
    email: string?;
    name: string?;
    gender?: string;
    role: any?;
    date_of_birth?: number;

    phone: string;
    is_verified: boolean?;
    default_address_id: number?;
    image?: string;

    balance?: number?;
  }
  interface UserDataBase extends User {
    password: string?;
  }
  interface DeliveryAddress extends BaseModel {
    user_id: number;
    name: string;
    phone: string;
    //
    province: Location.BaseLocation?;
    district: Location.BaseLocation?;
    ward: Location.BaseLocation?;
    village?: Location.BaseLocation?;
    address: string;
    is_default: boolean;
  }
  interface Product {
    id: number;
    /**
     * name of product
     *
     * E.g: `Iphone 13`
     */
    name: string;
    desc: string?;
    slug: string;
    thumbnail: string;

    tags?: string[];

    category_id: number?;
    brand_id: number?;

    sale_expiry: string?;
    installment?: boolean;
  }

  interface Attribute {
    id: number;
    product_id: number;
    name: string;
    value: string;
  }

  interface ProductAttachment {
    id: number;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    product_id: number;
  }

  /**
   * Variant of product
   * e.g:
   */
  interface Variant {
    id: number;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    sold: number;
    discount_percentage: number;
    discount_price?: number?;
    slug?: string;

    /**
     * example `[3,6,9,12]`
     */
    installment_options: number[]; // represents the number of installments available

    product_id: number;
  }

  /**
   * Option of product
   */
  interface Option {
    id: number;
    /**
     * Example: `Storage Capacity` `Color`
     */
    name: string;
    product_id: number;
    default_value: number?;
    is_required: boolean;
  }
  interface OptionValue {
    id: number;
    option_id: number;
    /**
     * Example storage: `128GB` `64GB`
     * Example color: `Blue` `Black`
     */
    value: string;
  }

  interface OptionCombination {
    id: number;
    variant_id: number;
    option_value_id: number;
  }

  interface ProductOption {
    id: number;
    /**
     * Example: `Storage Capacity` `Color`
     */
    name: string;
    product_id: number;
    option_id: number;
    default_value: string?;
    is_required: boolean;
  }

  interface Rating {
    id: number;
    product_id: number;
    rate: number;
  }

  interface Category {
    id: number;
    name: string;
    parent_id: number?;
  }

  interface Brand {
    id: number;
    name: string;
  }

  interface Gift {
    id: number;
    name: string;
    image: string;
    price: number;
    count: number;
  }

  interface DiscountCode {
    id: number;
    code: string;
    name: string;
    image: string;
    is_fix: boolean;
    uses: number;
    max_uses: number;
    max_uses_user: number;
    discount_amount: number;
    minimum_order_amount: number; // Đơn hàng tối thiểu để áp dụng mã giảm giá (đơn vị là VNĐ)
    maximum_discount_amount: number; // Giá trị giảm tối đa (đơn vị là VNĐ)
    expires_at: string;
  }

  // Sim
  interface Sim {
    pack?: any;
    // pack?: PackOfData;
    id: number;
    phone: string;
    sale_expiry: string?;
    price: number;
    discount_price?: number;
    discount_percentage?: number;
    is_vip?: boolean;
    ThoiGianCamKet?: number;
    EsimPrice?: number;
    SimPrice?: number;
    SimType?: number;
    PhoneFormated?: string;
  }
  interface PackOfData {
    id: number;
    name: string;
    price: number;
    discount_price?: number;
    price_type: 'month' | 'week' | 'day' | 'year';
    data: number;
    data_type: 'day' | 'week' | 'month' | 'year';
    ThoiGianCamKet?: number;
    SimType?: number;
  }

  interface SimData {
    phone: string;
    DiemPhongThuy: number;
    SimNguHanh: string;
    SoNut: number;
    VanCatHung: string;
    QueKinhDich: string;
    price: number;
    Months: number;
    SimType: number;
  }
  // Files
  type AttachmentFile = Image | File | Video;
  interface BaseImage extends BaseModel {
    height: number;
    title: string;
    width: number;
    thumbnail: string;
    image: string;
  }
  interface Image {
    id: number;
    type: 'img';
    url: string;
    thumbnail?: string;
  }
  interface File {
    id: number;
    type: 'file';
    url: string;
  }
  interface Video {
    id: number;
    type: 'video';
    url: string;
    thumbnail: string;
  }

  // Comment
  interface Comment {
    id: number;
    user_name: string;
    user_avatar: string;
    user_rating: number;
    content: string | null;
    attachments: AttachmentFile[];

    created_at: string;
    updated_at: string;
  }

  interface Voucher {
    id: number;
    title: string;
    secondary_title: string;
    expired_at: string;
    avaiable_from: string;
    brand: {
      name: string;
      thumbnail: string;
    };
    banner: string;
    point: number;
    long: string;
  }

  interface VoucherHOT {
    id: number;
    title: string;
    time: string;
    img: string;
    brand: string;
    genre: string;
  }

  interface Short {
    id: number;
    title: string;
    desc: string;
    date: string;
    thumbnail: string;
    source: string;
  }

  //iwow
  interface IzuiCheckin {
    id: number;
    title: string;
    value: number;
    state: number;
  }

  interface IzuiGift {
    id: number;
    title: string;
    img: string;
    logo: string;
    time: string;
  }

  interface INewsCategory {
    path: string;
    name: string;
    routeName: string;
  }
  interface Tutorial {
    id?: number;
    name: string;
    slug: string;
    step?: number;
    category?: string;
    tab?: string;
    description?: string;
    content_step?: Step[];
    descriptionTitle?: String;
    file?: string;
    content_step_mutili?: { title: string; steps: Step[] }[];
    textEnd?:string
  }

  interface Step {
    image: string;
    title: string;
    description: string;
  }

  interface Tab {
    icon: string;
    name: string;
    data: Tutorial[];
  }

  interface Ads {
    title: string;
    image: string;
    desc: string;
    link: string;
  }

  type SimType = 'esim' | 'physic';

  // Data pack
  interface DataPack {
    id: number;
    name: string;
    price: number;
    discount_price?: number;
  }
  interface Installment {
    id: number;
    name: string;
    title: string;
    price: number;
    monthly_payment: number;
    total_payment: number;
    difference: number;
  }

  // Order
  type Order = Data.DataCheckoutResult & {
    id: number;
    code: string;
    status: 'success' | 'failed' | 'pending';
    method: string;
    created_at: string;
    payment_time: string;
    transaction_price: number;
    user_id: number | null;
  };

  interface OTP {
    id: number;
    otp: string;
    created_at: string;
    user_id: number?;
    phone: string?;
    status: 'used' | 'valid' | 'expired';
    tried: number;
  }
  interface SimMaster {
    id: number;
    phone: string;
    sale_expiry: string?;
    price: number;
    discount_price?: number;
    discount_percentage?: number;
    is_vip?: boolean;
    gift?: Gift;
    pack: PackOfData;
    tags?: SimModel.TypeOption[];
    EsimPrice?: number;
    SimPrice?: number;
    SimType?: number;
    PhoneFormated?: string;
  }
}

export declare namespace Data {
  type ProductDetail = Model.Product & {
    options: Array<Model.Option & { options: Array<Model.OptionValue> }>;
    brand: Model.Brand | null;
    variants: Array<Model.Variant>;
    optionCombinations: Array<Model.OptionCombination>;
    attributes: Array<Model.Attribute>;
    attachments: Array<Model.ProductAttachment>;
    priceRange: { min: number; max: number; discount_min: number; discount_max: number };
  };
  type Product = Model.Product & {
    variant: Model.Variant;
    priceRange: { min: number; max: number; discount_min: number; discount_max: number };
  };
  type Vouchers = { data: Model.Voucher[]; page: number };
  type VoucherDetail = Model.Voucher & {
    logo: string;
    typeName: string;
    discount: number;
    require: {
      descHTML: string;
    };
    infomationHTML: string;
    from: string;
  };
  type VouchersHOT = { data: Model.VoucherHOT[]; page: number };
  type Shorts = { data: Model.Short[]; page: number };
  type IzuiCheckinList = { data: Model.IzuiCheckin[] };
  type Tutorial = { data: Model.Tutorial[] };
  type TutorialDetail = { data: Model.Tutorial };

  export type DataRecharge = {
    type: CheckoutType.Recharge;
    data: {
      product: {
        name: string;
        image: string;
        price: number;
        desc: string;
      };
      receiver: string;
    };
  };
  export type DataBuyCode = {
    type: CheckoutType.BuyCode;
    data: {
      product: {
        name: string;
        image: string;
        price: number;
        desc: string;
      };
      code: string;
      serial: string;
    };
  };
  export type DataBuyPack = {
    type: CheckoutType.BuyData;
    data: {
      product: {
        name: string;
        image: string;
        price: number;
        desc: string;
      };
      receiver: string;
    };
  };
  export type DataBuyItemOrSim = {
    type: CheckoutType.Item;
    data: {};
  };
  export type DataInstallmentCard = {
    type: CheckoutType.Card;
    data: {
      total_amount: number;
      monthly_payment: number;
      card: string; // Mastercard, JBD, Visa,...
      bank: string; // VCB, TPBank, Techcombank,...
      installment_period: number;

      merchanise: { thumbnail: string; id: number; name: string; title: string }[];
    };
  };
  export type DataInstallmentProfile = {
    type: CheckoutType.Profile;
    data: {
      total_amount: number;
      monthly_payment: number;
      installment_period: number;

      merchanise: { thumbnail: string; id: number; name: string; title: string }[];
    };
  };
  export type DataCheckoutResult =
    | DataRecharge
    | DataBuyCode
    | DataBuyPack
    | DataBuyItemOrSim
    | DataInstallmentCard
    | DataInstallmentProfile;
}

type Id = string;
export declare namespace Cart {
  interface SimItem {
    id: Id; // Cart item id
    merchandise: {
      quantity: number;
      sim: Omit<Model.Sim, 'sale_expiry' | 'id'> & { type: Model.SimType };
      data: Model.PackOfData;
    }[];
    gift?: {
      ids: number[];
      byId: Record<number, Model.Gift>;
      selected: number[];
    };
  }

  interface ProductItem {
    id: Id;
    quantity: number;
    merchandise: {
      id: number;
      price: number;
      discountPrice?: number?;
      product: Pick<Model.Product, 'id' | 'thumbnail' | 'name'>;
      title: string;
    };
    gift?: {
      ids: number[];
      byId: Record<number, Model.Gift>;
      selected: number[];
    };
  }
}
export declare namespace Checkout {
  interface Gift {
    name: string;
    price: number;
    discount_price?: number;
    image?: string;
  }

  interface Recharge {
    type: CheckoutType.Recharge | CheckoutType.BuyCode;
    network: rechrageModel.network;
    receiver: string;
    price: number;
    discount_price?: number;
    quantity: number;
    idProduct: number;
  }

  // Require logedin
  interface DataPack {
    type: CheckoutType.BuyData;
    network?: rechrageModel.network;
    name: string;
    price: number;
    discount_price?: number;
    idProduct?: number;
    description?: string;
    phone?: string;
  }

  interface Product {
    merchandise: {
      id: number; // required
      price: number; // original price
      discount_price?: number | null; // Price after sale
      product: { id: number; name: string; thumbnail: string }; // Basic product info
      title: string; // Variant title
    };
    quantity: number;
    gift?: Checkout.Gift;
    id: Id;
  }
  interface Sim {
    merchandise: {
      sim: Omit<Model.Sim, 'sale_expiry' | 'id'> & { type: Model.SimType };
      data: { name: string; price: number; discount_price?: number };
    }[];
    gift?: Checkout.Gift;
    id: Id;
  }
  interface ProductAndSim {
    type: CheckoutType.Item;
    sims: Sim[];
    products: Array<{ dataCart: cartModel.ProductCart & { gift?: cartModel.ProductCart[] } }>;
  }

  interface InstallmentItem {
    type: CheckoutType.Profile | CheckoutType.Card;
    products: Array<installmentModel.Cart>;
  }
}
