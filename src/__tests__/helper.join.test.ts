import Template, { toPartial } from '../template';
import { TJoin } from '../helper';
import TObject from '../object';
import { TString, TInt } from '../basic';

class Example {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const TExampleObj = TObject({
  name: TString,
  age: TInt,
});

const TExampleData: Template<Example, { name: string; age: number }> = {
  valid: TExampleObj.valid,
  toModel: (o: { name: string; age: number }): Example => new Example(o.name, o.age),
  toTransit: (m: Example): { name: string; age: number } => ({ name: m.name, age: m.age }),
};

const TExample = TJoin(TExampleData, TExampleObj);
export const TPartialExample = toPartial(TExample);

test('Join validates based on underlying validation', () => {
  // compiled into single test, since if individual components of these are failing
  // it is likely just an issue with TObject
  expect(TExample.valid({})).toBe(false);
  expect(TExample.valid({ name: 'hello' })).toBe(false);
  expect(TExample.valid({ name: 'hello', age: 'world' })).toBe(false);
  expect(TExample.valid({ name: 'hello', age: 3 })).toBe(true);
});

test('Join converts to transit object of right type', () => {
  const transit = TExample.toTransit(new Example('hello', 3));

  expect(Object.keys(transit)).toHaveLength(2);
  expect(transit).toHaveProperty('name');
  expect(transit.name).toBe('hello');
  expect(transit).toHaveProperty('age');
  expect(transit.age).toBe(3);
});

test('Transit objects get mapped to left model type', () => {
  const model = TExample.toModel({ name: 'hello', age: 3 });

  expect(model).toBeInstanceOf(Example);
  expect(model.name).toBe('hello');
  expect(model.age).toBe(3);
});

test("Undefined doesn't validate", () => {
  expect(TExample.valid(undefined)).toBe(false);
});

test("Null doesn't validate", () => {
  expect(TExample.valid(null)).toBe(false);
});

test("Partial objects validate for partial joins", () => {
  expect(TPartialExample.valid({ name: 'hello' }));
});
