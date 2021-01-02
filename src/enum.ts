import Template from './template';
import { TVoid } from './basic';

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

const TEnum = createEnumBuilder(TVoid);

export default TEnum;