"use strict";
var MethodDecorator_1 = require('./MethodDecorator');
var PropertyDecorator_1 = require('./PropertyDecorator');
function Subscribable(target, propertyKey, descriptor) {
    if (descriptor) {
        MethodDecorator_1.MethodDecorator(target, propertyKey, descriptor);
    }
    else {
        PropertyDecorator_1.PropertyDecorator(target, propertyKey);
    }
}
exports.Subscribable = Subscribable;
