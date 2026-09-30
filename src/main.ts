import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppInitializerService } from './core/app-initializer.service';
import { LoggerService } from './core/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Buffear logs hasta que logger esté listo
  });

  const configService = app.get(ConfigService);
  const appInitializer = app.get(AppInitializerService);
  const logger = app.get(LoggerService);

  // Usar LoggerService en NestJS
  app.useLogger(logger);

  const cors = configService.get<{
    origins: string[] | '*';
    methods: string[] | '*';
    headers: string[] | '*';
    credentials: boolean;
  }>('app.cors');

  if (!cors) {
    throw new Error('La configuración CORS no está disponible');
  }

  if (cors.credentials && cors.origins === '*') {
    throw new Error('CORS_ALLOW_CREDENTIALS=true requiere orígenes explícitos');
  }

  app.enableCors({
    origin: cors.origins,
    methods: cors.methods,
    allowedHeaders: cors.headers,
    credentials: cors.credentials,
  });

  // Inicializar configuración
  await appInitializer.initialize(app);

  // Puerto
  const port = configService.get<number>('app.port', 3000);
  const prefix = configService.get<string>('app.prefix');

  await app.listen(port, '0.0.0.0');

  logger.info(`Application started successfully`, {
    port,
    prefix,
    environment: configService.get<string>('app.env'),
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});