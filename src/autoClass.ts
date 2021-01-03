import Template from './template';
import TClass from './class';

interface TSPTemplates {
  $TSPTemplates: { [key: string]: Template<any, any> };
  $TSPConstructor: string[];
}

type IncorrectNumberOfConstructorArguments = 'Incorrect number of constructor arguments';
type MatchLength<S extends readonly any[], R extends readonly any[], T, K extends string> = R extends {
  [k in keyof S]: any;
}
  ? Record<K, any>
  : IncorrectNumberOfConstructorArguments;
type MatchArgsLength<A extends readonly any[], C, K extends string> = C extends new (...args: infer X) => infer T
  ? MatchLength<A, X, T, K>
  : never;

export function template<T>(t: Template<T, any>) {
  return <K extends string>(target: Record<K, T>, name: K) => {
    const tsp = (target as unknown) as TSPTemplates;
    if (tsp.$TSPTemplates === undefined) {
      tsp.$TSPTemplates = {};
    }

    tsp.$TSPTemplates[name] = t;
  };
}

export function constructor<K extends readonly string[]>(...args: K) {
  return <C extends new (...args: readonly any[]) => T, T extends MatchArgsLength<K, C, typeof args[number]>>(
    target: C,
  ) => {
    const tsp = (target as unknown) as TSPTemplates;
    tsp.$TSPConstructor = (args as unknown) as string[];
  };
}

export default function TAutoClass<C extends new (...args: any[]) => any>(cls: C): Template<InstanceType<C>, any> {
  const tsp = (cls as unknown) as TSPTemplates;

  if (tsp.$TSPTemplates === undefined || tsp.$TSPConstructor === undefined) {
    return TClass(cls, [] as any);
  } else {
    if (tsp.$TSPConstructor === undefined) {
      throw Error(
        'Attempted to use auto class on non-template class. Must decorate class with the @templateConstructor decorator to use AutoClass',
      );
    }

    if (tsp.$TSPConstructor.some((key) => tsp.$TSPTemplates[key] === undefined)) {
      throw Error(
        "Template constructor specifies properties which don't have templates defined. Specify property templates using the @template(Template) decorator.",
      );
    }

    return TClass(cls, tsp.$TSPConstructor.map((key) => [key, tsp.$TSPTemplates[key]]) as any);
  }
}
