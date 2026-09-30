import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@/common/base';
import { PaginationDto } from '@/common/dto';
import { CreateTareaDto, UpdateTareaDto } from '../dtos';
import { Tarea } from '../entities';
import { TareasRepository } from '../repositories';

@Injectable()
export class TareasService extends BaseService {
  constructor(private readonly tareasRepository: TareasRepository) {
    super();
  }

  create(data: CreateTareaDto): Promise<Tarea> {
    return this.tareasRepository.create(data);
  }

  async findAll(page: number, limit: number): Promise<{ data: Tarea[]; meta: PaginationDto }> {
    const [data, total] = await this.tareasRepository.findAll((page - 1) * limit, limit);
    const lastPage = Math.ceil(total / limit);
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = total === 0 ? 0 : from + data.length - 1;

    return {
      data,
      meta: {
        total,
        per_page: limit,
        current_page: page,
        last_page: lastPage,
        from,
        to,
      },
    };
  }

  async findById(id: number): Promise<Tarea> {
    const tarea = await this.tareasRepository.findById(id);
    if (!tarea) {
      throw new NotFoundException('La tarea no existe');
    }

    return tarea;
  }

  async update(id: number, data: UpdateTareaDto): Promise<Tarea> {
    await this.findById(id);
    const tarea = await this.tareasRepository.update(id, data);
    if (!tarea) {
      throw new NotFoundException('La tarea no existe');
    }

    return tarea;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.tareasRepository.remove(id);
  }
}