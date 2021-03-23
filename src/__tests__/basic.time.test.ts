import { TTime } from '../basic';

test('Timestamps validate', () => {
  expect(TTime.valid(100)).toBe(true);
});

test("Non numbers don't validate", () => {
  expect(TTime.valid('hello')).toBe(false);
});

test("Undefined doesn't validate", () => {
  expect(TTime.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TTime.valid(null)).toBe(false);
});

test('Dates transit as timestamps', () => {
  expect(TTime.toTransit(new Date(100))).toBe(100);
});

test('Timestamps transits convert to dates', () => {
  expect(TTime.toModel(100)).toEqual(new Date(100));
});
