export interface MasterDataHomeParams {
  columnFilters: any;
  sort: any;
  page: number;
  pageSize: number;
  lang: number;
}
export interface Product {
  id?: number;
  sku?: string;
  product_name?: string;
  product_type?: number;
  status?: number;
  base_price?: number;
  images?: string;
  attributes?: string;
  meta?: string;
  variants?: string;
  categories?: string;
  price?: number;
  priceWoo?: null;
  discount_info?: string;
  config?: string;
  rates?: number;
  origin_type?: string;
  total_point?: number;
}

export interface ISlider {
  left: { title: string; desc: string; action_title: string; href: string };
  right: {
    title: string;
    desc: string;
    subtitle: string;
    action_title: string;
    href: string;
    items?: { icon: string; title: string; desc: string }[];
  };
  images: { src: string; multiple?: number; type?: 'backdrop' }[];
}

export interface SimStore {
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
  group_name?: string;
  ThoiGianCamKet?: number;
  TotalPrice?: number;
  ConfigGroupId?: number;
  Tags?: any[];
}

export type AuditDBType = {
  code: number;
  message: string;
  request_id: string;
  totalRecords: number;
  extra: any;
};

type ParamsAudiDB = {
  columnFilters: {};
  sort: string[];
  page: number;
  pageSize: number;
};

export type ProductResponseType = AuditDBType & {
  result: Product[];
};

export type PageStaticResponseType = AuditDBType & {
  result?: any;
};

export interface searchResult {
  AboutItel?: any[];
  ForInvestors?: any[];
  CampaignMenus?: any[];
  Categories?: any[];
  Products?: any[];
  DataPackages?: any[];
  Questions?: any[];
  News?: any[];
  Campaigns?: any[];
  StaticPages?: any[];
  Recruitment?: any[];
  BlogLoyaltys?: any[];
  Condition?: any[];
  Vouchers?: any[];
}
