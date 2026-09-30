import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import pino from 'pino';
import { createPinoLogger } from './logger.config';

export interface LogMetadata {
  [key: string]: any;
  userId?: string;
  email?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  error?: string;
}

/**
 * LoggerService - Implementa NestJS LoggerService + Pino
 */
@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: pino.Logger;
  private context: string = 'App';

  constructor(private readonly configService: ConfigService) {
    const logLevel = this.configService.get<string>('LOG_LEVEL', 'info');
    this.logger = createPinoLogger(logLevel);
  }

  /**
   * ===== MÉTODOS REQUERIDOS POR NestLoggerService =====
   * Llamados automáticamente por NestJS
   */

  log(message: any, context?: string): void {
    const ctx = context || this.context;
    const msg = String(message || '');
    // Pasar como segundo argumento para que pino lo use como "msg"
    this.logger.info({ context: ctx }, msg);
  }

  error(message: any, stack?: string, context?: string): void {
    const ctx = context || this.context;
    const msg = String(message || '');
    this.logger.error(
      { context: ctx, stack },
      msg,
    );
  }

  warn(message: any, context?: string): void {
    const ctx = context || this.context;
    const msg = String(message || '');
    this.logger.warn({ context: ctx }, msg);
  }

  debug(message: any, context?: string): void {
    const ctx = context || this.context;
    const msg = String(message || '');
    this.logger.debug({ context: ctx }, msg);
  }

  verbose(message: any, context?: string): void {
    const ctx = context || this.context;
    const msg = String(message || '');
    this.logger.trace({ context: ctx }, msg);
  }

  /**
   * ===== MÉTODOS PERSONALIZADOS =====
   * Para uso en servicios y controladores
   */

  info(message: string, metadata?: LogMetadata): void {
    const msg = String(message || '');
    this.logger.info(this.formatMetadata(metadata), msg);
  }

  logRequest(
    method: string,
    path: string,
    metadata?: LogMetadata,
  ): void {
    const msg = `${method} ${path}`;
    this.logger.info(
      {
        type: 'request_in',
        method,
        path,
        ...this.formatMetadata(metadata),
      },
      msg,
    );
  }

  logResponse(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    metadata?: LogMetadata,
  ): void {
    const msg = `${method} ${path} - ${statusCode}`;
    const level = statusCode >= 400 ? 'warn' : 'info';
    const logFn = level === 'warn' 
      ? this.logger.warn.bind(this.logger) 
      : this.logger.info.bind(this.logger);

    logFn(
      {
        type: 'request_out',
        method,
        path,
        statusCode,
        duration,
        ...this.formatMetadata(metadata),
      },
      msg,
    );
  }

  private formatMetadata(metadata?: LogMetadata): LogMetadata {
    if (!metadata) {
      return {};
    }

    return {
      ...metadata,
      timestamp: new Date().toISOString(),
    };
  }

  getLogger(): pino.Logger {
    return this.logger;
  }
}