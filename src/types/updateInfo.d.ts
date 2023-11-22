namespace UpdateInfoModel {
  interface responseResult<T> {
    result: T;
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }
  interface ParamsLitSim {
    search?: string;
    page?: number;
    pageSize?: number;
    ContactPhone?: string;
  }
  interface ParamCheckOTP {
    ContactPhone: string;
    OTP: string;
  }
 interface resultSim {
    Stock?:        string;
    Phone?:        string;
    MSIN?:         string;
    ESIM?:         string;
    Price?:        number;
    PackPrice?:    number;
    Months?:       number;
    EsimPrice?:    string;
    SimPrice?:     number;
    SimType?:      string;
    Pack?:         string;
    PackCode?:     string;
    Status?:       number;
    ModifiedDate?: string;
}

}
