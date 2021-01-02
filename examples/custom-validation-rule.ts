import T, { Template } from '../src';

class Name {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const TName: Template<Name> = {
    valid: T.String.valid,
    toModel: (o: any) => new Name(o),
    toTransit: (name: Name) => name.name
};

const transit = 'example';
if (TName.valid(transit)) {
    const name: Name = TName.toModel(transit);

    console.log(name.name); // 'example'

    const nameTransit: string = TName.toTransit(name);

    console.log(nameTransit); // 'example'
}