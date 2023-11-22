namespace activeModal {
  interface Response {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: Result;
    extra?: null;
  }

  interface Result {
    phones?: Phone[];
  }

  interface Phone {
    phone?: string;
    seri?: string;
    seriValid?: boolean;
    result?: string;
  }
  interface ParamsActive {
    phone?: string;
    seri?: string;
  }
  interface ParamsEKYC {
    format_type?: string;
    get_thumb?: string;
  }
  interface ParamsFace {
    format_type?: string;
    type1?: string;
  }
  interface PayloadEKYC {
    img1?: string;
    img2?: string;
  }

  interface ResponseEKYC {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: resultEYKC;
    extra?: null;
  }

  interface resultEYKC {
    data?: Datum[];
    errorCode?: string;
    errorMessage?: string;
    context?: Context;
  }

  interface Context {
    message?: string;
    object?: Object;
    fileId?: string;
    success?: boolean;
  }

  interface Object {
    fileName?: string;
    tokenId?: string;
    description?: string;
    storageType?: string;
    title?: string;
    uploadedDate?: string;
    hash?: string;
    fileType?: string;
  }

  interface Datum {
    info?: Info;
    invalidCode?: string;
    invalidMessage?: string;
    type?: string;
    valid?: string;
  }

  interface Info {
    checksum_final?: string;
    checksum_final_validate?: string;
    country?: string;
    dob?: string;
    dob_checksum?: string;
    dob_checksum_validate?: string;
    document_number?: string;
    document_number_checksum?: string;
    document_number_checksum_validate?: string;
    due_date?: string;
    due_date_checksum?: string;
    due_date_checksum_validate?: string;
    gender?: string;
    given_name?: string;
    identification_sign?: string;
    identification_sign_box?: number[];
    identification_sign_confidence?: number;
    image?: string;
    issue_date?: string;
    issue_date_box?: number[];
    issue_date_confidence?: number;
    issued_at?: string;
    issued_at_box?: any[];
    issued_at_confidence?: number;
    mrz_confidence?: number;
    nationality?: string;
    person_number?: string;
    sur_name?: string;
    address?: string;
    address_box?: number[];
    address_confidence?: number;
    address_district?: string;
    address_district_code?: string;
    address_town?: string;
    address_town_code?: string;
    address_ward?: string;
    address_ward_code?: string;
    dob_box?: number[];
    dob_confidence?: number;
    due_date_box?: number[];
    due_date_confidence?: number;
    gender_box?: number[];
    gender_confidence?: number;
    hometown?: string;
    hometown_box?: number[];
    hometown_confidence?: number;
    hometown_district?: string;
    hometown_district_code?: string;
    hometown_town?: string;
    hometown_town_code?: string;
    hometown_ward?: string;
    hometown_ward_code?: string;
    id?: string;
    id_box?: number[];
    id_confidence?: number;
    name?: string;
    name_box?: number[];
    name_confidence?: number;
    nationality_box?: number[];
    nationality_confidence?: number;
  }

  interface ParamsIssued {
    type?: string;
    placeName?: string;
  }
  interface ResponseIssued {
    code?: string;
    message?: null;
    status?: string;
    timestamp?: Date;
    elapsedTimeMs?: number;
    total?: null;
    data?: Data;
  }

  interface Data {
    onSelect?: OnSelect;
    boxes?: OnSelect[];
  }

  interface OnSelect {
    issuedPlaceId?: number;
    issuedPlaceCode?: string;
    issuedPlaceName?: string;
    prefixNumber?: null;
    idLength?: number;
  }
  interface ResponseFace {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: ResultFace;
    extra?: null;
  }

  interface ResultFace {
    data?: DataFace;
    errorCode?: string;
    errorMessage?: string;
  }

  interface DataFace {
    face1?: string;
    face1_score?: string;
    face2?: string;
    face2_score?: string;
    invalidCode?: number;
    invalidMessage?: string;
    match?: string;
    matching?: string;
  }
  interface ParamsForm {
    subscribers?: Subscriber[];
    psHoten?: string;
    psCmnd?: string;
    psNgaysinh?: string;
    psQuoctich?: string;
    psnoicap?: string;
    psdiachi?: string;
    psGioiTinh?: string;
    ploaigt?: string;
    psplacedate?: string;
    img1?: string;
    img2?: string;
    img3?: string;
    signatureImage?: string;
    psContactPhone?: string;
  }

  interface Subscriber {
    phone?: string;
    seri?: string;
    seriValid?: boolean;
    checked?: boolean;
    serial?: string;
  }

  interface ResponseForm {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: Result;
    extra?: null;
  }

  interface Result {
    img4?: string;
  }

  interface ResponseSub {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: ResultSub;
    extra?: null;
  }

  export interface ResultSub {
    phone?: string;
    result?: string;
    seri?: string;
    code?: string;
    img4_id?: string;
    isRegistered?: boolean;
    seriValid?: boolean;
    success?: boolean;
    img4?: string;
  }
}
