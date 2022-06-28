import Template, { DeepPartial, toPartial } from './template';

export default function TArray<R, T>(item: Template<R, T>): Template<R[], T[]> {
  return {
    valid: (o: any): o is T[] => Array.isArray(o) && o.every(item.valid),
    toModel: (o: T[]) => o.map(item.toModel),
    toTransit: (items: R[]) => items.map(item.toTransit),
    toPartialTemplate: () => {
      return (TArray(toPartial(item)) as any) as Template<DeepPartial<R[]>, DeepPartial<T[]>>;
    },
  };
}
