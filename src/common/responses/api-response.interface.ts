import { PaginationDto } from '../dto';

// Validated vs Canonical field error structure
export interface FieldError {
  field: string;           // Nombre del campo
  type: string;            // Tipo de error (email, minLength, etc)
  message: string;         // Mensaje legible
  value?: any;             // Valor rechazado (opcional)
  constraints?: Record<string, string>; // Detalles adicionales
}

export interface ApiError {
  code?: string;           // Código de error (DUPLICATE_EMAIL)
  message: string;         // Mensaje principal
  field?: string;          // Campo afectado (si aplica)
  details?: Record<string, any>; // Detalles contextuales
}

export interface ApiMeta {
  timestamp: string;       // ISO 8601
  path: string;            // Ruta del request
  requestId: string;       // Correlativo para logs
  pagination?: PaginationDto; // Paginación (opcional)
}

export interface ApiResponseOptions<T> {
  data?: T | null;
  message?: string;
  code?: number;
  pagination?: PaginationDto;
}

export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  errors: FieldError[] | ApiError | null;
  meta: ApiMeta;
}