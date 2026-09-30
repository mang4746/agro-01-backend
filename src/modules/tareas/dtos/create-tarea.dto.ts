import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TareaEstado, TareaPrioridad } from '../entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FlexibleDate } from '@/common/decorators';

export class CreateTareaDto {
  @ApiProperty({ description: 'Título de la tarea', example: 'Implementar autenticación', maxLength: 150, })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo!: string;

  @ApiPropertyOptional({ description: 'Descripción detallada de la tarea', example: 'Agregar autenticación mediante JWT para los usuarios.', maxLength: 500, })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Estado actual de la tarea', enum: TareaEstado, example: TareaEstado.PENDIENTE, default: TareaEstado.PENDIENTE, })
  @IsOptional()
  @IsEnum(TareaEstado)
  estado?: TareaEstado;

  @ApiPropertyOptional({ description: 'Nivel de prioridad de la tarea', enum: TareaPrioridad, example: TareaPrioridad.ALTA, default: TareaPrioridad.MEDIA, })
  @IsOptional()
  @IsEnum(TareaPrioridad)
  prioridad?: TareaPrioridad;

  @ApiPropertyOptional({ description: 'Fecha límite para completar la tarea', example: '2026-10-15', format: 'date', })
  @IsOptional()
  @FlexibleDate()
  fechaVencimiento?: Date | null;
}