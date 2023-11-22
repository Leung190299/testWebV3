const TABLET_SIZE = 768;
const DESKTOP_SIZE = 1200;

export function withMobile<T = Element>(fn: React.MouseEventHandler<T>) {
  return (e: React.MouseEvent<T, MouseEvent>) => {
    if (innerWidth >= TABLET_SIZE) return;
    e.preventDefault();
    return fn(e);
  };
}
export function withTablet<T = Element, A extends AnyVoidFunction = () => void>(fn: React.MouseEventHandler<T>, other?: A) {
  return (e: React.MouseEvent<T, MouseEvent>) => {
    if (innerWidth >= DESKTOP_SIZE) return other?.(e);
    e.preventDefault();
    return fn(e);
  };
}
export function withoutMobile<T extends AnyVoidFunction, A extends AnyVoidFunction = () => void>(fn: T, other?: A) {
  return (...args: any) => {
    if (innerWidth >= TABLET_SIZE) return fn(...args);
    return other?.(...args);
  };
}
