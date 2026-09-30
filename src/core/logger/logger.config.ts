import pino from 'pino';

/**
 * Configuración de Pino
 * - Soporta redaction de datos sensibles
 * - Pino Pretty en desarrollo
 * - Transporte eficiente en producción
 */
export const createPinoLogger = (logLevel: string = 'info') => {
  const isDevelopment = process.env.APP_ENV === 'development';

  const pinoConfig: pino.LoggerOptions = {
    level: logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,

    /**
     * Redactar datos sensibles
     */
    redact: {
      paths: [
        'password',
        'token',
        'authorization',
        'authToken',
        'refreshToken',
        'accessToken',
        'apiKey',
        'secret',
        'creditCard',
        'ssn',
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers.authorization',
      ],
      censor: '[REDACTED]',
    },

    /**
     * Formato personalizado sin sobrecarga
     */
    formatters: {
      /**
       * Personalizar binding
       */
      bindings: (bindings) => {
        return {
          pid: bindings.pid,
          hostname: bindings.hostname,
        };
      },

      /**
       * Personalizar level - Retornar levelLabel
       */
      level: (label) => {
        return { levelLabel: label }; // ← CAMBIO: "level" → "levelLabel"
      },
    },

    /**
     * Mixin: agrega datos automáticamente a cada log
     */
    mixin: () => {
      return {};
    },
  };

  /**
   * Transporte en desarrollo (pretty-print)
   * En producción, usa transport nativo sin procesamiento extra
   */
  if (isDevelopment) {
    return pino(
      pinoConfig,
      pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: false,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          messageFormat: '{levelLabel} - {msg}', // ← Ahora coincide
        },
      }),
    );
  }

  /**
   * Producción: salida estándar sin pretty-print
   */
  return pino(pinoConfig);
};

/**
 * Singleton del logger
 */
export let pinoInstance: pino.Logger;

export const initializePinoLogger = (logLevel: string): pino.Logger => {
  pinoInstance = createPinoLogger(logLevel);
  return pinoInstance;
};

export const getPinoLogger = (): pino.Logger => {
  if (!pinoInstance) {
    pinoInstance = createPinoLogger();
  }
  return pinoInstance;
};