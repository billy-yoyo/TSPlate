import Template from './template';

export default function TMap<O, N>(
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