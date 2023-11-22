import { isObject } from './validator';

type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;
type FlatType<T> = T extends any[] ? GetElementType<T> : T;

export function pick<D extends {}, K extends keyof D>(obj: D, keys: K | K[]): Pick<D, K> {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {} as any;
  }

  var res: any = {};
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys];
    }
    return res;
  }

  var len = (keys as any).length;
  var idx = -1;

  while (++idx < len) {
    var key: string = (keys as any)[idx];
    if (key in obj) {
      res[key] = (obj as any)[key];
    }
  }
  return res;
}

/**
 * @return {boolean}
 */
export function omit<T extends {}, K extends keyof T>(obj: T, props: K[]): Omit<T, K> {
  if (!isObject(obj)) return {} as any;

  var keys = Object.keys(obj) as (keyof T)[];
  var res = {} as any;

  for (var i = 0; i < keys.length; i++) {
    var key: any = keys[i];
    var val: any = (obj as any)[key];

    if (!props! || props.indexOf(key) === -1) {
      res[key] = val;
    }
  }
  return res;
}

export function omitFieldByValue<T extends Record<string, unknown>, K extends unknown>(obj: T, props: K[]) {
  var keys = Object.keys(obj) as (keyof T)[];
  const res = {} as any;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];
    if (!props.includes(val as any)) {
      res[key] = val;
    }
  }
  return res;
}
export function parseFormDataToObject<T>(formData: FormData) {
  const obj = {} as T;
  for (const rootKey of Array.from(formData.keys())) {
    const keys = rootKey.split(/[\[(\]\[)\]]+/).filter((k: string) => k !== '');
    const value = formData.get(rootKey);
    bindValueToObject(obj, keys, value);
  }
  return obj;
}
export function bindValueToObject(ref: any, [key, ...keys]: string[], value: any): any {
  if (!ref[key] && keys.length) {
    if (isNaN(Number(keys[0]))) ref[key] = {};
    else ref[key] = [];
  }
  if (isNaN(Number(key))) {
    if (keys.length) {
      bindValueToObject(ref[key], keys, value);
    } else return (ref[key] = value);
  } else {
    // key is number
    if (keys.length) {
      if (ref) bindValueToObject(ref[key], keys, value);
      else {
        ref = [];
        bindValueToObject(ref[key], keys, value);
      }
    } else {
      return (ref[key] = value);
    }
  }
}

export function arrayToKeyValue<T extends {}, K extends keyof T>(obj: T[], key: K) {
  return obj.reduce((obj, value) => {
    obj[value[key] as any] = value;
    return obj;
  }, {} as Record<string, T>);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: Record<string, any>, ...sources: Record<string, any>[]): Record<string, any> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
