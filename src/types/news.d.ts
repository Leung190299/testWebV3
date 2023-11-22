namespace newModal {
  interface Category {
    columnFilters?: ColumnFilterBlogs;
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }
  interface ListCategory {
    ListBlogCategories?: ListBlogCategory[];
  }

  interface response {
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }

  interface ListBlogCategory {
    Id?: number;
    Name?: string;
    Slug?: string;
    OrderNumber?: number;
    LayoutType?: number;
  }
  interface ColumnFilters {}

  interface BlogParams {
    columnFilters?: Record<ColumnFilterBlog, string>;
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface ColumnFilterBlogs {
    BlogCategoryId?: number;
  }

  interface ListBlog {
    MainBlog?: Blog[];
    ListFeatureBlog?: Blog[];
    ListVideoBlog?: Blog[];
    ListMagazineBlog?: Blog[];
  }

  interface Blog {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    ParentName?: ParentName;
    BlogCategorySlug?: BlogCategorySlug;
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
  interface BlogDetail {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    ParentName?: string;
    BlogCategorySlug?: string;
    Author?: string;
    IsTypeVideo?: null;
    OrderNumber?: number;
    ReadTime?: number;
    Title?: string;
    Tagging?: string;
    Brief?: string;
    Detail?: string;
    BannerImage?: string;
    CreatedOn?: string;
    SeoDetails?: string;
    SeoKeyword?: string;
    SeoThumbnail?: string;
    SeoTitle?: string;
    SeoShema?: null;
    Canonical?: null;
    DetailImage?: string;
    days?: number;
    month_?: string;
    VideoUrl?: string;
    AuthorIcon?: string;
    BlogLoyaltyCategorySlug?: string
  }
  interface DetailResult {
    BlogDetail?: BlogDetail[];
    ListBlogItemRelated?: Blog[];
    ListBlogItemRandom?: Blog[];
  }

  enum BlogCategorySlug {}

  enum ParentName {}

  enum Tagging {}
  type ColumnFilterBlog = 'Slug';
}
