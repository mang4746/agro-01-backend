import { Injectable } from '@nestjs/common';
import { PreregistroAgro01Dto, RegistroAgro01Dto } from '../dtos';

export interface Agro01Simulation<T> {
  persistido: false;
  tipoOperacion: 'PREREGISTRO' | 'REGISTRO';
  datos: T;
  procesadoEn: string;
}

@Injectable()
export class Agro01Repository {
  simulatePreregistro(data: PreregistroAgro01Dto): Agro01Simulation<PreregistroAgro01Dto> {
    return {
      persistido: false,
      tipoOperacion: 'PREREGISTRO',
      datos: data,
      procesadoEn: new Date().toISOString(),
    };
  }

  simulateRegistro(data: RegistroAgro01Dto): Agro01Simulation<RegistroAgro01Dto> {
    return {
      persistido: false,
      tipoOperacion: 'REGISTRO',
      datos: data,
      procesadoEn: new Date().toISOString(),
    };
  }
}