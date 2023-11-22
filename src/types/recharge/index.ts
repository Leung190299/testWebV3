export declare namespace rechrageModel {
  interface payment {
    Phone?: string; // "0877345181",
    Email?: string; // "",
    PaymentChannel: string; // "VIETQR",
    ProductId: string | number;
    Quantity: number; // 11,
    Source: string; // "itel.vn"
  }
  interface network {
    Id?: number;
    Name?: string;
    Path?: string;
  }
  interface topup {
    Id: number; // 41,
    Type: number; // 1,
    NetworkId: number | string; // "1",
    Value: number; // 10000,
    Price: number; // 10000,
    Discount: number; // 0,
    IsActive: boolean; // true
  }

  interface resultPayment {
    orderId?: string;
    paymentUrl?: string;
    bankId?: null;
    bankName?: null;
    bankAccountName?: null;
    bankAccountNo?: null;
    amount?: null;
    info?: null;
    qrUrl?: null;
  }

  interface paymentInfo {
    Id?: string;
    TotalPrice?: number;
    OrderType?: string;
    CreateDate?: string;
    ContactPhone?: string;
    Email?: string;
    FullName?: null;
    Address?: null;
    PaymentChannel?: string;
    PaymentCode?: null;
    PartnerOrderId?: null;
    Status?: number;
    SupplierCode?: string;
    SupplierName?: null;
    OrderTypeName?: string;
    StatusName?: string;
    Details?: Detail[];
  }
  interface Detail {
    Id?: number;
    OrderId?: string;
    ProductId?: string;
    ProductType?: number;
    Price?: number;
    OriginPrice?: number;
    Quantity?: number;
    Variant?: null;
    Image?: null;
    Data?: string;
    LastModified?: Date;
    NetworkName?: string;
    C2?: null;
    C3?: null;
    C4?: null;
    C5?: null;
    NetworkId?: number;
    N2?: null;
    N3?: null;
    N4?: null;
    N5?: null;
    ProductCode?: string;
    ProductName?: string;
  }
  interface ParamSurveyCes {
    phone?: string;
    sourceType?: string;
    productType?: string;
    orderId?: string;
    score?: number;
    content?: string;
  }
  interface ResponeSurveyCes {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: number;
    extra?: null;
  }
}
