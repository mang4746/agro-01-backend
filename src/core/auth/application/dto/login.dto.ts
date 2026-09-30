import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';  
  
export class LoginDto {  
  @IsNotEmpty()  
  @IsString()  
  @ApiProperty({
    description: 'El nombre de usuario del usuario',
    example: 'miguel.soto'
  })
  username: string;  
  
  @IsNotEmpty()  
  @IsString()  
  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'Ahsdjgh-8246*'
  })
  password: string;  
}  
