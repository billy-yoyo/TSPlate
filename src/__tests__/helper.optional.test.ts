import { TOptional } from '../helper';
import { TString } from '../basic';

const TOptionalString = TOptional(TString);

test('Optional templates should validate their underlying type', () => {
  expect(TOptionalString.valid('hello')).toBe(true);
});

test('Optional templates should validate undefined', () => {
  expect(TOptionalString.valid(undefined)).toBe(true);
});

test('Optional templates should validate null', () => {
  expect(TOptionalString.valid(null)).toBe(true);
});

test("Optional templates shouldn't validate other types", () => {
  expect(TOptionalString.valid(3)).toBe(false);
});
