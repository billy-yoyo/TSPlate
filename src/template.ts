export default interface Template<R> {
  valid: (o: any) => boolean;
  toModel: (o: any) => R;
  toTransit: (t: R) => any;
}



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

export function TTransform<O, N>(
    old: Template<O>,
    oldToNew: (_old: O) => N, 
    newToOld: (_new: N) => O
  ): Template<N> {
    return {
        valid: old.valid,
        toModel: (o: any) => oldToNew(old.toModel(o)),
        toTransit: (_new: N) => old.toTransit(newToOld(_new))
    };
}



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
  Transform: TTransform
};

export default T;
