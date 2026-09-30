import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService extends BaseService {

  constructor() {
    super();
  }

  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      // uptime: process.uptime(), // tiempo en segundos que lleva corriendo el proceso
    }
  }

}