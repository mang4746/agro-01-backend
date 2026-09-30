import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../application/services';
import { LoginDto, RegisterDto, RefreshTokenDto } from '../../application/dto';
import { BaseController } from '@/common/base';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../infrastructure/guards/local-auth.guard';
import { Public } from '../../infrastructure/decorators';
import { ApiResponseFactory } from '@/common/responses';
import { Messages } from '@/common/constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {

  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Endpoint para autenticar a un usuario y obtener un token de acceso',
  })
  async login(@Body() loginDto: LoginDto) {
    const resp = await this.authService.login(loginDto);
    return ApiResponseFactory.success({
      data: resp,
      message: Messages.SUCCESS_DEFAULT,
    });
  }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Endpoint para registrar un nuevo usuario',
  })
  async register(@Body() registerDto: RegisterDto) {
    const resp = await this.authService.register(registerDto);
    return ApiResponseFactory.success({
      data: resp,
      message: Messages.SUCCESS_CREATE,
    });
  }

  @Public()
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Actualizar token',
    description: 'Endpoint para actualizar el token de acceso',
  })
  async refreshToken(@Body() refreshDto: RefreshTokenDto) {
    const resp = await this.authService.refreshToken(refreshDto);
    return ApiResponseFactory.success({
      data: resp,
      message: Messages.SUCCESS_UPDATE,
    });
  }
}
