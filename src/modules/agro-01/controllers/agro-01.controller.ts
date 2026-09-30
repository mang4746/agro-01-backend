import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseFactory } from '@/common/responses';
import { Messages } from '@/common/constants';
import { PreregistroAgro01Dto, RegistroAgro01Dto } from '../dtos';
import { Agro01Service } from '../services';

@ApiTags('Agro 01')
@Controller('agro-01')
export class Agro01Controller {
  constructor(private readonly agro01Service: Agro01Service) {}

  @Post('preregistro')
  @ApiOperation({ summary: 'Simular el preregistro de una solicitud Agro 01' })
  async preregistro(@Body() data: PreregistroAgro01Dto) {
    return ApiResponseFactory.success({
      data: await this.agro01Service.preregistrar(data),
      message: Messages.SUCCESS_CREATE,
    });
  }

  @Post('registro')
  @ApiOperation({ summary: 'Simular el registro de una solicitud Agro 01' })
  async registro(@Body() data: RegistroAgro01Dto) {
    return ApiResponseFactory.success({
      data: await this.agro01Service.registrar(data),
      message: Messages.SUCCESS_CREATE,
    });
  }
}