
# Arrays

The array template accepts any other template type and produces a template which expects the model and transit to be an array of the underlying types.

```ts
const TStringArray: Template<string[], string[]> = T.Array(T.String);
```

Since template is a generic interface, this will work with any template, however complex or simple. This is true for all template composition methods.

### [Next - Enums →](./enums.md)
### [← Previous - Basic types](../basic-types.md)
### [← Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)