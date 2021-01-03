
# Understanding Templates

## Models and Transits

Templates are interfaces which can help convert between 'models' and 'transits', and also can validate whether a transit matches a model. 

A model represents the internal representation of the data within a portion of your code. For example, a request body class. Models are assumed to be typesafe and trusted by default.

A transit represents a transportable representation of the data. For example, a JS object (which can in turn by converted to a JSON object). Transits are assumed to be non-typesafe, and so are untrusted by default. This means templates must be equipped with some way of validating transits.

## Definition of a template

A template defines three properties (here `M` is the type of your model and `T` is the type of your transit)

* `valid(transit: any): transit is T` - a function which checks whether a given transit matches the template
* `toModel(transit: T): M` - a function which will transform a transit into a model
* `toTransit(model: M): T` - a function which will transform a model into a transit

## Some examples of templates

* `T.String` is one of the most basic functionally useful templates we have. It serves simply as a string identity. Its validator validates that it is a string, and `toModel` and `toTransit` are simply identity functions.

* `T.Int` is slightly more interesting. Its `toModel` and `toTransit` functions are also identities, however its `valid` not only ensures the transit is a number, but also that it's an integer.

* `T.Class` is much more complicated. It will use a class's constructor and its properties to convert between a class instance (our model) and a JS object representation of the class.

For more examples of templates you can see the [Build in templates section](./build-in-templates.md)

### [Next - Creating a basic template →](./creating-a-basic-template.md)
### [← Previous - Introduction](./introduction.md)
### [🏠 Home](./introduction.md)