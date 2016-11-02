export function PropertyDecorator(target: any, propertyKey: string) {
    'use strict';

    let descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey),
        subscribers = [];

    if (!descriptor) {
        descriptor = {
            configurable: true
        };
    }

    if (!descriptor.get) {
        let backingField;

        descriptor.get = function(): any {
            return backingField;
        };

        descriptor.set = function(newValue: any): void {
            backingField = newValue;
        };
    }

    let oldSet: (newValue: any) => void = descriptor.set;

    descriptor.set = function(newValue: any): void {
        subscribers.forEach(cb => {
            cb(newValue);
        });

        oldSet.call(this, newValue);
    };

    if (!target.$subscribe) {
        target.$subscribe = {};
    }

    target.$subscribe[propertyKey] = function (cb) {
        subscribers.push(cb);

        return () => {
            subscribers.slice(subscribers.indexOf(cb), 1);
        };
    };

    Object.defineProperty(target, propertyKey, descriptor);
}
