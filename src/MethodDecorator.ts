export function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    'use strict';

    let originalMethod = descriptor.value,
        subscribers = [];

    descriptor.configurable = true;

    descriptor.value = function(...args) {
        let returnValue;

        try {
            returnValue = originalMethod.apply(this, args);

            subscribers.forEach(cb => {
                cb(returnValue, args);
            });
        } catch(e) {
            subscribers.forEach(cb => {
                cb(e, args);
            });

            throw e;
        }

        return returnValue;
    };

    descriptor.value.$subscribe = function(cb): () => void {
        subscribers.push(cb);

        return () => {
            subscribers.slice(subscribers.indexOf(cb), 1);
        };
    };

    descriptor.configurable = false;
}
