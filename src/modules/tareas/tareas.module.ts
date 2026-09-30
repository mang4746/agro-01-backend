import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasController } from './controllers';
import { Tarea } from './entities';
import { TareasRepository } from './repositories';
import { TareasService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  controllers: [TareasController],
  providers: [TareasRepository, TareasService],
})
export class TareasModule {}