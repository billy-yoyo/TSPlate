import { TFloat } from '../basic';

test('Integers validate', () => {
    expect(TFloat.valid(3)).toBe(true);
});

test('Floats validate', () => {
    expect(TFloat.valid(3.4)).toBe(true);
});

test('Strings don\'t validate', () => {
    expect(TFloat.valid('hello')).toBe(false);
});

test('Floats transit as floats', () => {
    expect(TFloat.toTransit(3.2)).toBeCloseTo(3.2);
});

test('Floats transits convert to floats', () => {
    expect(TFloat.toModel(3.2)).toBeCloseTo(3.2);
});
