import Template from '../template';
import { TString, TInt } from '../basic';
import { TOptional } from '../helper';
import TObject from '../object';

class Name {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const TName: Template<Name, string> = {
  valid: TString.valid,
  toModel: (o: any) => new Name(o),
  toTransit: (name: Name) => name.name,
};

const TExample = TObject({
  name: TName,
  message: TString,
  age: TOptional(TInt),
});

test('Objects with all entries matching their validations should validate', () => {
  expect(
    TExample.valid({
      name: 'example-name',
      message: 'example-message',
      age: 3,
    }),
  ).toBe(true);
});

test("Objects with missing non-optional entries shouldn't validate", () => {
  expect(
    TExample.valid({
      message: 'example-message',
      age: 3,
    }),
  ).toBe(false);
});

test('Objects with missing optional entries should validate', () => {
  expect(
    TExample.valid({
      name: 'example-name',
      message: 'example-message',
    }),
  ).toBe(true);
});

test("Objects with entries not matching their validations shouldn't validate", () => {
  expect(
    TExample.valid({
      name: 3,
      message: 'example-message',
      age: 3,
    }),
  ).toBe(false);
});

test('Empty objects should validate the base object type', () => {
  expect(TObject({}).valid({})).toBe(true);
});

test("Empty objects shouldn't validate on more complex object types", () => {
  expect(TExample.valid({})).toBe(false);
});

test('Objects should use their underlying entry types to transit', () => {
  const transit = TExample.toTransit({
    name: new Name('example-name'),
    message: 'example-message',
    age: 3,
  });

  expect(Object.keys(transit)).toHaveLength(3);
  expect(transit).toHaveProperty('name');
  expect(transit.name).toBe('example-name');
  expect(transit).toHaveProperty('message');
  expect(transit.message).toBe('example-message');
  expect(transit).toHaveProperty('age');
  expect(transit.age).toBe(3);
});

test('Objects should create transit types with missing optional properties', () => {
  const transit = TExample.toTransit({
    name: new Name('example-name'),
    message: 'example-message',
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
    message: 'example-message',
    age: 3,
  });

  expect(Object.keys(model)).toHaveLength(3);
  expect(model).toHaveProperty('name');
  expect(model.name.name).toBe('example-name');
  expect(model).toHaveProperty('message');
  expect(model.message).toBe('example-message');
});

test('Objects transits should create models with missing optional properties', () => {
  const transit = TExample.toTransit({
    name: new Name('example-name'),
    message: 'example-message',
  });

  expect(Object.keys(transit)).toHaveLength(2);
  expect(transit).toHaveProperty('name');
  expect(transit.name).toBe('example-name');
  expect(transit).toHaveProperty('message');
  expect(transit.message).toBe('example-message');
});

test("Undefined doesn't validate", () => {
  expect(TExample.valid(undefined)).toBe(false);
});
