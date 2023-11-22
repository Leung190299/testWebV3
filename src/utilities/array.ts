type ItemComparer<T> = (a: T, b: T) => boolean;

export function areArraysEqual<T>(array1: T[], array2: T[], itemComparer: ItemComparer<T> = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
export function chunkArray<T>(arr: T[], n: number) {
  var chunkLength = Math.max(arr.length / n, 1);
  var chunks = [];
  for (var i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
}

// export function moveToRight<T = unknown>(array: T[], offset: number) {
//   return [...array.slice()];
// }
export function moveToLeft<T = unknown>(array: T[], offset: number) {
  return [...array.slice(offset), ...array.slice(0, offset)];
}

export function cloneToArray<T = unknown>(obj: T, num: number) {
  return Array.from({ length: num }, (_, index) => ({ ...obj, id: index }));
}

export function groupBy<T = unknown>(collection: T[], iteratee: keyof T) {
  return collection.reduce(function (rv, x) {
    (rv[x[iteratee] as any] ||= []).push(x);
    return rv;
  }, {} as Record<string, T[]>);
}
