"use strict";
function MethodDecorator(target, propertyKey, descriptor) {
    'use strict';
    var originalMethod = descriptor.value, subscribers = [];
    descriptor.configurable = true;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var returnValue;
        try {
            returnValue = originalMethod.apply(this, args);
            subscribers.forEach(function (cb) {
                cb(returnValue, args);
            });
        }
        catch (e) {
            subscribers.forEach(function (cb) {
                cb(e, args);
            });
            throw e;
        }
        return returnValue;
    };
    descriptor.value.$subscribe = function (cb) {
        subscribers.push(cb);
        return function () {
            subscribers.slice(subscribers.indexOf(cb), 1);
        };
    };
    descriptor.configurable = false;
}
exports.MethodDecorator = MethodDecorator;
