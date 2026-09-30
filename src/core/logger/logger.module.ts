import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

/**
 * LoggerModule
 * Módulo global que exporta LoggerService
 * Disponible en toda la aplicación sin necesidad de imports
 */
@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}