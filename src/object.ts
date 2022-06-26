import { TOptional } from './helper';
import Template, { toPartial } from './template';

type ModelType<TT> = TT extends Template<infer M, any> ? M : never;
type TransitType<TT> = TT extends Template<any, infer T> ? T : never;

export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type SeperateRequiredAndOptionalTypes<O> = {
  [K in RequiredKeys<O>]: O[K];
} &
  {
    [K in OptionalKeys<O>]?: O[K];
  };

type UnwrapModelTypes<TT extends { [key: string]: Template<any, any> }> = SeperateRequiredAndOptionalTypes<
  {
    [K in keyof TT]: ModelType<TT[K]>;
  }
>;
type UnwrapTransitTypes<TT extends { [key: string]: Template<any, any> }> = SeperateRequiredAndOptionalTypes<
  {
    [K in keyof TT]: TransitType<TT[K]>;
  }
>;

function mapObject<T>(object: T, func: (key: string) => any) {
  return Object.keys(object).reduce(
    (o, key) => ({
      ...o,
      [key]: func(key),
    }),
    {},
  );
}

export default function TObject<
  TT extends { [key: string]: Template<any, any> },
  M extends UnwrapModelTypes<TT>,
  T extends UnwrapTransitTypes<TT>
>(template: TT): Template<M, T> {
  return {
    valid: (o: any): o is T =>
      typeof o === 'object' && o !== null && Object.keys(template).every((name) => template[name].valid(o[name])),
    toModel: (o: T): M => mapObject(o, (name) => template[name].toModel((o as any)[name])) as M,
    toTransit: (m: M): T => mapObject(m, (name) => template[name].toTransit((m as any)[name])) as T,
    toPartialTemplate: () => {
      const obj: any = {};
      Object.entries(template).forEach(([key, t]) => {
        obj[key] = TOptional(toPartial(t));
      });
      return (TObject(obj) as any) as Template<Partial<M>, Partial<T>>;
    },
  };
}
