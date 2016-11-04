# Subscribable typescript decorator

This package provides decorators for typescript that allow properties and methods to be subscribed to.

# Example

See the example/Example.ts for a working example. ```npm run example```

```
import {Subscribable, Subscribe} from 'subscribable-decorator';

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
// Outputs: [ true ], [ 'The returned value', [ 'Argument1', 'Argument2' ] ]

example.bool = false;
// Outputs: [ false ]

```