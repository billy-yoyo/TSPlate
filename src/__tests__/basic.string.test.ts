import { TString } from '../basic';

test('Strings validate', () => {
    expect(TString.valid('hello')).toBe(true);
});

test('Integers don\'t validate', () => {
    expect(TString.valid(3)).toBe(false);
});

test('Strings transit as strings', () => {
    expect(TString.toTransit('hello')).toBe('hello');
});

test('String transits convert to strings', () => {
    expect(TString.toModel('hello')).toBe('hello');
});
