import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiResponseFactory } from '@common/responses'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from '@common/constants'
import { HealthService } from '../services'
import { BaseController } from '@/common/base'

@ApiTags('Health')
@Controller('health')
export class HealthController extends BaseController {

  constructor(
    private readonly healthService: HealthService,
  ) {
    super();
  }

  @Get()
  @ApiOperation({
    summary: 'Verifica el estado del backend',
    description: 'Endpoint para validar que la API está activa y funcionando correctamente',
  })
  async check() {
    const resp = await this.healthService.getHealth()
    return ApiResponseFactory.success({
      data: resp,
      message: Messages.HEALTH_OK,
    });
  }

}
