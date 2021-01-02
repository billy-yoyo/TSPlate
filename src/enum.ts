import Template from './template';

export default function TEnum<T extends string[]>(...values: T): Template<typeof values[number], string> {
  return {
    valid: (o: any): o is string => typeof o === 'string' && values.indexOf(o) >= 0,
    toModel: (o: string): typeof values[number] => o as typeof values[number],
    toTransit: (o: typeof values[number]): string => o as string,
  };
}
