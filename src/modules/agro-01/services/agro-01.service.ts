import { Injectable } from '@nestjs/common';
import { Agro01BaseDto, PreregistroAgro01Dto, RegistroAgro01Dto } from '../dtos';
import { Agro01Repository } from '../repositories';
import { PredictionService } from './prediction.service';

export interface EvaluacionRegistro {
  puedeContinuar: boolean;
  puntaje: number;
  puntajeMinimo: number;
  criteriosCumplidos: string[];
  motivo: string;
}

@Injectable()
export class Agro01Service {
  private readonly puntajeMinimo = 3;

  constructor(
    private readonly agro01Repository: Agro01Repository,
    private readonly predictionService: PredictionService,
  ) {}

  preregistrar(data: PreregistroAgro01Dto) {
    return {
      ...this.agro01Repository.simulatePreregistro(data),
      evaluacion: this.evaluarContinuidad(data),
    };
  }

  async registrar(data: RegistroAgro01Dto) {
    const prediccion = await this.predictionService.predict(data);

    return {
      ...this.agro01Repository.simulateRegistro(data),
      prediccion,
    };
  }

  private evaluarContinuidad(data: Agro01BaseDto): EvaluacionRegistro {
    const criteriosCumplidos: string[] = [];

    if (data.edadCliente >= 18 && data.edadCliente <= 65) {
      criteriosCumplidos.push('Rango de edad considerado financiable');
    }

    if (data.experienciaActividad >= 12) {
      criteriosCumplidos.push('Experiencia mínima de 12 meses');
    }

    if (data.actividad && data.caedecActividad && data.codGrupoCaedecAct) {
      criteriosCumplidos.push('Actividad económica correctamente identificada');
    }

    if (data.deptoCliente && data.municipioCliente && data.localidadCliente) {
      criteriosCumplidos.push('Ubicación del cliente informada');
    }

    if (data.nivelEducacion && data.tipoVivienda && data.sector) {
      criteriosCumplidos.push('Perfil socioeconómico informado');
    }

    const puedeContinuar = criteriosCumplidos.length >= this.puntajeMinimo;

    return {
      puedeContinuar,
      puntaje: criteriosCumplidos.length,
      puntajeMinimo: this.puntajeMinimo,
      criteriosCumplidos,
      motivo: puedeContinuar
        ? 'La solicitud cumple el puntaje mínimo de la política simulada.'
        : 'La solicitud no cumple el puntaje mínimo de la política simulada.',
    };
  }
}