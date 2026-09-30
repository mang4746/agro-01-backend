import { Inject } from "@nestjs/common";
import { LoggerService } from "@/core/logger";

/**
 * BaseService - NO es inyectable, solo clase base
 * Los servicios heredados serán inyectables
 */
export class BaseService {
  
  @Inject(LoggerService)
  protected readonly logger: LoggerService;

  /**
   * Métodos de utilidad
   */
  protected logInfo(message: string, metadata?: any): void {
    this.logger.info(message, metadata);
  }

  protected logError(message: string, error?: any, metadata?: any): void {
    this.logger.error(message, error, metadata);
  }

  protected logWarn(message: string, metadata?: any): void {
    this.logger.warn(message, metadata);
  }

  protected logDebug(message: string, metadata?: any): void {
    this.logger.debug(message, metadata);
  }
}