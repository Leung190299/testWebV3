namespace dataModel {
  interface Response<T> {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: T;
    extra?: null;
  }
  interface ParamPack {
    dataPerDay?: number;
    page?: number;
    pageSize?: number;
    paramSearch?: string;
    searchType?: number;
    typePrice?: number;
    type?: number;
    orderType?: number;
  }
  interface Pack {
    Id?: number;
    Code?: string;
    Name?: string;
    Price?: number;
    Cycle?: 'M'|'D';
    IsAddon?: null;
    Brief?: string;
    Url?: string?;
    SMSSyntax?: string?;
    FreeDataPerDay?: number;
    FreeDataPerMonth?: number;
    FreeInternalCall?: number?;
    FreeExternalCall?: number?;
    FreeInternalSMS?: number?;
    FreeExternalSMS?: number?;
    Description?: string?;
    DesciptionDetail?: string?;
    Status?: number;
  }
  interface resultPack {
    serviceCode?: string;
    timeStart?: string;
    timeEnd?: string;
    dataMain?: string;
    dataSub?: string;
    dataKm?: string;
    dataInZone?: string;
    dataOutZone?: string;
    voiceOnNet?: string;
    voiceOutNet?: string;
    smsOnNet?: string;
    smsOutNet?: string;
    voiceNational?: string;
    smsContent?: null;
    packageName?: string;
    price?: number;
  }
  interface paramCheckPack {
    phone: string;
    pack: string;
  }
  interface paramRegister {
    phone: string;
    pack: string;
    otp: string;
  }
  interface paramSuggestion {
    dataFrom: number;
    dataTo: number;
    minuteFrom: number;
    priceFrom: number;
    priceTo: number;
  }
}
