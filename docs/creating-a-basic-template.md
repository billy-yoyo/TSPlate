
# Creating A Basic Template

## Our example case

Lets say we have the following class for storing ids

```ts
class RecordId {
    public id: string;
    constructor(id: string) {
        this.id = id;
    }
}
```

And lets say in transit, we simply want to store `RecordId`s as a string, to save space. So we have a model type of `RecordId` and a transit type of `string`, so we know how template will have this siganture

```ts
const TRecordId: Template<RecordId, string> = {

};
```

Now within this object we've begun to define, we need to add the `valid`, `toModel` and `toTransit` methods. First off, let's define `valid`
```ts
const TRecordId: Template<RecordId, string> = {
    valid: T.String.valid
};
```
Since we're transiting as a string, we can simply borrow `T.String`'s `valid` method. If we did want to define this by ourself, we would do `valid: (obj: any): obj is string => typeof obj === 'string'`.

Next we want to define `toModel`, which should map our transit object (a `string`) to our model (a `RecordId`).
```ts
const TRecordId: Template<RecordId, string> = {
    valid: T.String.valid,
    toModel: (id: string) => new RecordId(id)
};
```

Lastly we want to define `toTransit`, which should map our model (a `RecordId`) to our transit object (a `string`).
```ts
const TRecordId: Template<RecordId, string> = {
    valid: T.String.valid,
    toModel: (id: string) => new RecordId(id),
    toTransit: (recordId: RecordId) => recordId.id
};
```

We would then use this template like so
```ts
const data = JSON.parse("{id: 'an-id', data: ['a', 'b', 'c']}")
if (TRecordId.valid(data.id)) {
    const record: RecordId = TRecordId.toModel(data.id);
}

const transitRecord = TRecordId.toTransit(new RecordId('an-id'));
```

And with that we've finished defining our template. We can now safely use this template within any of our other templates too, for example (this is using the autoclass decorator syntax to define a template for a class, see [Classes](./templates/classes.md))
```ts
@T.constructor('id', 'data')
class Record {
    @T.template(TRecordId)
    public id: RecordId;
    
    @T.template(T.Array(T.String))
    public data: string[];

    constructor(id: RecordId, data: string[]) {
        this.id = id;
        this.data = data;
    }
}
```

### [Next - Built in templates →](./built-in-templates.md)
### [← Previous - Understanding templates](./understanding-templates.md)
### [🏠 Home](./introduction.md)