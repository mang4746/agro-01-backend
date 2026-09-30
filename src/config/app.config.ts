import { registerAs } from '@nestjs/config';

const parseList = (value: string | undefined, fallback: string[]): string[] | '*' => {
  if (!value || value.trim() === '*') {
    return value?.trim() === '*' ? '*' : fallback;
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBoolean = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
};

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME || 'App',
  description: process.env.APP_DESCRIPTION || 'Description',
  version: process.env.APP_VERSION || '1.0.0',
  port: parseInt(process.env.APP_PORT || '3000', 10),
  prefix: process.env.APP_PREFIX || 'api',
  env: process.env.APP_ENV || 'development',
  isDevelopment: process.env.APP_ENV === 'development',
  isProduction: process.env.APP_ENV === 'production',
  prediction: {
    url: process.env.PREDICTION_API_URL || 'http://localhost:3002/api/v1/prediction/predict',
    apiKey: process.env.PREDICTION_API_KEY || '',
    timeoutMs: parseInt(process.env.PREDICTION_API_TIMEOUT_MS || '10000', 10),
  },
  cors: {
    origins: parseList(process.env.CORS_ORIGINS, ['http://localhost:8081']),
    methods: parseList(process.env.CORS_METHODS, [
      'GET',
      'POST',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ]),
    headers: parseList(process.env.CORS_HEADERS, ['Content-Type', 'Accept']),
    credentials: parseBoolean(process.env.CORS_ALLOW_CREDENTIALS),
  },
}));

export type AppConfig = ReturnType<typeof appConfig>;