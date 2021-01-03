
# Basic Types

The basic type templates act primarily as identity templates which simply validate the type of a transit. They are:

1. `T.String : Template<string, string>`
2. `T.Float : Template<number, number>`
3.` T.Int : Template<number, number>` - this also has the extra validation of ensuring the number is an integer
4. `T.Boolean : Template<boolean, boolean>`
5. `T.Void : Template<void, void>` - this is a template which never validates

These are generally the foundational types of any template, and are generally derived from the basic types of JSON.

### [Next - Arrays →](./arrays.md)
### [← Previous - Built in templates](../built-in-templates.md)
### [🏠 Home](../introduction.md)