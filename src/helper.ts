import Template from './template';

export function TOptional<M, T>(template: Template<M, T>): Template<M | undefined, T | undefined> {
  return {
    valid: (o: any): o is undefined | T => o === undefined || template.valid(o),
    toModel: (o: undefined | T) => (o !== undefined ? template.toModel(o) : undefined),
    toTransit: (m: undefined | M) => (m !== undefined ? template.toTransit(m) : undefined),
  };
}

export function TMap<O, N, T>(old: Template<O, T>, oldToNew: (_old: O) => N, newToOld: (_new: N) => O): Template<N, T> {
  return {
    valid: old.valid,
    toModel: (o: T) => oldToNew(old.toModel(o)),
    toTransit: (_new: N) => old.toTransit(newToOld(_new)),
  };
}

export function TJoin<M, S, T>(left: Template<M, S>, right: Template<S, T>): Template<M, T> {
  return {
    valid: right.valid,
    toModel: (o: T) => left.toModel(right.toModel(o)),
    toTransit: (m: M) => right.toTransit(left.toTransit(m)),
  };
}

export function TUnion<M1, T1, M2, T2>(
  left: Template<M1, T1>,
  right: Template<M2, T2>,
  isLeft: (m: M1 | M2) => m is M1,
): Template<M1 | M2, T1 | T2> {
  return {
    valid: (o: any): o is T1 | T2 => left.valid(o) || right.valid(o),
    toModel: (o: T1 | T2) => (left.valid(o) ? left.toModel(o) : right.toModel(o)),
    toTransit: (m: M1 | M2) => (isLeft(m) ? left.toTransit(m) : right.toTransit(m)),
  };
}
