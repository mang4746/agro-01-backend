import { HttpStatus } from '@nestjs/common';
import { ApiError, ApiMeta, ApiResponse, ApiResponseOptions, FieldError } from './api-response.interface';

export class ApiResponseFactory {

  /**
   * Respuesta exitosa
   */
  static success<T>({
    data = null,
    message = 'OK',
    code = HttpStatus.OK,
    pagination = undefined,
  }: ApiResponseOptions<T>): ApiResponse<T> {

    const meta: ApiMeta = {
      timestamp: new Date().toISOString(),
      path: '', // Se completa en interceptor
      requestId: '', // Se completa en middleware
    };

    if (pagination) {
      meta.pagination = pagination;
    }

    return {
      success: true,
      code,
      message,
      data,
      errors: null,
      meta,
    };
  }

  /**
   * Respuesta de error
   */
  static error({
    message = 'Error',
    code = HttpStatus.BAD_REQUEST,
    errors = null,
  }: {
    message?: string;
    code?: number;
    errors?: FieldError[] | ApiError | null;
  }): ApiResponse {

    return {
      success: false,
      code,
      message,
      data: null,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
        path: '',
        requestId: '',
      },
    };
  }
}