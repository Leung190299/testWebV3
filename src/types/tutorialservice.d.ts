namespace tutorialModal {
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
	interface listTutorial {
	  Id?: number;
	  Question?: string;
	  Slug?: string;
	  OrderNumber?: number;
	  FaqCategoryId?: number;
	  Answer?: string;
	}
	interface listCategory {
	  id?: number;
	  text?: string;
	}
  }