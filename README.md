# TSPlate

A lightweight but powerful typescript template validation library

## Installation

```
npm install tsplate
```

## Why TSPlate?

Unifies the definition of model types with model validation, with easy support for custom validation rules. Ontop of this it is extremely lightweight, with no dependencies and a package size of just 2.3kb.

It can easily be added to an existing project using the class template interface (`T.Class`)

## Documentation

For a brief of the What, Why & How of TSPlate, take a look at [the documentation](./docs/introduction.md)

## Examples

You can run any of these examples by cloning this repo any using `npm run example [filename].js`. See the `examples` folder for filenames. For example, `npm run example basic-validation.js`.

### Validating a class using decorators

```ts
import T from 'tsplate';

// this function type checks each of the input strings mathches a propertery on the class
// and also type checks that the number of input strings matches the number of arguments in the constructor
@T.constructor('name', 'age');
class Example {
    // this function type checks the template type against the property type
    @T.template(T.String)
    public name: string;

    @T.template(T.Int)
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// TExample has type Template<Example, any>
// The class will transit as an object {name: string, age: number}
const TExample = T.AutoClass(Example);
```

### Validating a class using the class template generator

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

// TExample has type Template<Example, any>
// second parameter defines the instance keys and templates for constructor parameters
// the true transit type of this template would be {name: string, age: number}
const TExample = T.Class(Example, [['name', T.String], ['age', T.Int]]);


// the constructor properties are type checked against their templates
// e.g., the following will highlight a type error on ['age', T.String]
const TExample2 = T.Class(Example, [['name', T.String], ['age', T.String]]);
```

### Validating JSON

```ts
import T from 'tsplate';

// TColour has type Template<'red' | 'blue' | 'green', string>
const TColour = T.Enum('red', 'blue', 'green');

// TPerson has type Template<{name: string, age: number}, {name: string, age: number}> 
const TPerson = T.Object({
    name: T.String,
    age: T.Int
});

// TCar has type Template<{name: string, colour: 'red' | 'blue' | 'green', passengers: {name: string, age: number}[]}, ...> 
// (here ... will be the same as the first type argument)
const TCar = T.Object({
    name: T.String,
    colour: TColour,
    passengers: T.Array(TPerson)
});

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

const TName: Template<Name, string> = {
    valid: T.String.valid,
    toModel: (o: string) => new Name(o),
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