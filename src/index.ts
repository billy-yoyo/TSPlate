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
import TMap from './map';
import TClass from './class';

export type unwrapTemplate<TT extends Template<any>> = TT extends Template<infer R> ? R : never;

const T = {
  Void: TVoid,
  String: TString,
  Int: TInt,
  Float: TFloat,
  Boolean: TBoolean,
  Array: TArray,
  Object: TObject,
  Enum: TEnum,
  Map: TMap,
  Class: TClass
};

export default T;
export { Template };