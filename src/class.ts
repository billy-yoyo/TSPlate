import Template from './template';

type Head<T> = T extends {0: infer V} ? V : never;
type Tail<T> = T extends [any, ...infer R] ? R : never;
type ClassType<P> = P extends new (...args: any[]) => infer C ? C : never;

function TClassProgress<C, P extends new (...args: any[]) => C, A>(
  cls: P,
  templates: {name: string, template: Template<any>}[]
) {
  function add<K extends string, S extends Head<A>>(
    name: K, 
    template: Template<S>
  ) {
    return TClassProgress<C, P, Tail<A>>(
      cls,
      [...templates, {name, template}]
    );
  }

  function build(): Template<C> {
    return {
      valid: (o: any) => 
        typeof o === 'object' && templates.every(t => o[t.name] && t.template.valid(o[t.name])),
      toModel: (o: any) => new cls(...templates.map(t => t.template.toModel(o[t.name]))),
      toTransit: (c: C) => templates.reduce(
        (obj: any, t) => ({...obj, [t.name]: t.template.toTransit((c as any)[t.name])})
      , {})
    }
  }

  return { add, build };
}

export default function TClass<P extends new (...args: any[]) => any>(
  cls: P,
) {
  return TClassProgress<ClassType<P>, P, ConstructorParameters<P>>(cls, []);
}
