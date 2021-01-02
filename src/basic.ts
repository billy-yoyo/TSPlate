import Template from './template';

export const TString: Template<string> = {
  valid: (o: any) => typeof o === 'string',
  toModel: (o: any) => (o ? o.toString() : ''),
  toTransit: (s: string) => s,
};

export const TInt: Template<number> = {
  valid: (o: any) => typeof o === 'number' && Number.isInteger(o),
  toModel: (o: any) => o,
  toTransit: (i: number) => i,
};

export const TFloat: Template<number> = {
  valid: (o: any) => typeof o === 'number',
  toModel: (o: any) => o,
  toTransit: (f: number) => f,
};

export const TBoolean: Template<boolean> = {
  valid: (o: any) => typeof o === 'boolean',
  toModel: (o: any) => o,
  toTransit: (b: boolean) => b,
};

export const TVoid: Template<void> = {
  valid: (o: any) => false,
  toModel: (o: any) => null,
  toTransit: (o: void) => o,
};