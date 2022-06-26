import Template, { isTemplate } from './template';
import { TVoid, TString, TInt, TFloat, TBoolean, TAny, TDate, TTime } from './basic';
import TArray from './array';
import TObject from './object';
import TEnum from './enum';
import { TOptional, TMap, TUnion } from './helper';
import TClass from './class';
import TAutoClass, { template, constructor } from './autoClass';
import TRecord from './record';

export type ModelType<TT extends Template<any, any>> = TT extends Template<infer M, any> ? M : never;
export type TransitType<TT extends Template<any, any>> = TT extends Template<any, infer MT> ? MT : never;

const T = {
  Void: TVoid,
  Any: TAny,
  String: TString,
  Int: TInt,
  Float: TFloat,
  Boolean: TBoolean,
  Date: TDate,
  Time: TTime,
  Array: TArray,
  Object: TObject,
  Record: TRecord,
  Enum: TEnum,
  Class: TClass,
  Map: TMap,
  Optional: TOptional,
  Union: TUnion,
  AutoClass: TAutoClass,
  template,
  constructor,
};

export default T;
export { Template, isTemplate };
