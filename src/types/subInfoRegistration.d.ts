namespace subInfoRegistrationModal {
  interface Response {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: Result;
    extra?: null;
  }

  interface Result {
    updateBy?: string;
  }

  interface ResponeOTP {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: null;
    extra?: null;
  }
  interface ResponseSubInfo {
    code?:         number;
    message?:      string;
    request_id?:   string;
    totalRecords?: number;
    result?:       ResultSubInfo;
    extra?:        null;
}

  interface ResultSubInfo {
    phone?:        string;
    result?:       string;
    seri?:         string;
    code?:         string;
    img4_id?:      string;
    isRegistered?: boolean;
    seriValid?:    boolean;
    success?:      boolean;
    img4?:         string;
}
}
