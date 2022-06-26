
export type DeepPartial<T> = T extends Object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

export default interface Template<M, T> {
  valid: (o: any) => o is T;
  toModel: (o: T) => M;
  toTransit: (t: M) => T;
  toPartialTemplate?: () => Template<DeepPartial<M>, DeepPartial<T>>;
}

export function isTemplate(t: any): t is Template<any, any> {
  return t.valid !== undefined && t.toModel !== undefined && t.toTransit !== undefined;
}

export const toPartial = <M, T>(template: Template<M, T>): Template<DeepPartial<M>, DeepPartial<T>> => {
  if (template.toPartialTemplate) {
    return template.toPartialTemplate();
  } else {
    return (template as any) as Template<DeepPartial<M>, DeepPartial<T>>;
  }
};
