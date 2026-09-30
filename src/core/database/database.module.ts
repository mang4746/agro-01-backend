import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOracleDataSourceOptions } from '../../../database/config/database';
import { Tarea } from '../../modules/tareas/entities/tarea.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          ...getOracleDataSourceOptions(configService),
          entities: [Tarea],
        }),
    }),
  ],
})
export class DatabaseModule {}