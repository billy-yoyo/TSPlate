
# Classes

TSPlate currently provides two interfaces for defining template classes. Both of these result in the same implementation of the interface, they're simply two ways of defining the same thing. A class template works by mapping instance properties to JS object properties in a transit, and then by mapping JS object properties in a transit to arguments in the class constructor.

The first interface for defining a class template is 

```ts
class Example {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const TExample: Template<Example, any> = T.Class(Example, [['name', T.String], ['age', T.Int]]);
```

Here the `T.Class` method accepts two parameters, the first is the class you want to create a template for, the second defines the mapping for the object. For example `['name', T.String]` says that we should map the `name` property on an instance of `Example` to the `name` property on the transit object. It then says we should map the `name` property on the transit to the 1st argument of the `Example` constructor. And it says that all these mappings should be done via the `T.String` template. It is worth noting that this class function is fully type checks, and if for example you specified `['age', T.String]` it would recognize that `T.String` doesn't match `age: number` in the constructor and through an error. It also checks the property names against the defined properties on the class, so if you specified `['other', T.String]` it would recognize that the property `other` doesn't exist on type `Example`.

So to make that a bit clearer, lets first look at exactly how a transit would get converted to a class:

```ts
const transit = {name: 'example', age: 3};
// now we map the transit into the constructor args
const constructorArgs = [T.String.toModel(transit.name), T.Int.toModel(transit.age)];
// now we create our model using these contructor args
const model = new Example(...constructorArgs);
```

Then lets look at how a class instance would get converted into a transit

```ts
const model = new Example('example', 3);
// now we would map `model.name` and `model.age` to the transit
const transit = { name: model.name, age: model.age };
```

This interface is very short, but it is a bit disconnected. It is not necessarily clear from the code what the second parameter of `T.Class` is defining. This interface should be used if you don't have control over the class you're templating, or want to leave the class alone. The second interface integrates the definition of the template into the definition of the class using decorators

```ts
@T.constructor('name', 'arg')
class Example {
    @T.template(T.String)
    public name: string;

    @T.template(T.Int)
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const TExample = T.AutoClass(Example);
```

Here, as with `T.Class`, the decorators are also fully type checked. the `constructor` decorator will highlight a type error if the number of arguments it receives doesn't match the number of arguments in the constructor of the class, and it will also highlight a type error if any of the individual arguments doesn't match a property on the class instances. So in this example `@T.constructor('name', 'arg', 'name')` would error for too many arguments and `@T.constructor('name', 'other')` would error because `other` doesn't match any property on `Example`. Similarly the `template` constructor will type check against the properties type, so

```ts
    @T.template(T.Int)
    public name: string; // here an type error would be highlighted since template Template<number, number> doesn't match type string
```

This way of defining classes via decorators is more verbose about what each argument you're specifying relates to, so it's easier to understand the template just by reading it. 

There is a third way of defining class templates too, by defining the mapping yourself using `T.Map`. More about it in the next section.

### [Next - Records →](./records.md)
### [← Previous - Objects](../objects.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)