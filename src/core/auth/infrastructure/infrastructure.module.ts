import { Module } from '@nestjs/common';
import { RepositoryModule } from './repositories/repository.module';
import { StrategiesModule } from './strategies/strategies.module';
import { GuardsModule } from './guards/guards.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [RepositoryModule, StrategiesModule, GuardsModule, ProvidersModule],
  exports: [RepositoryModule, StrategiesModule, GuardsModule, ProvidersModule],
})
export class InfrastructureModule {}
