import { TAny } from '../basic';

test('Void should never validate', () => {
    expect(TAny.valid(2)).toBe(true);
    expect(TAny.valid(false)).toBe(true);
    expect(TAny.valid(0)).toBe(true);
    expect(TAny.valid(null)).toBe(true);
    expect(TAny.valid(undefined)).toBe(true);
    expect(TAny.valid('hello')).toBe(true);
});
