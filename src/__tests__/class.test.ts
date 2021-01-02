import TClass from '../class';
import { TString, TInt } from '../basic';

class Example {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const TExample = TClass(Example)
  .add('name', TString)
  .add('age', TInt)
  .build();

test('Validates if all constructor properties are present and correct', () => {
  expect(TExample.valid({name: 'hello', age: 3})).toBe(true);
});

test('Doesn\'t validate if some constructor properties are missing', () => {
  expect(TExample.valid({name: 'hello'})).toBe(false);
});

test('Doesn\'t validate if constructor properties fail validation', () => {
  expect(TExample.valid({name: 'hello', age: 'world'})).toBe(false);
}); 

test('Class instances transit as objects with constructor parameter names', () => {
  const transit = TExample.toTransit(new Example('hello', 3));

  expect(Object.keys(transit)).toHaveLength(2);
  expect(transit).toHaveProperty('name');
  expect(transit.name).toBe('hello');
  expect(transit).toHaveProperty('age');
  expect(transit.age).toBe(3);
});

test('Transit objects will convert to instances of the class', () => {
  const model = TExample.toModel({name: 'hello', age: 3});

  expect(model).toBeInstanceOf(Example);
  expect(model.name).toBe('hello');
  expect(model.age).toBe(3);
});
