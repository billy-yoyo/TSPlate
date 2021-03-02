import Template from './template';

export const TString: Template<string, string> = {
  valid: (o: any): o is string => typeof o === 'string',
  toModel: (o: string) => o,
  toTransit: (s: string) => s,
};

export const TInt: Template<number, number> = {
  valid: (o: any): o is number => typeof o === 'number' && Number.isInteger(o),
  toModel: (o: number) => o,
  toTransit: (i: number) => i,
};

export const TFloat: Template<number, number> = {
  valid: (o: any): o is number => typeof o === 'number',
  toModel: (o: number) => o,
  toTransit: (f: number) => f,
};

export const TBoolean: Template<boolean, boolean> = {
  valid: (o: any): o is boolean => typeof o === 'boolean',
  toModel: (o: boolean) => o,
  toTransit: (b: boolean) => b,
};

export const TVoid: Template<void, void> = {
  valid: (o: any): o is void => false,
  toModel: (o: any) => null,
  toTransit: (o: void) => o,
};

export const TAny: Template<any, any> = {
  valid: (o: any): o is any => true,
  toModel: (o: any) => o,
  toTransit: (o: any) => o
};
