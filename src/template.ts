export default interface Template<M, T> {
  valid: (o: any) => o is T;
  toModel: (o: T) => M;
  toTransit: (t: M) => T;
}
