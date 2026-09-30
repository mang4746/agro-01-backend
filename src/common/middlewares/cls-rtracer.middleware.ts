import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Middleware que genera requestId único para cada request
 * (Si no lo proporciona el cliente)
 */
@Injectable()
export class ClsRtracerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    // Obtener requestId del header o generar uno nuevo
    const requestId =
      req.headers['x-request-id'] ||
      req.headers['x-trace-id'] ||
      `req-${uuidv4()}`;

    // Asignar al request
    req.id = requestId;
    req.requestId = requestId;

    // Incluir en headers de respuesta
    res.setHeader('X-Request-Id', requestId);

    next();
  }
}