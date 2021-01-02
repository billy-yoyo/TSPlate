import { TVoid } from '../basic';

test('Void should never validate', () => {
  expect(TVoid.valid(2)).toBe(false);
  expect(TVoid.valid(false)).toBe(false);
  expect(TVoid.valid(0)).toBe(false);
  expect(TVoid.valid(null)).toBe(false);
  expect(TVoid.valid('hello')).toBe(false);
});
