import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@modules/health/health.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiResponseInterceptor, LoggingInterceptor } from './common/interceptors';
import { appConfig } from './config';
import { AppInitializerService } from './core/app-initializer.service';
import { ClsRtracerMiddleware } from './common/middlewares';
import { LoggerModule } from './core/logger';
import { DatabaseModule } from './core/database/database.module';
import { TareasModule } from './modules/tareas/tareas.module';
import { Agro01Module } from './modules/agro-01/agro-01.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    LoggerModule,
    DatabaseModule,
    HealthModule,
    TareasModule,
    Agro01Module,
  ],
  providers: [
    AppInitializerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
  ],
  exports: [AppInitializerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsRtracerMiddleware).forRoutes('*path');
  }
}