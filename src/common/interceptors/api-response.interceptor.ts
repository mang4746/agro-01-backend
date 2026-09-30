import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../responses';

type RequestWithTrace = {
  id?: string;
  requestId?: string;
  originalUrl?: string;
  path?: string;
};

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithTrace>();

    return next.handle().pipe(
      map((response: ApiResponse | unknown) => {
        if (!this.isApiResponse(response)) {
          return response;
        }

        response.meta.path = request.originalUrl || request.path || '';
        response.meta.requestId = request.id || request.requestId || '';

        return response;
      }),
    );
  }

  private isApiResponse(response: unknown): response is ApiResponse {
    if (!response || typeof response !== 'object') {
      return false;
    }

    const candidate = response as Partial<ApiResponse>;
    return !!candidate.meta && typeof candidate.meta === 'object';
  }
}