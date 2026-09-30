import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../../security/hashing/bcrypt.service';

@Injectable()
export class PasswordService {
  constructor(private readonly bcryptService: BcryptService) {}

  /**
   * Hash una contraseña usando bcrypt
   * @param password Contraseña en texto plano
   * @returns Promise con hash generado
   */
  async hash(password: string): Promise<string> {
    return this.bcryptService.hash(password);
  }

  /**
   * Comparar contraseña en texto plano con hash
   * @param raw Contraseña en texto plano
   * @param hashed Hash almacenado
   * @returns Promise booleano indicando si coinciden
   */
  async compare(raw: string, hashed: string): Promise<boolean> {
    return this.bcryptService.compare(raw, hashed);
  }
}
