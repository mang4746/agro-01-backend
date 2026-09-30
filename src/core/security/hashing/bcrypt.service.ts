import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Servicio genérico de hashing con bcrypt
 * Puede usarse en cualquier contexto donde se necesite hashing seguro
 * (contraseñas, tokens, datos sensibles, etc.)
 */
@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Genera un hash seguro para un valor
   * @param value Valor a hashear
   * @returns Promise con hash bcrypt
   * @example
   * const hashedPassword = await bcryptService.hash('myPassword123');
   * const hashedEmail = await bcryptService.hash('user@example.com');
   */
  async hash(value: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 12);
    return bcrypt.hash(value, saltRounds);
  }

  /**
   * Compara un valor en texto plano con un hash existente
   * @param plain Valor en texto plano
   * @param hash Hash almacenado
   * @returns Promise booleano (true si coinciden)
   * @example
   * const isValid = await bcryptService.compare('myPassword123', hashedPassword);
   * if (isValid) { console.log('Contraseña correcta'); }
   */
  async compare(plain: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plain, hash);
  }
}
