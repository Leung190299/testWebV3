import API from '@/network/API';
import { SimModel } from '@/types/pick-sim';

export interface Category {
  columnFilters?: ColumnFilters;
  sort?: any[];
  page?: number;
  pageSize?: number;
  lang?: number;
}
export interface ListCategory {
  ListBlogCategories?: ListBlogCategory[];
}

export interface ListBlogCategory {
  Id?: number;
  Name?: string;
  Slug?: string;
  OrderNumber?: number;
  LayoutType?: number;
}
export interface ColumnFilters {}

export interface BlogParams {
  columnFilters?: ColumnFilterBlogs;
  sort?: any[];
  page?: number;
  pageSize?: number;
  lang?: number;
}

export interface ColumnFilterBlogs {
  BlogCategoryId?: number;
  BlogCategorySlug?:string
}

export interface ListBlog {
  MainBlog?: Blog[];
  ListFeatureBlog?: Blog[];
  ListVideoBlog?: Blog[];
  ListMagazineBlog?: Blog[];
}

export interface Blog {
  Id?: number;
  Thumbnail?: string;
  Slug?: string;
  ParentName?: ParentName;
  BlogCategorySlug?: string;
  Author?: string;
  Tagging?: Tagging;
  IsTypeVideo?: boolean | null;
  OrderNumber?: number;
  ReadTime?: number | null;
  Title?: string;
  AuthorIcon?: string;
  Brief?: string;
  VideoUrl?: string;
}

export enum BlogCategorySlug {}

export enum ParentName {}

export enum Tagging {}

const NewService = {
  getCategory: (params: Category): Promise<SimModel.AuditDBType & { result: ListCategory }> =>
    API.instance.post('getMasterData/category', params),
  getListBlog: (params: BlogParams): Promise<SimModel.AuditDBType & { result: ListBlog }> =>
    API.instance.post('getMasterData/listBlog', params),
  getBlockBlog: (params: BlogParams): Promise<SimModel.AuditDBType & { result: {BlockBlog:Blog[]} }> =>
    API.instance.post('getMasterData/blockBlog', params),
  getDetail: (params: newModal.BlogParams): Promise<newModal.response & {
    result:newModal.DetailResult
  }>=>API.instance.post('getMasterData/BlogDetail',params)
};
export default NewService;
