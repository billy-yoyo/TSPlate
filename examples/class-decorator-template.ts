import T from '../src';

// this function type checks each of the input strings mathches a propertery on the class
// and also type checks that the number of input strings matches the number of arguments in the constructor
@T.constructor('name', 'age')
class Example {
    // this function type checks the template type against the property type
    @T.template(T.String)
    public name: string;

    @T.template(T.Int)
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// TExample has type Template<Example, any>
// The class will transit as an object {name: string, age: number}
const TExample = T.AutoClass(Example);