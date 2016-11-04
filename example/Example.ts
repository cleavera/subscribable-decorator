import {Subscribable, Subscribe} from '../dist/index';

class ExampleClass {
    constructor() {
        this.bool = false;
    }

    @Subscribable
    public bool: boolean;

    @Subscribable
    public setBoolTrue(myArg: string, anotherArg: string): string {
        this.bool = true;

        return 'The returned value';
    }
}

var example = new ExampleClass();

Subscribe(example, 'bool', (...args) => {
    console.log(args);
});

Subscribe(example, 'setBoolTrue', (...args) => {
    console.log(args);
});

example.setBoolTrue('Argument1', 'Argument2');

example.bool = false;