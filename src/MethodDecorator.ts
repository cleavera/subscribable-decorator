export function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    'use strict';

    if (!target.$$subscribers) {
        target.$$subscribers = {};
    }

    target.$$subscribers[propertyKey] = [];

    let originalMethod = descriptor.value;

    descriptor.configurable = true;

    descriptor.value = function(...args) {
        let returnValue;

        try {
            returnValue = originalMethod.apply(this, args);

            target.$$subscribers[propertyKey].forEach(cb => {
                cb(returnValue, args);
            });
        } catch(e) {
            target.$$subscribers[propertyKey].forEach(cb => {
                cb(e, args);
            });

            throw e;
        }

        return returnValue;
    };

    descriptor.configurable = false;
}
