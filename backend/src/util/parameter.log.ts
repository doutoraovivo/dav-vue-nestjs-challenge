import { inspect } from 'util';
import Debug from 'debug';

export function ParameterLog() {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    //wrapping the original method
    descriptor.value = function (...args: any[]) {
      const debug = Debug((this as any).dbname || `${target.constructor.name}`);
      debug(
        `${propertyKey.toString()}`,
        inspect(args, false, 2),
      );
      return method.apply(this, args);
    };
  };
}
