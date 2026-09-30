import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para marcar métodos que deben loguear entrada/salida
 * @example
 * @Log('Creating user')
 * createUser(data) { ... }
 */
export const Log = (message: string) =>
  SetMetadata('log_message', message);