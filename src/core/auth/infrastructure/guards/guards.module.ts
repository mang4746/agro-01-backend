import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [JwtAuthGuard, LocalAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, LocalAuthGuard, RolesGuard],
})
export class GuardsModule {}
