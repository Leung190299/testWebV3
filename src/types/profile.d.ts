import { profile } from 'console';

namespace profileModel {
  interface responseResult<T> {
    code: number;
    extra: null;
    message: string;
    request_id: string;
    result: T;
    totalRecords: number;
  }
  interface Profile {
    FULLNAME?: string;
    BIRTHDAY?: string;
    GENDER?: string;
    BALANCE?: number;
    TKKM?: number;
    PACK?: any[];
    ACTIVEDATE?: string;
    phone?: string;
  }
}
