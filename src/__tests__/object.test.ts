import Template from '../template';
import { TString } from '../basic';
import TObject from '../object';

class Name { 
    public name: string;
    constructor(name: string) {
        this.name = name;
    } 
}

const TName: Template<Name> = {
    valid: TString.valid,
    toModel: (o: any) => new Name(o),
    toTransit: (name: Name) => name.name
};

const TExample = TObject
    .add('name', TName)
    .add('message', TString);

test('Objects with all entries matching their validations should validate', () => {
    expect(TExample.valid({
        name: 'example-name',
        message: 'example-message'
    })).toBe(true);
});

test('Objects with missing entries shouldn\'t validate', () => {
    expect(TExample.valid({
        message: 'example-message'
    })).toBe(false);
});

test('Objects with entries not matching their validations shouldn\'t validate', () => {
    expect(TExample.valid({
        name: 3,
        message: 'example-message'
    })).toBe(false);
});

test('Empty objects should validate the base object type', () => {
    expect(TObject.valid({})).toBe(true);
});

test('Empty objects shouldn\'t validate on more complex object types', () => {
    expect(TExample.valid({})).toBe(false);
});

test('Objects should use their underlying entry types to transit', () => {
    const transit = TExample.toTransit({
        name: new Name('example-name'),
        message: 'example-message'
    });

    expect(Object.keys(transit)).toHaveLength(2);
    expect(transit).toHaveProperty('name');
    expect(transit.name).toBe('example-name');
    expect(transit).toHaveProperty('message');
    expect(transit.message).toBe('example-message');
});

test('Object transits should use their underlying entry types to convert', () => {
    const model = TExample.toModel({
        name: 'example-name',
        message: 'example-message'
    });

    expect(Object.keys(model)).toHaveLength(2);
    expect(model).toHaveProperty('name');
    expect(model.name.name).toBe('example-name');
    expect(model).toHaveProperty('message');
    expect(model.message).toBe('example-message');
});
