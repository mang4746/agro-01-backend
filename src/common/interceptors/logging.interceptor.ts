import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from 'src/core/logger';

/**
 * LoggingInterceptor
 * 
 * Responsabilidad: Loguear el ciclo de vida completo de requests
 * - Entrada del request
 * - Salida con status y duración
 * - Errores con stack trace
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path, headers } = request;
    const startTime = Date.now();

    // Log de entrada
    this.logger.logRequest(method, path, {
      userAgent: headers['user-agent'],
      ip: request.ip,
      requestId: request.id,
    });

    return next.handle().pipe(
      tap((data) => {
        // Log de salida exitosa
        const duration = Date.now() - startTime;
        const response = context.switchToHttp().getResponse();
        this.logger.logResponse(
          method,
          path,
          response.statusCode,
          duration,
          {
            userAgent: headers['user-agent'],
            ip: request.ip,
          },
        );
      }),
      catchError((error) => {
        // Log de error
        const duration = Date.now() - startTime;
        this.logger.error(
          `${method} ${path}`,
          error,
          `Unhandled error (${duration}ms)`,
        );
        throw error;
      }),
    );
  }
}