import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma-user.repository';
import { AUTH_REPOSITORY_TOKENS } from '../../domain/repository-tokens';

/**
 * Módulo de Infraestructura - Repositorios
 * 
 * Centraliza la configuración de inyección de dependencias para todos los repositorios
 * Facilita:
 * - Agregar nuevos repositorios sin tocar el módulo principal
 * - Mockear repositorios en tests
 * - Cambiar implementaciones en un solo lugar
 */
@Module({
  providers: [
    {
      provide: AUTH_REPOSITORY_TOKENS.USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    // Aquí irían futuros repositorios:
    // {
    //   provide: AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY,
    //   useClass: PrismaSessionRepository,
    // },
  ],
  exports: [
    AUTH_REPOSITORY_TOKENS.USER_REPOSITORY,
    // AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY,
  ],
})
export class RepositoryModule {}
