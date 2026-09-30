import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { FlexibleDate } from '@/common/decorators';

export class Agro01BaseDto {
  @ApiProperty({ example: 'XYZ' })
  @IsString()
  @IsNotEmpty()
  nombreCliente!: string;

  @ApiProperty({ example: 'PEREZ' })
  @IsString()
  @IsNotEmpty()
  primerApCliente!: string;

  @ApiProperty({ example: 'GOMEZ' })
  @IsString()
  @IsNotEmpty()
  segundoApCliente!: string;

  @ApiProperty({ example: 'CULTIVO DE FLORES Y PLANTAS ORNAMENTALES' })
  @IsString()
  @IsNotEmpty()
  actividad!: string;

  @ApiProperty({ example: 24 })
  @IsNumber()
  @Min(0)
  experienciaActividad!: number;

  @ApiProperty({ example: 'CASADO(A)' })
  @IsString()
  @IsNotEmpty()
  estadoCivil!: string;

  @ApiProperty({ example: 'SANTA CRUZ' })
  @IsString()
  @IsNotEmpty()
  deptoCliente!: string;

  @ApiProperty({ example: 'MONTERO' })
  @IsString()
  @IsNotEmpty()
  municipioCliente!: string;

  @ApiProperty({ example: 'MONTERO' })
  @IsString()
  @IsNotEmpty()
  localidadCliente!: string;

  @ApiProperty({
    example: '2019-07-09T00:00:00.000Z',
    type: String,
    format: 'date-time',
    description: 'Fecha y hora de la solicitud en formato ISO 8601',
  })
  @FlexibleDate()
  @IsDate()
  fechaSolicitud!: Date;

  @ApiProperty({ example: 46 })
  @IsInt()
  @Min(18)
  edadCliente!: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  numDependientes!: number;

  @ApiProperty({ example: 'TECNICO' })
  @IsString()
  @IsNotEmpty()
  nivelEducacion!: string;

  @ApiProperty({ example: 'PROPIA' })
  @IsString()
  @IsNotEmpty()
  tipoVivienda!: string;

  @ApiProperty({ example: 'NA' })
  @IsString()
  @IsNotEmpty()
  profesion!: string;

  @ApiProperty({ example: 'PRODUCCION' })
  @IsString()
  @IsNotEmpty()
  sector!: string;

  @ApiProperty({ example: 'URBANO' })
  @IsString()
  @IsNotEmpty()
  areaCliente!: string;

  @ApiProperty({ example: 'ALIMENTOS' })
  @IsString()
  @IsNotEmpty()
  rubro!: string;

  @ApiProperty({ example: 'AGRICULTURA Y GANADERIA' })
  @IsString()
  @IsNotEmpty()
  grupoCaedecActividad!: string;

  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty()
  codGrupoCaedecAct!: string;

  @ApiProperty({ example: 'CULTIVO DE FLORES Y PLANTAS ORNAMENTALES' })
  @IsString()
  @IsNotEmpty()
  caedecActividad!: string;

  @ApiProperty({ example: '01126' })
  @IsString()
  @IsNotEmpty()
  numCaedecActividad!: string;
}