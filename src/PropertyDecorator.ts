export function PropertyDecorator(target: any, propertyKey: string) {
    'use strict';

    if (!target.$$subscribers) {
        target.$$subscribers = {};
    }

    target.$$subscribers[propertyKey] = [];

    let descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

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
        target.$$subscribers[propertyKey].forEach(cb => {
            cb(newValue);
        });

        oldSet.call(this, newValue);
    };

    Object.defineProperty(target, propertyKey, descriptor);
}
