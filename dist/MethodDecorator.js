function MethodDecorator(target, propertyKey, descriptor) {
    'use strict';
    if (!target.$$subscribers) {
        target.$$subscribers = {};
    }
    target.$$subscribers[propertyKey] = [];
    var originalMethod = descriptor.value;
    descriptor.configurable = true;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var returnValue;
        try {
            returnValue = originalMethod.apply(this, args);
            target.$$subscribers[propertyKey].forEach(function (cb) {
                cb(returnValue, args);
            });
        }
        catch (e) {
            target.$$subscribers[propertyKey].forEach(function (cb) {
                cb(e, args);
            });
            throw e;
        }
        return returnValue;
    };
    descriptor.configurable = false;
}
exports.MethodDecorator = MethodDecorator;
