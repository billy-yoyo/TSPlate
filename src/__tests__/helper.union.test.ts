import { TUnion } from '../helper';
import { TString, TInt } from '../basic';
import TObject from '../object';
import { toPartial } from '../template';

const TStringOrInt = TUnion(TString, TInt, (m): m is string => typeof m === 'string');

const TPartialUnion = toPartial(
  TUnion(
    TObject({ type: TString, a: TString }),
    TObject({ type: TString, b: TString }),
    (m): m is { type: string; a: string } => m.type === 'a',
  ),
);

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

test("Undefined doesn't validate", () => {
  expect(TStringOrInt.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TStringOrInt.valid(null)).toBe(false);
});

test('Partial objects validate within partial unions', () => {
  expect(TPartialUnion.valid({ type: 'a' })).toBe(true);
  expect(TPartialUnion.valid({ type: 'b' })).toBe(true);
});
