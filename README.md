# TSPlate

A lightweight but powerful typescript template validation library

## Installation

```
npm install tsplate
```

## Why TSPlate?

Unifies the definition of model types with model validation, with easy support for custom validation rules. Ontop of this it is extremely lightweight, with no dependencies and a package size of just 2.3kb.

It can easily be added to an existing project using the class template interface (`T.Class`)

## Examples


### Validating a class

```ts
import T from 'tsplate';

class Example {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// TExample has type Template<Example>
const TExample = T.Class(Example)
    // define the templates for the constructor properties
    // the string is the key within a class instance
    .add('name', T.String) 
    .add('age', T.Int)
    .build();


// the constructor properties are type checked against their templates
// e.g., the following will highlight a type error
const TExample2 = T.Class(Example)
    .add('name', T.String) // fine
    .add('age', T.String) // will throw an error because T.String doesn't match type number
    .build();
```


### Validating JSON

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
    console.log(car.name); // 'mini'
    console.log(car.colour); // 'red'
    car.passengers.forEach(person => {
        /* name: bob, age: 23
           name: bill, age: 43 */
        console.log(`name: ${person.name}, age: ${person.age}`)
    });
}
```

### Writing a custom template

```ts
import T, { Template } from 'tsplate';

class Name {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const TName: Template<Name> = {
    valid: T.String.valid,
    toModel: (o: any) => new Name(o),
    toTransit: (name: Name) => name.name
};

const transit = 'example';
if (TName.valid(transit)) {
    const name: Name = TName.toModel(transit);

    console.log(name.name); // 'example'

    const nameTransit: string = TName.toTransit(name);

    console.log(nameTransit); // 'example'
}
```

## License

MIT