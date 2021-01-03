
# TSPlate

## What is TSPlate

TSPlate is a templating engine. At its core, it is simply the following interface

```ts
interface Template<M, T> {
  valid: (o: any) => o is T;
  toModel: (o: T) => M;
  toTransit: (t: M) => T;
}
```

Everything else in this library is either a pre-defined template, or a helper function to create templates. This approach to templates is not new or radical, but it is simple and effective. The value TSPlate provides is in the API the helper functions give in creating type-safe models.

## What do I use TSPlate for?

TSPlate acts as a templating engine to validate transit objects (e.g. JSON data) and convert that into your internal models (e.g. Classes). It is build completely agnostic of a specific implementation, and simply focuses on giving a clean interface to assert types and properties.

Some example use cases:

* An API validating JSON in request bodies, and formatting models as JSON in response bodies

* Providing a relation between Database objects and internal models

* Converting between two models to air-gap portions of your project (e.g. API vs Service models).

## Adding TSPlate to an existing project

TSPlate is very implementation agnostic. It can be easily slotted into many different scenarios and doesn't try and force a certain pattern of templating on the user. It is lighweight, easy to use and flexible.

It also doesn't come with any dependancies, with TSPlate what-you-see-is-what-you-get. The package size is just a few KB and plans to stay that way. 

## Index

1. [Introduction](./introduction.md)
2. [Understanding templates](./understanding-templates.md)
3. [Creating a basic template](./creating-a-basic-template.md)
4. [Built-in templates](./built-in-templates.md)
    1. [Basic types](./templates/basic-types.md)
    2. [Arrays](./templates/arrays.md)
    3. [Enums](./templates/enums.md)
    4. [Objects](./templates/objects.md)
    5. [Classes](./templates/classes.md)
    6. [Map](./templates/map.md)
5. [Examples](./examples.md)

### [Next - Understanding templates →](./understanding-templates.md)
### [← Home](./introduction.md)