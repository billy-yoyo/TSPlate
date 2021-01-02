import Template from './template';

export default function TArray<R>(item: Template<R>): Template<R[]> {
  return {
    valid: (o: any) => Array.isArray(o) && o.every(item.valid),
    toModel: (o: any) => (o as any[]).map(item.toModel),
    toTransit: (items: R[]) => items.map(item.toTransit),
  };
}
  