export interface Template<R> {
  valid: (o: any) => boolean;
  toModel: (o: any) => R;
  toTransit: (t: R) => any;
}

export const TString: Template<string> = {
  valid: (o: any) => typeof o === 'string',
  toModel: (o: any) => (o ? o.toString() : ''),
  toTransit: (s: string) => s,
};

export const TInt: Template<number> = {
  valid: (o: any) => typeof o === 'number' && Number.isInteger(o),
  toModel: (o: any) => o,
  toTransit: (i: number) => i,
};

export const TFloat: Template<number> = {
  valid: (o: any) => typeof o === 'number',
  toModel: (o: any) => o,
  toTransit: (f: number) => f,
};

export const TBoolean: Template<boolean> = {
  valid: (o: any) => typeof o === 'boolean',
  toModel: (o: any) => o,
  toTransit: (b: boolean) => b,
};

export const TBaseObject: Template<{}> = {
  valid: (o: any) => typeof o === 'object',
  toModel: (o: any) => o,
  toTransit: (o: {}) => o,
};

export const TVoid: Template<void> = {
  valid: (o: any) => false,
  toModel: (o: any) => null,
  toTransit: (o: void) => o,
};

export function TArray<R>(item: Template<R>): Template<R[]> {
  return {
    valid: (o: any) => Array.isArray(o) && o.every(item.valid),
    toModel: (o: any) => (o as any[]).map(item.toModel),
    toTransit: (items: R[]) => items.map(item.toTransit),
  };
}

function TObjectUnion<R, K extends string, V>(
  base: Template<R>,
  key: K,
  value: Template<V>,
): Template<R & { [k in K]: V }> {
  return {
    valid: (o: any) => base.valid(o) && o.hasOwnProperty(key) && value.valid(o[key]),
    toModel: (o: any) => {
      const extension: { [k in K]: V } = { [key]: value.toModel(o[key]) } as { [k in K]: V };
      return { ...base.toModel(o), ...extension };
    },
    toTransit: (data: R & { [k in K]: V }) => ({
      ...base.toTransit(data as R),
      [key]: value.toTransit((data as any)[key]),
    }),
  };
}

interface TObject<R> extends Template<R> {
  add<K extends string, V>(key: K, value: Template<V>): TObject<R & { [key in K]: V }>;
}

function createObjectBuilder<R>(base: Template<R>): TObject<R> {
  function add<K extends string, V>(key: K, value: Template<V>): TObject<R & { [k in K]: V }> {
    return createObjectBuilder(TObjectUnion(base, key, value));
  }

  return {
    valid: base.valid,
    toModel: base.toModel,
    toTransit: base.toTransit,
    add,
  };
}

export const TObject = createObjectBuilder(TBaseObject);

function TEnumUnion<R, E extends string>(base: Template<R>, value: E): Template<R | E> {
  return {
    valid: (o: any) => o === value || base.valid(o),
    toModel: (o: any) => o,
    toTransit: (o: R | E) => o,
  };
}

interface TEnum<R> extends Template<R> {
  add<E extends string>(value: E): TEnum<R | E>;
}

function createEnumBuilder<R>(base: Template<R>): TEnum<R> {
  function add<E extends string>(value: E): TEnum<R | E> {
    return createEnumBuilder(TEnumUnion(base, value));
  }

  return {
    valid: base.valid,
    toModel: base.toModel,
    toTransit: base.toTransit,
    add,
  };
}

export const TEnum = createEnumBuilder(TVoid);

export type unwrapTemplate<TT extends Template<any>> = TT extends Template<infer R> ? R : never;

const T = {
  Void: TVoid,
  String: TString,
  Int: TInt,
  Float: TFloat,
  Boolean: TBoolean,
  BaseObject: TBaseObject,
  Array: TArray,
  Object: TObject,
  Enum: TEnum,
};

export default T;
