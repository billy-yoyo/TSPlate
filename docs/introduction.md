
# TSPlate

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

1. [Understanding templates](./understanding-templates.md)
2. [Creating a basic template](./creating-a-basic-template.md)
3. [Built-in templates](./built-in-templates.md)
    1. [Basic types](./templates/basic-types.md)
    2. [Arrays](./templates/arrays.md)
    3. [Enums](./templates/enums.md)
    4. [Objects](./templates/objects.md)
    5. [Classes](./templates/classes.md)
    6. [Map](./templates/map.md)


### [Next - Understanding templates →](./understanding-templates.md)
### [← Home](./introduction.md)