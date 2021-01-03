
# Objects

Objects represent a JS object, and are constructed by mapping keys to their templates

```ts
const TPerson = T.Object({
    name: T.String,
    age: T.Int,
    data: T.Array(T.String)
});
```

The validation of the object will assert that every property must be present, and must match its underlying template's validation. You can also define optional properties using the `T.Optional` helper method

```ts
const TPerson = T.Object({
    name: T.String,
    age: T.Optional(T.Int),
    data: T.Array(T.String)
});
```

Now `{"name": "example", "data": []}` and `{"name": "example": "age": 3, "data": []}` will both validate, whereas before only the second one would.

### [Next - Classes →](./classes.md)
### [← Previous - Enums](../enums.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)