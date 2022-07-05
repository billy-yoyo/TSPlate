import TEnumRecord from '../enumRecord';
import TEnum from '../enum';
import { TInt, TString } from '../basic';
import { toPartial } from '../template';
import TObject from '../object';

const TLetterRecord = TEnumRecord(['a', 'b', 'c'] as const, TInt);

const TPartialRecord = toPartial(TEnumRecord(['a', 'b', 'c'] as const, TObject({ a: TString, b: TString })));

test('Validates if all keys exist and values match templates', () => {
  expect(TLetterRecord.valid({ a: 1, b: 2, c: 3 })).toBe(true);
});

test("Invalid values don't validate", () => {
  expect(TLetterRecord.valid({ a: 1, b: 'hello' })).toBe(false);
});

test("Missing keys don't validate", () => {
  expect(TLetterRecord.valid({ a: 1, b: 2 })).toBe(false);
});

test('Records transit as objects', () => {
  const transit = TLetterRecord.toTransit({ a: 1, b: 2, c: 3 });

  expect(Object.keys(transit)).toHaveLength(3);
  expect(transit).toHaveProperty('a');
  expect(transit.a).toBe(1);
  expect(transit).toHaveProperty('b');
  expect(transit.b).toBe(2);
  expect(transit).toHaveProperty('c');
  expect(transit.c).toBe(3);
});

test('Transits will be converted to objects', () => {
  const model = TLetterRecord.toModel({ a: 1, b: 2, c: 3 });

  expect(Object.keys(model)).toHaveLength(3);
  expect(model).toHaveProperty('a');
  expect(model.a).toBe(1);
  expect(model).toHaveProperty('b');
  expect(model.b).toBe(2);
  expect(model).toHaveProperty('c');
  expect(model.c).toBe(3);
});

test("Undefined doesn't validate", () => {
  expect(TLetterRecord.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TLetterRecord.valid(null)).toBe(false);
});

test('Partial enum records are allowed missing keys', () => {
  expect(TPartialRecord.valid({ a: { a: 'a', b: 'c' } })).toBe(true);
});

test('Partial enum records have partial value templates', () => {
  expect(TPartialRecord.valid({ a: { a: 'a' } })).toBe(true);
});
