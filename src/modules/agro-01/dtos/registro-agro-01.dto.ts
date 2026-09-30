import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Agro01BaseDto } from './agro-01-base.dto';

export class RegistroAgro01Dto extends Agro01BaseDto {
  @ApiPropertyOptional({ example: 57300, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mtoSolicitadoKi!: number | null;

  @ApiPropertyOptional({ example: 25200, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mtoSolicitadoKo!: number | null;

  @ApiPropertyOptional({ example: 38956.68, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gastosOperativos!: number | null;

  @ApiPropertyOptional({ example: 15240, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gastosFamiliares!: number | null;

  @ApiPropertyOptional({ example: 102319.2, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mtoPatrimonio!: number | null;

  @ApiPropertyOptional({ example: 77240, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mtoPatrimonioUfamiliar!: number | null;

  @ApiPropertyOptional({ example: 179559.2, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mtoPatrimonioTotal!: number | null;

  @ApiPropertyOptional({ example: 61471, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCostos!: number | null;

  @ApiPropertyOptional({ example: 138610, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalVentas!: number | null;

  @ApiProperty({ example: 70000 })
  @IsNumber()
  @Min(0)
  mtoOtorgado!: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(1)
  plazo!: number;

  @ApiPropertyOptional({ example: 'IPN', nullable: true })
  @IsString()
  @IsOptional()
  codTipoGarantia!: string | null;
}