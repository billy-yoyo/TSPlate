import T, { Template } from '../src';

interface Store {
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
}

class TemplateStore<T> {
    private store: Store;
    private template: Template<T>;
    private prefix: string;

    constructor(store: Store, template: Template<T>, prefix: string) {
        this.store = store;
        this.template = template;
        this.prefix = prefix;
    }

    async get(key: string): Promise<T> {
        const value = await this.store.get(this.prefix + key);
        const transit = JSON.parse(value);

        if (this.template.valid(transit)) {
            return this.template.toModel(transit);
        }
    }

    async set(key: string, model: T): Promise<void> {
        const transit = this.template.toTransit(model);
        await this.store.set(this.prefix + key, JSON.stringify(transit));
    }
}

class Person {
    public id: string;
    public name: string;
    public age: number;

    constructor(id: string, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

const TPerson = T.Class(Person)
    .add('id', T.String)
    .add('name', T.String)
    .add('age', T.Int)
    .build();

const store = {} as Store;
const personStore = new TemplateStore<Person>(store, TPerson, 'person/');

async function example() {
    const person: Person = new Person('123', 'name', 3);
    await personStore.set(person.id, person);

    const fetched: Person = await personStore.get('123');
    fetched.age += 1;
    await personStore.set(fetched.id, fetched);
}