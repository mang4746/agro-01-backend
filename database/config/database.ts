import type { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

type EnvConfig = {
  DB_CONNECT_STRING?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_SERVICE_NAME?: string;
  DB_DATABASE?: string;
  ORACLE_SCHEMA?: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};

const getEnv = (configService: ConfigService): EnvConfig => {
  const env = {
    DB_CONNECT_STRING: configService.get<string>('DB_CONNECT_STRING'),
    DB_HOST: configService.get<string>('DB_HOST'),
    DB_PORT: configService.get<string>('DB_PORT'),
    DB_SERVICE_NAME: configService.get<string>('DB_SERVICE_NAME'),
    DB_DATABASE: configService.get<string>('DB_DATABASE'),
    ORACLE_SCHEMA: configService.get<string>('ORACLE_SCHEMA'),
    DB_USERNAME: configService.get<string>('DB_USERNAME'),
    DB_PASSWORD: configService.get<string>('DB_PASSWORD'),
  };

  if (!env.DB_USERNAME) throw new Error('DB_USERNAME Faltante');
  if (!env.DB_PASSWORD) throw new Error('DB_PASSWORD Faltante');

  const connectString = env.DB_CONNECT_STRING ||
    (env.DB_HOST && env.DB_PORT && (env.DB_SERVICE_NAME || env.DB_DATABASE)
      ? `${env.DB_HOST}:${env.DB_PORT}/${env.DB_SERVICE_NAME || env.DB_DATABASE}`
      : undefined);

  if (!connectString) {
    throw new Error(
      'Configuracion Oracle incompleta: defina DB_CONNECT_STRING o DB_HOST, DB_PORT y DB_SERVICE_NAME',
    );
  }

  return { ...env, DB_CONNECT_STRING: connectString } as EnvConfig;
};

export const getOracleDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  const env = getEnv(configService);

  return {
    type: 'oracle',
    connectString: env.DB_CONNECT_STRING,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    schema: env.ORACLE_SCHEMA,
    entities: [],
    migrations: [],
    synchronize: false,
    migrationsRun: false,
    logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
  };
};