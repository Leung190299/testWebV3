namespace loginModel {
  interface response {
    code: number;
    message: string;
    request_id: string;
    totalRecords: number;
    extra: any;
  }
  interface paramsOTP {
    username: string;
    password: string;
  }
  interface OTPLogin {
    token:string;
    msisdn: string;
  }
  interface dataType{
    phone: string;
    type:LoginUserStatus
  }
}
