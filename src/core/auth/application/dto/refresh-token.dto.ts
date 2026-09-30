import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El token de actualización del usuario',
    example: 'eyJhbGci****adQssw5c'
  })
  refreshToken: string;
}
