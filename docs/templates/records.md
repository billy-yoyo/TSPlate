
# Records

Records also represent a JS object, but rather than defining key/value pairs, you define a type for *all* keys, and a type for *all* values

```ts
const TOccurances = T.Record(T.String, T.Int);
```

The validation of the object will assert that every property must satisfy the key template, and every value must satisfy the value template. So this template is roughly equivalent to the type `{[key: string]: number}`. Records are defined as partial, so if you use an enum as the key template, it doesn't require that every value of the enum is defined within the record.

### [Next - Helper functions →](./helper.md)
### [← Previous - Classes](./classes.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)