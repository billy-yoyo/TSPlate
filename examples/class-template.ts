import T from '../src';

class Example {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// TExample has type Template<Example, any>
// second parameter defines the instance keys and templates for constructor parameters
// the true transit type of this template would be {name: string, age: number}
const TExample = T.Class(Example, [['name', T.String], ['age', T.Int]]);


// the constructor properties are type checked against their templates
// e.g., the following will highlight a type error on ['age', T.String]
// const TExample2 = T.Class(Example, [['name', T.String], ['age', T.String]]);