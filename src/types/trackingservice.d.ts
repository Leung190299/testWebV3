namespace trackingModal {
  interface Response {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: Result;
    extra?: null;
  }

  interface Result {
    shipment?: Shipment[];
    OrderId?: string;
    ContactPhone?: string;
    Addr?: string;
    FullName?: string;
    hassim?: number;
    IsFast?: number;
    shipmentInfo?: ShipmentInfo;
    device?: null;
    GHTK_Id?: null;
    deviceBa?: null;
  }

  interface Shipment {
    status?: string;
    date_?: string;
    city_id?: string;
    service_id?: string;
  }

  interface ShipmentInfo {
    success?: boolean;
    message?: string;
    order?: Order;
    order_id?: string;
    status?: string;
    shared_link?: string;
    warning_message?: string;
  }

  interface Order {
    partner_id?: string;
    label?: string;
    area?: number;
    fee?: number;
    insurance_fee?: number;
    estimated_pick_time?: string;
    estimated_deliver_time?: string;
    products?: any[];
    status_id?: number;
    tracking_id?: number;
    sorting_code?: string;
    date_to_delay_pick?: Date;
    pick_work_shift?: number;
    date_to_delay_deliver?: Date;
    deliver_work_shift?: number;
    is_xfast?: number;
  }
}
