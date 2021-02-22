import { TBoolean } from '../basic';

test('True validates', () => {
  expect(TBoolean.valid(true)).toBe(true);
});

test('False validates', () => {
  expect(TBoolean.valid(false)).toBe(true);
});

test("Strings don't validate", () => {
  expect(TBoolean.valid('hello')).toBe(false);
});

test("Undefined doesn't validate", () => {
  expect(TBoolean.valid(undefined)).toBe(false);
});

test('Booleans transit as booleans', () => {
  expect(TBoolean.toTransit(true)).toBe(true);
});

test('Boolean transits convert to booleans', () => {
  expect(TBoolean.toModel(true)).toBe(true);
});
