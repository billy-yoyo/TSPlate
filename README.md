# TSPlate

A lightweight but powerful typescript template validation library

## Installation

```
npm install tsplate
```

## Why TSPlate?

Unifies the definition of model types with model validation, with easy support for custom validation rules

## A simple example

```ts
import T from 'tsplate';

const TColour = T.Enum
    .add('red')
    .add('blue')
    .add('white')
    .add('black')
    .add('grey');

const TPerson = T.Object
    .add('name', T.String)
    .add('age', T.Int);

const TCar = T.Object
    .add('name', T.String)
    .add('colour', TColour)
    .add('passengers', T.Array(TPerson));

const data = JSON.parse(`
{
    "name": "mini",
    "colour": "red",
    "passengers": [
        {"name": "bob", "age": 23},
        {"name": "bill", "age": 43}
    ]
}
`);

if (TCar.valid(data)) {
    const car = TCar.toModel(data);

    // car will now also have the appropriate type
    console.log(car.name);
    console.log(car.red);
    car.passengers.forEach(person => {
        console.log(`name: ${person.name}, age: ${person.age}`)
    });
}
```
