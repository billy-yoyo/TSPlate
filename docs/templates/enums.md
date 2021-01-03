
# Enums

The template enum is an extension of the string enum which only accepts a finite list of strings

```ts
const TColours: Template<'red' | 'blue' | 'green', string> = T.Enum('red', 'blue', 'green');
```

This template generates the model type based on the arguments, so for example the following call will highlight a type error

```ts
const transit = TColours.toTransit('yellow'); // will highlight error 'yellow' doesn't match type 'red' | 'blue' | 'green'
```

### [Next - Objects →](./objects.md)
### [← Previous - Arrays](../arrays.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)