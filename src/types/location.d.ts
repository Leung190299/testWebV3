export namespace Location {
  interface Response<T> {
    exitcode: number;
    data: {
      nItems: number;
      nPages: number;
      data: T[];
    };
  }
  interface BaseLocation {
    _id: string;
    name: string;
    type: string;
    slug: string;
    name_with_type: string;
    code: string;
    isDeleted: boolean;
  }
  interface Province extends BaseLocation {}

  interface District extends BaseLocation {
    path: string;
    path_with_type: string;
    parent_code: string;
  }
  interface Ward extends BaseLocation {
    path: string;
    path_with_type: string;
    parent_code: string;
  }
  // not existed
  interface Village extends BaseLocation {}

  // Store location
  interface Store {
    id: string|number;
    name: string;
    address: string;
  }
}
