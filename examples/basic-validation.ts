import T from '../src';

const TColour = T.Enum('red', 'green', 'blue');

const TPerson = T.Object({
    name: T.String,
    age: T.Int
});

const TCar = T.Object({
    name: T.String,
    colour: TColour,
    passengers: T.Array(TPerson)
});

const data = JSON.parse(`
{
    "name": "mini",
    "colour": "red",
    "passengers": [
        {"name": "bob", "age": 23},
        {"name": "bill", "age": 43}
    ]
}
`);

if (TCar.valid(data)) {
    const car = TCar.toModel(data);

    // car will now also have the appropriate type
    console.log(car.name); // 'mini'
    console.log(car.colour); // 'red'
    car.passengers.forEach(person => {
        /* name: bob, age: 23
           name: bill, age: 43 */
        console.log(`name: ${person.name}, age: ${person.age}`)
    });
}