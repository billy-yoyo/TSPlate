import Template from './template';

type RemoveNames<T extends any[]> = [any, ...T] extends [any, ...infer U] ? U : never;
type NamedTemplates<A, X> = {
  [K in keyof A]: [X, Template<A[K], any>];
};
type NamedTemplate = [string, Template<any, any>];

export default function TClass<
  C extends new (...args: any[]) => any,
  T extends NamedTemplates<RemoveNames<ConstructorParameters<C>>, keyof InstanceType<C>>
>(cls: C, templates: T): Template<InstanceType<C>, any> {
  const templatearr = (templates as unknown) as NamedTemplate[];

  return {
    valid: (o: any): o is any =>
      typeof o === 'object' && o !== null && templatearr.every(([key, t]) => t.valid(o[key])),
    toModel: (o: any) => new cls(...templatearr.map(([key, t]) => t.toModel(o[key as keyof T]))),
    toTransit: (c: C) => templatearr.reduce((obj: any, [key, t]) => ({ ...obj, [key]: t.toTransit((c as any)[key]) }), {}),
  };
}
