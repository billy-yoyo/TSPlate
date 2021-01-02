import { TUnion } from '../helper';
import { TString, TInt } from '../basic';

const TStringOrInt = TUnion(TString, TInt, (m): m is string => typeof m === 'string');

test('Union templates should validate on left type', () => {
  expect(TStringOrInt.valid('hello')).toBe(true);
});

test('Union templates should validate on right type', () => {
  expect(TStringOrInt.valid(3)).toBe(true);
});

test("Union templates shouldn't validate on other types", () => {
  expect(TStringOrInt.valid(true)).toBe(false);
});

test('Left models should transit according to the left template', () => {
  expect(TStringOrInt.toTransit('hello')).toBe('hello');
});

test('Left transits should convert to models according to the left template', () => {
  expect(TStringOrInt.toModel('hello')).toBe('hello');
});

test('Right models should transit according to the right template', () => {
  expect(TStringOrInt.toTransit(3)).toBe(3);
});

test('Right transits should convert to models according to the right template', () => {
  expect(TStringOrInt.toModel(3)).toBe(3);
});
