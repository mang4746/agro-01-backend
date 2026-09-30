import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApiExceptionFilter } from '@common/filters';

@Injectable()
export class AppInitializerService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Configura el prefijo global
   */
  setupGlobalPrefix(app: INestApplication): void {
    const prefix = this.configService.get<string>('app.prefix', 'api');
    app.setGlobalPrefix(prefix);
  }

  /**
   * Configura pipes globales
   */
  setupGlobalPipes(app: INestApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  /**
   * Configura filtros globales
   */
  setupGlobalFilters(app: INestApplication): void {
    app.useGlobalFilters(new ApiExceptionFilter());
  }

  /**
   * Configura Swagger
   */
  setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle(this.configService.get<string>('app.name', 'App'))
      .setDescription(this.configService.get<string>('app.description', 'Description'))
      .setVersion(this.configService.get<string>('app.version', '1.0'))
      .addBearerAuth() // Agregar si tienes auth
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const prefix = this.configService.get<string>('app.prefix', 'api');
    SwaggerModule.setup(`${prefix}/docs`, app, document);
  }

  /**
   * Ejecuta toda la inicialización
   */
  async initialize(app: INestApplication): Promise<void> {
    this.setupGlobalPrefix(app);
    this.setupGlobalPipes(app);
    this.setupGlobalFilters(app);
    this.setupSwagger(app);
  }
}