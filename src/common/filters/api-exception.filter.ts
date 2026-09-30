import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Messages } from '../constants';
import { ApiError, ApiResponseFactory, FieldError } from '../responses';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ApiExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const requestId = request.id || `req-${Date.now()}`;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = Messages.EXCEPTION_INTERNAL_SERVER_ERROR;
    let errors: FieldError[] | ApiError | null = null;

    // Manejo de excepciones HTTP
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      // Caso: class-validator (array de errores)
      if (Array.isArray(exceptionResponse.message)) {
        errors = exceptionResponse.message.map((err: any) => ({
          field: err.property || 'unknown',
          type: String(Object.keys(err.constraints)[0]),
          message: Object.values(err.constraints)[0] as string,
          constraints: err.constraints,
        }));
        message = Messages.EXCEPTION_BAD_REQUEST;
      }
      // Caso: Error personalizado con código
      else if (typeof exceptionResponse === 'object' && exceptionResponse.code) {
        errors = {
          code: exceptionResponse.code,
          message: exceptionResponse.message,
          field: exceptionResponse.field,
        };
        message = exceptionResponse.message;
      }
      // Caso: string simple
      else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
      // Caso: objeto estándar
      else {
        message = exceptionResponse.message || message;
      }

      // Normalizar mensaje por status usando constantes
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          if (errors) message = Messages.EXCEPTION_BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          message = Messages.EXCEPTION_UNAUTHORIZED;
          errors = null;
          break;
        case HttpStatus.FORBIDDEN:
          message = Messages.EXCEPTION_FORBIDDEN;
          errors = null;
          break;
        case HttpStatus.NOT_FOUND:
          message = Messages.EXCEPTION_NOT_FOUND;
          errors = null;
          break;
        case HttpStatus.CONFLICT:
          // Para conflictos, mantener el mensaje original si existe
          if (!message || message === 'Error') {
            message = 'Recurso en conflicto';
          }
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          message = Messages.EXCEPTION_INTERNAL_SERVER_ERROR;
          errors = null;
          break;
      }
    } else {
      this.logger.error('Unhandled exception:', exception);
      message = Messages.EXCEPTION_INTERNAL_SERVER_ERROR;
    }

    const apiResponse = ApiResponseFactory.error({
      message,
      code: status,
      errors,
    });

    apiResponse.meta.requestId = requestId;
    apiResponse.meta.path = request.path;

    response.status(status).json(apiResponse);
  }
}