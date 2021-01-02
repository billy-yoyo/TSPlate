import { TMap } from '../helper';
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

const TExample = TMap(
  TObject({name: TString, age: TInt}),
  (old) => new Example(old.name, old.age),
  (_new) => ({ name: _new.name, age: _new.age })
);

test('Map validates based on underlying validation', () => {
  // compiled into single test, since if individual components of these are failing
  // it is likely just an issue with TObject
  expect(TExample.valid({})).toBe(false);
  expect(TExample.valid({name: 'hello'})).toBe(false);
  expect(TExample.valid({name: 'hello', age: 'world'})).toBe(false);
  expect(TExample.valid({name: 'hello', age: 3})).toBe(true);
});

test('Map converts to transit object of underlying type', () => {
  const transit = TExample.toTransit(new Example('hello', 3));

  expect(Object.keys(transit)).toHaveLength(2);
  expect(transit).toHaveProperty('name');
  expect(transit.name).toBe('hello');
  expect(transit).toHaveProperty('age');
  expect(transit.age).toBe(3);
});

test('Transit objects get mapped to map type', () => {
  const model = TExample.toModel({name: 'hello', age: 3});

  expect(model).toBeInstanceOf(Example);
  expect(model.name).toBe('hello');
  expect(model.age).toBe(3);
});

