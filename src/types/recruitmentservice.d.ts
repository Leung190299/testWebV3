namespace recruitmentModal {
  interface ListJob {
    Recruitment?: Recruitment[];
  }

  interface response {
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }

  interface Recruitment {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    Author?: Author;
    OrderNumber?: number;
    Title?: string;
    Tagging?: Tagging;
    Brief?: string;
    AuthorIcon?: string;
  }

  enum Author {
    Itel = 'ITEL',
    MạngDiĐộngITel = 'Mạng di động iTel'
  }

  enum Tagging {
    Empty = '',
    TuyểnDụng = 'tuyển dụng',
    TuyểnDụngITEL = 'Tuyển dụng ITEL'
  }

  interface ListJobParams {
    columnFilters?: {};
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface DetailItem {
    RecruitmentDetail?: RecruitmentDetail;
    ListRecruitmentItemRelated?: ListRecruitmentItemR[];
    ListRecruitmentItemRandom?: ListRecruitmentItemR[];
  }

  interface ListRecruitmentItemR {
    Id?: number;
    Thumbnail?: string;
    Slug?: string;
    Author?: Author;
    Tagging?: Tagging;
    OrderNumber?: number;
    ReadTime?: number;
    Title?: string;
    Brief?: string;
    AuthorIcon?: string;
  }

  interface RecruitmentDetail {
    Id?: number;
    Author?: Author;
    Thumbnail?: string;
    DetailImage?: null;
    Slug?: string;
    Brief?: string;
    Detail?: string;
    BannerImage?: string;
    Tagging?: Tagging;
    CreatedOn?: Date;
    OrderNumber?: number;
    ReadTime?: number;
    Title?: string;
    AuthorIcon?: string;
    SeoDetails?: string;
    SeoKeyword?: string;
    SeoThumbnail?: null;
    SeoTitle?: string;
    days?: number;
    month_?: string;
  }

  interface JobDetailParams {
    columnFilters?: { Slug?: string };
    sort?: any[];
    page?: number;
    pageSize?: number;
    lang?: number;
  }

  interface CVParams {
    FullName?: string;
    Phone?: string;
    Email?: string;
    Vacancy?: string;
    CV?: string; //CV dạng chuỗi Base64
    CV_Url?: string;
    extension?: string; //định dạng của file CV
  }
}
