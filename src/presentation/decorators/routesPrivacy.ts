import 'reflect-metadata'

function Public(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  Reflect.defineMetadata('public', true, target, propertyKey)
}

function Private(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  Reflect.defineMetadata('private', true, target, propertyKey)
}

export { Public, Private }
