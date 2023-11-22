export const isString = (val: any): val is string => typeof val === 'string';
export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';
export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;
export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object';
export const isNumber = (v: any): v is Number => typeof v === 'number' && !isNaN(v);

export const isPlainObject = (fn: any): fn is object => {
  if (!isObject(fn)) {
    return false;
  }
  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  );
};

export const validatePhone = (phone: string) => {
  var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return regex.test(phone);
};
export const validateEmail = (email: string) => {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const compareDate = (date1: string, date2: string) => {
  let _date1:string[] = date1.split('/');
  let _date2 = date2.split('/');
  let d1 = new Date(Number(_date1[2]), Number(_date1[1])-1, Number(_date1[0])).getTime();
  let d2 = new Date(Number(_date2[2]), Number(_date2[1])-1, Number(_date2[0])).getTime();
  if (d1 < d2) return true;
  return false
  }
//
export const phoneNumberRegex = /^(?:\+?84|0)(?:\d){9,10}$/;
export const phoneItel = /(8487|087)+([0-9]{7})\b/;
export const phoneOrEmailRegex = /^(?:\+?84|0)(?:\d){9,10}|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/;
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
