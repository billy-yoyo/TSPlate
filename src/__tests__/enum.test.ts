import TEnum from '../enum';

const TExample = TEnum
        .add('hello')
        .add('world');

test('Strings within enum should validate', () => {
    expect(TExample.valid('hello')).toBe(true);
}); 

test('Strings outsite enum shouldn\'t validate', () => {
    expect(TExample.valid('example')).toBe(false);
});

test('Integers shouldn\'t validate with enum', () => {
    expect(TExample.valid(3)).toBe(false);
});

test('Enums should transit as strings', () => {
    expect(TExample.toTransit('hello')).toBe('hello');
});

test('Enum transists should convert to strings', () => {
    expect(TExample.toModel('hello')).toBe('hello');
});
