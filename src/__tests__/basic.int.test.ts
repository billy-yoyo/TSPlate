import { TInt } from '../basic';

test('Integers validate', () => {
  expect(TInt.valid(3)).toBe(true);
});

test("Strings don't validate", () => {
  expect(TInt.valid('hello')).toBe(false);
});

test("Undefined doesn't validate", () => {
  expect(TInt.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TInt.valid(null)).toBe(false);
});

test("Floats don't validate", () => {
  expect(TInt.valid(3.4)).toBe(false);
});

test('Integers transit as integers', () => {
  expect(TInt.toTransit(3)).toEqual(3);
});

test('Integer transits convert to integers', () => {
  expect(TInt.toModel(3)).toBe(3);
});
