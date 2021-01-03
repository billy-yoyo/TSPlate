export default interface Template<M, T> {
  valid: (o: any) => o is T;
  toModel: (o: T) => M;
  toTransit: (t: M) => T;
}

export function isTemplate(t: any): t is Template<any, any> {
  return t.valid !== undefined && t.toModel !== undefined && t.toTransit !== undefined;
}
