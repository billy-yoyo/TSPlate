import Template from './template';
import { 
  TVoid,
  TString,
  TInt,
  TFloat,
  TBoolean
} from './basic';
import TArray from './array';
import TObject from './object';
import TEnum from './enum';
import {
  TOptional,
  TMap,
  TUnion
} from './helper';
import TClass from './class';

export type ModelType<TT extends Template<any, any>> = TT extends Template<infer M, any> ? M : never;
export type TransitType<TT extends Template<any, any>> = TT extends Template<any, infer T> ? T : never;

const T = {
  Void: TVoid,
  String: TString,
  Int: TInt,
  Float: TFloat,
  Boolean: TBoolean,
  Array: TArray,
  Object: TObject,
  Enum: TEnum,
  Class: TClass,
  Map: TMap,
  Optional: TOptional,
  Union: TUnion
};

export default T;
export { Template };