import {MethodDecorator} from './MethodDecorator';
import {PropertyDecorator} from './PropertyDecorator';

export function Subscribable(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
        MethodDecorator(target, propertyKey, descriptor);
    } else {
        PropertyDecorator(target, propertyKey);
    }
}

export function Subscribe(instance: any, propertyKey: string, cb: (value: any, args?: [any]) => void) {
    if (!instance.hasOwnProperty('$$subscribers') || !instance.$$subscribers.hasOwnProperty(propertyKey)) {
        throw new Error('This property is not subscribable');
    }

    instance.$$subscribers[propertyKey].push(cb);
}