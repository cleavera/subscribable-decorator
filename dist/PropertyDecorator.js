"use strict";
function PropertyDecorator(target, propertyKey) {
    'use strict';
    var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey), subscribers = [];
    if (!descriptor) {
        descriptor = {
            configurable: true
        };
    }
    if (!descriptor.get) {
        var backingField_1;
        descriptor.get = function () {
            return backingField_1;
        };
        descriptor.set = function (newValue) {
            backingField_1 = newValue;
        };
    }
    var oldSet = descriptor.set;
    descriptor.set = function (newValue) {
        subscribers.forEach(function (cb) {
            cb(newValue);
        });
        oldSet.call(this, newValue);
    };
    if (!target.$subscribe) {
        target.$subscribe = {};
    }
    target.$subscribe[propertyKey] = function (cb) {
        subscribers.push(cb);
        return function () {
            subscribers.slice(subscribers.indexOf(cb), 1);
        };
    };
    Object.defineProperty(target, propertyKey, descriptor);
}
exports.PropertyDecorator = PropertyDecorator;
