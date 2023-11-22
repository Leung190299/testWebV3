export declare namespace SimModel {
  interface info {
    v_amduong?: string;
    v_canchi?: string;
    v_nguhanh?: string;
    v_nguhanh_sinhmenh?: string;
    v_nguhanh_khacmenh?: string;
    v_diem_phongthuy?: number;
    v_menhsim?: string;
    v_sonut?: string;
    v_van_cathung?: string;
    v_kinhdich?: string;
    v_ynghia_diemphongthuy?: string;
    lunarDay?: string;
  }
  interface fongSiu {
    title?: string;
    value?: string | number;
    tooltip?: string;
    point?: number;
  }

  interface luckySim {
    Phone: string;
    ListPrice: null;
    Price: number;
    Pack: string;
    PackPrice: number;
    Months: number;
    EsimPrice: number;
    SimPrice: number;
    ShipmentFee: number;
    Status: number;
    SimType: number;
    PackCode: string;
    group_name: string;
    ThoiGianCamKet: number;
    TotalPrice: number;
  }

  type AuditDBType = {
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

  type LuckySimResponseType = AuditDBType & {
    result: luckySim;
  };

  type ParamsCategory = {
    columnFilters: {
      IsManySearchMonthly?: number;
    };
    sort: string[];
    page: number;
    pageSize: number;
  };

  type CategorySim = {
    Id: number;
    Name: string;
  };

  type CategorySimResponseType = AuditDBType & {
    result: CategorySim[];
  };

  type PackOfSim = {
    Brief: string;
    CategoryId: number;
    Id: number;
    Name: string;
    OrderNumber: number;
    Price: number;
  };

  type DataPackResponseType = AuditDBType & {
    result: PackOfSim[];
  };

  type ColumnFilters = {
    vip?: boolean;
    normal?: boolean;
    year?: number;
    price1?: number;
    simCategory?: number;
    except?: any[];
    simGroup?: number[];
    price?: number[];
    packName?: string;
    simPriceFrom?: number;
    simPriceTo?: number;
    search?: string;
  };

  type Extra = {
    price_sort?: string;
  };

  type ParamsSimSearchMaster = {
    columnFilters?: ColumnFilters;
    extra?: Extra;
    sort?: any[];
    page?: number;
    pageSize?: number;
  };

  type ParamListPack = {
    dataPerDay?: number;
    page?: number;
    pageSize?: number;
    paramSearch?: string;
    searchType?: number;
    typePrice?: number;
    type?: number;
  };

  type SimMaster = {
    Phone: string;
    ListPrice: null;
    Price: number;
    Pack: string;
    PackPrice: number;
    Months: number;
    EsimPrice: number;
    SimPrice: number;
    ShipmentFee: number;
    Status: number;
    SimType: number;
    PackCode: string;
    group_name: string;
    ThoiGianCamKet: number;
    TotalPrice: number;
    ConfigGroupId: number;
    groupId: number;
    CategoryID: Array<{ CategoryID: number; Name:string}>
    Tags: any[];
    PhoneFormated?:string
  };

  type PackFilter = {
    Id?: number;
    Code?: string;
    Name?: string;
    Price?: number;
    Cycle?: string;
    IsAddon?: null;
    Brief?: string;
    Url?: null;
    SMSSyntax?: null;
    FreeDataPerDay?: number;
    FreeDataPerMonth?: number;
    FreeInternalCall?: number;
    FreeExternalCall?: null;
    FreeInternalSMS?: null;
    FreeExternalSMS?: null;
    Description?: null;
    DesciptionDetail?: null;
    Status?: number;
  };

  type SimSearchMasterResponseType = AuditDBType & {
    result: SimMaster[];
  };

  type ListPackResponseType = AuditDBType & {
    result: PackFilter[];
  };

  type TagSearch = {
    id: number;
    name: string;
  };

  export type TypeOption = {
    id: number;
    name: string;
  };

  export type TypeOptionPack = {
    id?: string;
    name?: string;
  };
}
