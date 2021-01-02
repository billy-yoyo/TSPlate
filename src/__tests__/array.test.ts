import Template from '../template';
import { TString } from '../basic';
import TArray from '../array';

const TStringArray = TArray(TString);

class Name { 
    public name: string;
    constructor(name: string) {
        this.name = name;
    } 
}

const TName: Template<Name, string> = {
    valid: TString.valid,
    toModel: (o: any) => new Name(o),
    toTransit: (name: Name) => name.name
};
const TNameArray = TArray(TName);

test('Empty list validates', () => {
    expect(TStringArray.valid([])).toBe(true);
});

test('Singleton list validates', () => {
    expect(TStringArray.valid(['hello'])).toBe(true);
});

test('Multi value list validates', () => {
    expect(TStringArray.valid(['hello', 'world'])).toBe(true);
});

test('Incorrect item type list doesn\'t validate', () => {
    expect(TStringArray.valid([3])).toBe(false);
});

test('Mixed type lists doesn\'t validate', () => {
    expect(TStringArray.valid(['hello', 3])).toBe(false);
});

test('Arrays transit as arrays', () => {
    const transit = TStringArray.toTransit(['a', 'b']);

    expect(transit).toHaveLength(2);
    expect(transit[0]).toBe('a');
    expect(transit[1]).toBe('b');
});

test('Transit arrays convert to arrays', () => {
    const model = TStringArray.toModel(['a', 'b']);

    expect(model).toHaveLength(2);
    expect(model[0]).toBe('a');
    expect(model[1]).toBe('b');
});

test('Arrays convert underlying types to transits', () => {
    const transit = TNameArray.toTransit([new Name('hello')]);

    expect(transit).toHaveLength(1);
    expect(transit[0]).toBe('hello');
});

test('Array transits convert to underlying types models', () => {
    const model = TNameArray.toModel(['hello']);

    expect(model).toHaveLength(1);
    expect(model[0].name).toBe('hello');
});

