
# Understanding Templates

## Models and Transits

Templates are interfaces which can help convert between 'models' and 'transits', and also can validate whether a transit matches a model. 

A model represents the internal representation of the data within a portion of your code. For example, a request body class. Models are assumed to be typesafe.

A transit represents a transportable representation of the data. For example, a JS object (which can in turn by converted to a JSON object). Transits are assumed to be non-typesafe, and so are untrusted by default. This means templates must be equipped with some way of validating transits.

## Definition of a template

A template defines three properties (here `M` is the type of your model)

* `valid(transit: any): boolean` - a function which checks whether a given transit matches the template
* `toModel(transit: any): M` - a function which will transform a transit into a model
* `toTransit(model: M): any` - a function which will transform a model into a transit


