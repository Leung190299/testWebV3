type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (...a: infer X) => void ? X : never;
type GrowToSize<T, A extends Array<T>, N extends number> = { 0: A; 1: GrowToSize<T, Grow<T, A>, N> }[A['length'] extends N ? 0 : 1];

type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

type AnyVoidFunction = (...args: any[]) => void;

// type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
type DiffObj<T, K> = Omit<T, keyof K>;
