import { TDate } from '../basic';

test('Datestrings validate', () => {
  expect(TDate.valid(new Date().toISOString())).toBe(true);
});

test("Non datestrings don't validate", () => {
  expect(TDate.valid('hello world')).toBe(false);
});

test("Non strings don't validate", () => {
  expect(TDate.valid(3)).toBe(false);
});

test("Undefined doesn't validate", () => {
  expect(TDate.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TDate.valid(null)).toBe(false);
});

test('Dates transit as datestrings', () => {
  expect(TDate.toTransit(new Date(0))).toBe('1970-01-01T00:00:00.000Z');
});

test('Datestring transits convert to dates', () => {
  expect(TDate.toModel('1970-01-01T00:00:00.000Z')).toEqual(new Date(0));
});
