import {MethodDecorator} from './MethodDecorator';
import {PropertyDecorator} from './PropertyDecorator';

export function Subscribable(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
        MethodDecorator(target, propertyKey, descriptor);
    } else {
        PropertyDecorator(target, propertyKey);
    }
}