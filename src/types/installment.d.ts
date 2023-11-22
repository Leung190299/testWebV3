namespace installmentModel {
  interface responseResult<T> {
    code: number;
    extra: null;
    message: string;
    request_id: string;
    result: T;
    totalRecords: number;
  }
  interface Bank {
    issuerCode?: string;
    logoUrl?: string;
    schemes?: Scheme[];
  }

  interface Scheme {
    scheme?: string;
    logoUrl?: string;
    recurringInfo?: RecurringInfo[];
  }

  interface RecurringInfo {
    recurringNumberOfIsp?: number;
    recurringFrequency?: string;
    amount?: number;
    recurringAmount?: number;
    totalIspAmount?: number;
    feeAmount?: number;
    currCode?: string;
  }

  interface paramInfo {
    Phone?: string;
    TotalPrice?: number;
    ShipmentFee?: number;
    vnp_Bill_Mobile?: string;
    fullName?: string;
    cart_info?: CartInfo;
    cart?: Cart[];
    transactionType?: string;
    ispInfo?: ISPInfo;
  }

  interface Cart {
    id?: number;
    sku?: string;
    product_name?: string;
    product_type?: number;
    status?: number;
    base_price?: number;
    images?: Image[];
    attributes?: Attributes;
    meta?: Meta;
    variants?: any | string;
    categories?: Category[];
    description?: string;
    origin_type?: string;
    options?: null;
    price?: number;
    discount_info?: string;
    config?: Config[];
    rates?: number;
    total_point?: number;
    new_gifts?: NewGift[];
    gifts?: Gift[];
    image_url?: string;
    with_sim?: number;
    uuid?: string;
    amount?: number;
    Phone?: string;
    ListPrice?: null;
    Price?: number;
    Pack?: string;
    PackPrice?: number;
    Months?: number;
    EsimPrice?: number;
    SimPrice?: number;
    ShipmentFee?: number;
    Status?: number;
    SimType?: number;
    PackCode?: string;
    ModifiedDate?: null;
    group_name?: string;
    ThoiGianCamKet?: number;
    TotalPrice?: number;
    quantity?: number;
  }

  interface Attributes {
    color?: string;
    size?: string;
    weight?: string;
    display?: string;
    screen_type?: string;
    resolution?: string;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    rom?: string;
    pin?: string;
    charge?: string;
    front_camera?: string;
    back_camera?: string;
    flash?: string;
    sim?: string;
    gps?: string;
    bluetooth?: string;
    fm?: string;
    headphone?: string;
  }

  interface Category {
    id?: number;
    category_name?: string;
    parent_id?: number;
    status?: number;
    group?: null;
    slug?: string;
    filter_config?: string;
    icon?: string;
    ref_id?: null;
    level?: number;
    icon2?: null;
    origin_type?: string;
  }

  interface Config {
    code?: string;
    name?: string;
    type?: Type;
    order?: string;
    on_top?: string;
    short_name?: string;
  }

  enum Type {
    Text = 'text'
  }

  interface Image {
    image_name?: string;
    image_size?: number;
    image_type?: string;
    image?: null;
    image_url?: string;
    src?:string
  }

  interface Meta {
    slug?: string;
    supplier?: string;
  }

  interface CartInfo {
    shipment_type?: string;
    data_hasSIM?: boolean;
    ghtk_fee?: number;
    _track?: string;
    fullName?: string;
    identityCode?: string;
    ContactPhone?: string;
    email?: string;
    addr?: string;
    CityId?: number;
    DistrictId?: number;
    WardId?: number;
    HamletId?: number;
    IsSimData?: number;
    IsFast?: number;
  }

  interface ISPInfo {
    issuerCode?: string;
    scheme?: string;
    recurringNumberOfIsp?: number;
    recurringFrequency?: string;
    amount?: number;
    recurringAmount?: number;
    totalIspAmount?: number;
    feeAmount?: number;
    currCode?: string;
  }
}
