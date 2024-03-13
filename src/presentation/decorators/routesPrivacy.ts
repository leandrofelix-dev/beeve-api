// Arquivo: decorators.ts
import 'reflect-metadata'

function AuthRequired(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  Reflect.defineMetadata('authRequired', true, target, propertyKey)
}

export { AuthRequired }
