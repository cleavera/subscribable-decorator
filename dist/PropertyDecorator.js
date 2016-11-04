function PropertyDecorator(target, propertyKey) {
    'use strict';
    if (!target.$$subscribers) {
        target.$$subscribers = {};
    }
    target.$$subscribers[propertyKey] = [];
    var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    if (!descriptor) {
        descriptor = {
            configurable: true
        };
    }
    if (!descriptor.get) {
        var backingField;
        descriptor.get = function () {
            return backingField;
        };
        descriptor.set = function (newValue) {
            backingField = newValue;
        };
    }
    var oldSet = descriptor.set;
    descriptor.set = function (newValue) {
        target.$$subscribers[propertyKey].forEach(function (cb) {
            cb(newValue);
        });
        oldSet.call(this, newValue);
    };
    Object.defineProperty(target, propertyKey, descriptor);
}
exports.PropertyDecorator = PropertyDecorator;
