import TRecord from '../record';
import TEnum from '../enum';
import { TInt } from '../basic';

const TLetter = TEnum('a', 'b', 'c');
const TLetterRecord = TRecord(TLetter, TInt);

test('Validates if all keys and values match templates', () => {
  expect(TLetterRecord.valid({ a: 1, b: 2 })).toBe(true);
});

test("Invalid keys don't validate", () => {
  expect(TLetterRecord.valid({ 1: 2, b: 3 })).toBe(false);
});

test("Invalid values don't validate", () => {
  expect(TLetterRecord.valid({ a: 1, b: 'c' })).toBe(false);
});

test('Records transit as objects', () => {
  const transit = TLetterRecord.toTransit({ a: 1, b: 2 });

  expect(Object.keys(transit)).toHaveLength(2);
  expect(transit).toHaveProperty('a');
  expect(transit.a).toBe(1);
  expect(transit).toHaveProperty('b');
  expect(transit.b).toBe(2);
});

test('Transits will be converted to objects', () => {
  const model = TLetterRecord.toModel({ a: 1, b: 2 });

  expect(Object.keys(model)).toHaveLength(2);
  expect(model).toHaveProperty('a');
  expect(model.a).toBe(1);
  expect(model).toHaveProperty('b');
  expect(model.b).toBe(2);
});

test("Undefined doesn't validate", () => {
  expect(TLetterRecord.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TLetterRecord.valid(null)).toBe(false);
});
