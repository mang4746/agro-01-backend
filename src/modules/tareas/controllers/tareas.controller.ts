import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponseFactory } from '@/common/responses';
import { Messages } from '@/common/constants';
import { BaseController } from '@/common/base';
import { CreateTareaDto, UpdateTareaDto } from '../dtos';
import { TareasService } from '../services';

@ApiTags('Tareas')
@Controller('tareas')
export class TareasController extends BaseController {
  constructor(private readonly tareasService: TareasService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una tarea' })
  async create(@Body() data: CreateTareaDto) {
    const tarea = await this.tareasService.create(data);
    return ApiResponseFactory.success({
      data: tarea,
      message: Messages.SUCCESS_CREATE,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar tareas' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ) {
    const result = await this.tareasService.findAll(page, limit);
    return ApiResponseFactory.success({
      data: result.data,
      pagination: result.meta,
      message: Messages.SUCCESS_LIST,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea' })
  @ApiParam({ name: 'id', type: Number })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const tarea = await this.tareasService.findById(id);
    return ApiResponseFactory.success({
      data: tarea,
      message: Messages.SUCCESS_DEFAULT,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTareaDto,
  ) {
    const tarea = await this.tareasService.update(id, data);
    return ApiResponseFactory.success({
      data: tarea,
      message: Messages.SUCCESS_UPDATE,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tareasService.remove(id);
    return ApiResponseFactory.success({
      data: null,
      message: Messages.SUCCESS_DELETE,
    });
  }
}