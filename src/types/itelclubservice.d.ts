namespace itelClubModel {
  type status = 'GET' | 'CHANGE'|'RECEIVED'

  interface Info {
    status?: number;
    error?: string;
    data?: DataInfo;
  }

  interface responseResult<T> {
    result: T;
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }
  interface response {
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }

  interface DataInfo {
    clientId?: number;
    fullName?: string;
    rankId?: number;
    rankName?: string;
    currentPoint?: number;
    totalPointCycle?: number;
    pointUpRank?: number;
  }

  interface UboxUser {
    status?: number;
    error?: string;
    data?: Ubox;
  }

  interface Ubox {
    content?: Content[];
    totalElements?: number;
    totalPages?: number;
    numberOfElemetns?: number;
    number?: number;
    size?: number;
  }

  interface Content {
    id?: string;
    brand?: string;
    brand_id?: string;
    cat_id?: string;
    cat_title?: string;
    gift_id?: string;
    title?: string;
    type?: string;
    price?: string;
    view?: string;
    quantity?: string;
    stock?: number;
    image?: string;
    images?: Images;
    images_rectangle?: Images;
    expire_duration?: string;
    code_display?: string;
    code_display_type?: number;
    brandLogoLoyalty?: string;
    brandImage?: string;
    brand_name?: string;
    parent_cat_id?: string;
    usage_check?: number;
    code_quantity?: string;
    transaction_id?: number;
    voucher_code?: null | string;
    expired_date?: string;
    image_code?: string;
    giftGiveStatus?: string;
  }

  interface Images {
    '0'?: string;
    '80'?: string;
    '160'?: string;
    '320'?: string;
    '640'?: string;
    square?: string;
  }
  interface BannerRes {
    BannerButton?: Banner;
    BannerMain?: Banner;
    BannerPromotion?: Banner;
    PromotionForYou?: string;
    RecievedPromotion?: string;
    VipVoucher?: string;
  }

  interface Banner {
    Id?: number;
    Thumbnail?: string;
    ThumbnailMobile?: string;
    Url?: string;
    ClubType?: number;
  }
  interface Category {
    id?: string;
    name?: string;
  }
  interface City {
    id?: number;
    value?: number;
    text?: string;
  }
  interface VoucherData<T> {
    status?: number;
    error?: string;
    data?: T;
  }

  interface VoucherResult {
    content?: Voucher[];
    totalElements?: number;
    totalPages?: number;
    numberOfElemetns?: number;
    number?: number;
    size?: number;
  }

  interface Voucher {
    id?: string;
    brand?: string;
    brand_id?: string;
    cat_id?: string;
    cat_title?: string;
    gift_id?: string;
    title?: string;
    type?: string;
    price?: string;
    view?: string;
    quantity?: string;
    stock?: number;
    image?: string;
    images?: Images;
    images_rectangle?: Images;
    expire_duration?: string;
    code_display?: string;
    code_display_type?: number;
    brandLogoLoyalty?: string;
    brandImage?: string;
    brand_name?: string;
    parent_cat_id?: string;
    usage_check?: number;
    code_quantity?: string;
    voucher_id?: number;
    point?: number;
    voucher_type?: string;
  }

  interface CategoryNews {
    Id?: number;
    Name?: string;
    Slug?: string;
    IsActive?: boolean;
  }
  interface BlogLoyalty {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    ParentName?: string;
    BlogLoyaltyCategorySlug?: string;
    Author?: string;
    OrderNumber?: number;
    ReadTime?: number;
    Title?: string;
    Brief?: string;
    AuthorIcon?: string;
  }
  interface Params {
    columnFilters?: {};
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface BlogLoyaltyParams {
    columnFilters?: { categoryId?: number };
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface paramFilter {
    categoryId?: string | number;
    cityId?: number?;
    pointId?: number?;
    rankId?: number;
    voucherId?: number |string;
    title?: string;
  }
  interface BlogLoyaltyBySlugParams {
    columnFilters?: { Slug?: string };
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface BlogLoyaltyBySlug {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    ParentName?: string;
    BlogLoyaltyCategorySlug?: string;
    Author?: string;
    OrderNumber?: number;
    ReadTime?: number;
    Title?: string;
    Brief?: string;
    AuthorIcon?: string;
    Detail?: string;
    BannerImage?: string;
    CreatedOn?: Date;
    SeoShema?: null;
    SeoDetails?: string;
    SeoKeyword?: string;
    Canonical?: null;
    SeoThumbnail?: string;
    DetailImage?: string;
    days?: number;
    month_?: string;
  }
  interface VoucherRes {
    status?: number;
    error?: string;
    data?: DetailVoucher;
  }

  interface DetailVoucher {
    id?: string;
    brand?: string;
    brand_id?: string;
    code_display?: string;
    code_display_type?: number;
    cat_id?: string;
    gift_id?: string;
    title?: string;
    type?: string;
    price?: string;
    justGetOrder?: string;
    view?: string;
    quantity?: string;
    usage_check?: number;
    image?: string;
    images?: Images;
    images_rectangle?: Images;
    expire_duration?: string;
    parent_cat_id?: string;
    brand_online?: string;
    brandImage?: string;
    content?: string;
    note?: string;
    office?: { [key: string]: null | string }[];
    voucher_id?: number;
    point?: number;
    voucher_type?: string;
  }

  interface voucherClient {
    transactionId?: number;
    code?: string;
    expiredDate?: string;
    codeImage?: string;
  }
  interface payloadVoucher {
    voucherId?: string;
  }


}
