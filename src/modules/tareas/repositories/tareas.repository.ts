import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { CreateTareaDto, UpdateTareaDto } from '../dtos';
import { Tarea } from '../entities';

@Injectable()
export class TareasRepository {
  private readonly order: FindOptionsOrder<Tarea> = {
    fechaCreacion: 'DESC',
    id: 'DESC',
  };

  constructor(
    @InjectRepository(Tarea)
    private readonly repository: Repository<Tarea>,
  ) {}

  create(data: CreateTareaDto): Promise<Tarea> {
    const tarea = this.repository.create(data);
    return this.repository.save(tarea);
  }

  findAll(skip: number, take: number): Promise<[Tarea[], number]> {
    return this.repository.findAndCount({
      skip,
      take,
      order: this.order,
    });
  }

  findById(id: number): Promise<Tarea | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateTareaDto): Promise<Tarea | null> {
    await this.repository.update(id, {
      ...data,
      fechaActualizacion: new Date(),
    });

    return this.findById(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}