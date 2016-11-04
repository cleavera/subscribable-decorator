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
function Subscribe(instance, propertyKey, cb) {
    if (!instance.$$subscribers || !instance.$$subscribers.hasOwnProperty(propertyKey)) {
        throw new Error('This property is not subscribable');
    }
    instance.$$subscribers[propertyKey].push(cb);
}
exports.Subscribe = Subscribe;
