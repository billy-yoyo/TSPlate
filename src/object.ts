import Template from './template';
import { TString, TInt } from './basic';
import { TOptional } from './helper';

type ModelType<TT> = TT extends Template<infer M, any> ? M : never;
type TransitType<TT> = TT extends Template<any, infer T> ? T : never;

export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>;
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type SeperateRequiredAndOptionalTypes<O> = {
  [K in RequiredKeys<O>]: O[K]
} & {
  [K in OptionalKeys<O>]?: O[K]
}

type UnwrapModelTypes<TT extends {[key: string]: Template<any, any>}> = SeperateRequiredAndOptionalTypes<{
  [K in keyof TT]: ModelType<TT[K]>
}>;
type UnwrapTransitTypes<TT extends {[key: string]: Template<any, any>}> = SeperateRequiredAndOptionalTypes<{
  [K in keyof TT]: TransitType<TT[K]>
}>;

function mapObject<T>(object: T, func: (key: string) => any) {
  return Object.keys(object).reduce((o, key) => ({
    ...o,
    [key]: func(key) 
  }), {});
}

export default function TObject<TT extends {[key: string]: Template<any, any>}, M extends UnwrapModelTypes<TT>, T extends UnwrapTransitTypes<TT>>(
  template: TT
): Template<M, T> {
  return {
    valid: (o: any): o is T => 
      typeof o === 'object' && Object.keys(template).every(name => template[name].valid(o[name])),
    toModel: (o: T): M => 
      mapObject(o, name => template[name].toModel((o as any)[name])) as M,
    toTransit: (m: M): T => 
      mapObject(m, name => template[name].toTransit((m as any)[name])) as T
  };
}

class Name { 
  public name: string;
  constructor(name: string) {
      this.name = name;
  } 
}

const TName: Template<Name, string> = {
  valid: TString.valid,
  toModel: (o: any) => new Name(o),
  toTransit: (name: Name) => name.name
};

const TExample = TObject({
  name: TName,
  message: TString,
  age: TOptional(TInt)
});

const example = TExample.toTransit({name: new Name('hello'), message: 'test'})
