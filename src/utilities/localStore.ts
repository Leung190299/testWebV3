export const saveLocal = (key: string, value: string | any) => {
  if (typeof window != 'undefined') {
    localStorage.setItem(key, typeof value == 'string' ? value : JSON.stringify(value));
  }
};

export const getValueLocal = <T extends unknown>(key: string): T | undefined => {
  if (typeof window != 'undefined') {
    const _data = localStorage.getItem(key);
    if (!_data) return undefined;
    const data: T = JSON.parse(_data);
    return data;
  }
  return undefined;
};
export const removeLocal = (key: string) => {
  if (typeof window != 'undefined') {
    localStorage.removeItem(key);
  }
};
