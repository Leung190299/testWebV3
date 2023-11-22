export interface IPramsProduct {
  columnFilters: Partial<{ Slug: string }>;
  sort: {
    field: string;
    type: string;
  }[];
  page: number;
  pageSize: number;
  lang: number;
}
