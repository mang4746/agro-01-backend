
export class PaginationDto {
  total: number;         // total de registros
  per_page: number;      // registros por página
  current_page: number;  // página actual
  last_page: number;     // total de páginas
  from: number;          // índice inicial
  to: number;            // índice final
}