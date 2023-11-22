namespace imallModel {
  interface IPramsProduct {
    columnFilters: Record<string, any>;
    sort: {
      field: string;
      type: string;
    }[];
    page: number;
    pageSize: number;
    lang: number;
  }
  interface response {
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }

  interface Product {
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

  interface filterConfig {
    id?: string;
    filter_config?: string;
    code?: string;
    isShow?: boolean;
    name?: string;
    values?: string[];
    children?: Child[];
  }
  interface Child {
    code?: string;
    isShow?: boolean;
    name?: string;
    values?: string[];
    OPPO?: string[];
    BASEUS?: string[];
  }

  interface Category {
    id?: number;
    category_name?: string;
    parent_id?: number;
    status?: number;
    group?: null;
    slug?: string;
    filter_config?: string;
    icon?: null | string;
    ref_id?: null | string;
    level?: number;
    icon2?: null | string;
    origin_type?: OriginType;
    childrent?: Category[];
  }

  interface ProductDetail {
    id?: number;
    sku?: string;
    product_name?: string;
    product_type?: number;
    status?: number;
    base_price?: number;
    images?: string;
    attributes?: string;
    meta?: string;
    variants?: string | any;
    categories?: string;
    description?: string;
    origin_type?: 'oppo' | 'baseus';
    options?: null;
    price?: number;
    discount_info?: string;
    config?: string;
    rates?: number;
    total_point?: number;
    new_gifts?: NewGift[];
    gifts?: any[];
    quantity?: number;
  }

  interface NewGift {
    content?: string;
    valid_from?: Date;
    valid_to?: Date;
  }
  interface ImageProduct {
    created_at?: Date;
    image_url?: string;
    id?: number;
    position?: number;
    product_id?: number;
    src?: string;
    updated_at?: Date;
    filename?: string;
    variant_ids?: any[];
  }

  interface Variant {
    variant_type?: string;
    variants?: VariantItem[];
    variant_name?: string;
    variant_label?: string;
  }

  interface VariantItem {
    name?: string;
    value?: string;
  }
  interface CategoryProductDetail {
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

  interface ResultSimSeach {
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
  }

  enum OriginType {
    Baseus = 'baseus',
    Oppo = 'oppo'
  }

  interface VariantBaseus {
    barcode?: string;
    compare_at_price?: number;
    created_at?: Date;
    fulfillment_service?: null;
    grams?: number;
    id?: number;
    inventory_management?: string;
    inventory_policy?: string;
    inventory_quantity?: number;
    position?: number;
    price?: number;
    product_id?: number;
    requires_shipping?: boolean;
    sku?: string;
    taxable?: boolean;
    title?: string;
    updated_at?: Date;
    image_id?: number;
    option1?: string;
    option2?: null;
    option3?: null;
    inventory_advance?: InventoryAdvance;
    webhook_tags?: null;
    base_price?: number;
    priceWoo?: number;
    wooProduct?: WooProduct;
  }

  interface InventoryAdvance {
    qty_available?: number;
    qty_onhand?: number;
    qty_commited?: number;
    qty_incoming?: number;
  }

  interface WooProduct {
    id?: number;
    name?: string;
    slug?: string;
    permalink?: string;
    date_created?: Date;
    date_created_gmt?: Date;
    date_modified?: Date;
    date_modified_gmt?: Date;
    type?: string;
    status?: string;
    featured?: boolean;
    catalog_visibility?: string;
    description?: string;
    short_description?: string;
    sku?: string;
    price?: number;
    regular_price?: string;
    sale_price?: string;
    date_on_sale_from?: null;
    date_on_sale_from_gmt?: null;
    date_on_sale_to?: null;
    date_on_sale_to_gmt?: null;
    on_sale?: boolean;
    purchasable?: boolean;
    total_sales?: number;
    virtual?: boolean;
    downloadable?: boolean;
    downloads?: any[];
    download_limit?: number;
    download_expiry?: number;
    external_url?: string;
    button_text?: string;
    tax_status?: string;
    tax_class?: string;
    manage_stock?: boolean;
    stock_quantity?: null;
    backorders?: string;
    backorders_allowed?: boolean;
    backordered?: boolean;
    low_stock_amount?: null;
    sold_individually?: boolean;
    weight?: string;
    dimensions?: Dimensions;
    shipping_required?: boolean;
    shipping_taxable?: boolean;
    shipping_class?: string;
    shipping_class_id?: number;
    reviews_allowed?: boolean;
    average_rating?: string;
    rating_count?: number;
    upsell_ids?: any[];
    cross_sell_ids?: any[];
    parent_id?: number;
    purchase_note?: string;
    categories?: Category[];
    tags?: Category[];
    images?: Image[];
    attributes?: Attribute[];
    default_attributes?: any[];
    variations?: any[];
    grouped_products?: any[];
    menu_order?: number;
    price_html?: string;
    related_ids?: number[];
    meta_data?: MetaDatum[];
    stock_status?: string;
    has_options?: boolean;
    _links?: Links;
  }

  interface Links {
    self?: Collection[];
    collection?: Collection[];
  }

  interface Collection {
    href?: string;
  }

  interface Attribute {
    id?: number;
    name?: string;
    position?: number;
    visible?: boolean;
    variation?: boolean;
    options?: string[];
  }

  interface Category {
    id?: number;
    name?: string;
    slug?: string;
  }

  interface Dimensions {
    length?: string;
    width?: string;
    height?: string;
  }

  interface Image {
    id?: number;
    date_created?: Date;
    date_created_gmt?: Date;
    date_modified?: Date;
    date_modified_gmt?: Date;
    src?: string;
    name?: string;
    alt?: string;
  }

  interface MetaDatum {
    id?: number;
    key?: string;
    value?: string;
  }
}
