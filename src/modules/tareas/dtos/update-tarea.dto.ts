import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TareaEstado, TareaPrioridad } from '../entities';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FlexibleDate } from '@/common/decorators';

export class UpdateTareaDto {
  @ApiPropertyOptional({ description: 'Nuevo título de la tarea', example: 'Actualizar CRUD de tareas', maxLength: 150, })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo?: string;

  @ApiPropertyOptional({ description: 'Nueva descripción de la tarea', example: 'Actualizar la documentación y validaciones del módulo.', maxLength: 500, })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Nuevo estado de la tarea', enum: TareaEstado, example: TareaEstado.EN_PROGRESO, })
  @IsOptional()
  @IsEnum(TareaEstado)
  estado?: TareaEstado;

  @ApiPropertyOptional({ description: 'Nueva prioridad de la tarea', enum: TareaPrioridad, example: TareaPrioridad.ALTA, })
  @IsOptional()
  @IsEnum(TareaPrioridad)
  prioridad?: TareaPrioridad;

  @ApiPropertyOptional({ description: 'Nueva fecha límite para completar la tarea', example: '2026-10-20', format: 'date', })
  @IsOptional()
  @FlexibleDate()
  fechaVencimiento?: Date | null;
}