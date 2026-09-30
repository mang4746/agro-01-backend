import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El nombre de usuario del usuario',
    example: 'miguel.soto'
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'miguel.soto@example.com'
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'Ahsdjgh-8246*'
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Miguel'
  })
  firstName?: string;

  @IsString()
  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Soto'
  })
  lastName?: string;
}
