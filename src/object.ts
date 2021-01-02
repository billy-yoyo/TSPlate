import Template from './template';

const TBaseObject: Template<{}> = {
    valid: (o: any) => typeof o === 'object',
    toModel: (o: any) => o,
    toTransit: (o: {}) => o,
};

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

const TObject = createObjectBuilder(TBaseObject);
export default TObject;