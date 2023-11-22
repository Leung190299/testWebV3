

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

  export interface DataPageDetail{
	columnFilters: any;
	sort: any[];
	page: number;
	pageSize: number;
	lang: number;
  }
