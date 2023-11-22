namespace digitalservice {
  interface params {
    columnFilters: any;
    sort: any;
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
  interface post {
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
    VideoUrl?: string;
    AuthorIcon?: string;
  }
  interface itemService {
    id: number;
    img: string;
    title: string;
    description?: string;
    onClick: () => Promise<boolean> | void;
    subDescription?: string;
    linkApi?: string;
    link?: string;
    label?: string;
  }
}
