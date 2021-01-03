
# Helper functions

TSPlate also provides a few helper functions for combining or mutating template types.

## T.Optional

The first of these we've already seen in [the objects section](./objects.md), `T.Optional`. This converts the type a template from `Template<M, T>` to `Template<M | undefined, T | undefined>`, and when used in `T.Object` or `T.Class` also makes a property optional. Its usage is simple:

```ts
const TMaybeString = T.Optional(T.String);
```

## T.Map

The next is one which helps map one model type to another, while using the same underlying transit type. Lets say you have the following class

```ts
class Example {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

and you want to create a tempalte of this class which maps it to a JS object with signature `{name: string, age: number}`. To do this using `T.Map` we would first define our JS object template

```ts
const TExampleTransit: Template<{name: string, age: number}, {name: string, age: number}> = T.Object({
    name: string,
    age: number
});
```

then we would define a mapping from this JS object template to a template with model type `Example`:

```ts
const TExample: Template<Example, {name: string, age: number}> = T.Map(
    TExampleTransit,
    (_old: {name: string, age: number}): Example => new Example(_old.name, _old.age),
    (_new: Example): {name: string, age: number} => ({name: _new.name, age: _new.age})
);
```

The arguments of map are:

1. The underlying template we want to map the model from
2. A method to convert the old model to our new one
3. A method to convert our new model to an old one

This could also be thought of as "extending" a template to a new model.

## T.Join

`T.Join` is very similar to `T.Map`, but links together two prexisting template rather than an existing one, for example

```ts
// existing templates 
const TExample: Template<Example, ExampleRequest>;
const TExampleRequest: Template<ExampleRequest, {name: string, age: number}>;

const TExampleData: Template<Example, {name: string, age: number}> = T.Join(TExample, TExampleRequest);
```

## T.Union

This helper function creates a union of two templates, which will validate if either template validates and will then appropriately pick which model to convert to depending on which template validated. It must also be equipped with a method of differentiating models so that it knows which template to use when creating a transit.

A basic example

```ts
const TStringOrInt: Template<string | number, string | number> = T.Union(
    T.String, 
    T.Int, 
    (m): m is string => typeof m === 'string'
);
```

Union works best when the types of the templates are disjoint, but there is no requirement for them to be so (it will prioritise using the first template given in the case where both templates match a model or transit).

### [Next - Examples →](../examples.md)
### [← Previous - Classes](../classes.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)