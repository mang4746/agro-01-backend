import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistroAgro01Dto } from '../dtos';

interface PredictionResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  errors: unknown;
}

export interface PredictionData {
  riesgo_categoria: string;
  probabilidades: Record<string, number>;
  explicacion_modelo: Record<string, unknown>;
  analisis_agente: string;
  modelo_version: string;
}

type PredictionPayload = Record<string, string | number | null>;

@Injectable()
export class PredictionService {
  private readonly predictionUrl: string;
  private readonly predictionApiKey: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.predictionUrl = this.configService.get<string>(
      'app.prediction.url',
      'http://localhost:3002/api/v1/prediction/predict',
    );
    this.predictionApiKey = this.configService.get<string>('app.prediction.apiKey', '');
    this.timeoutMs = this.configService.get<number>('app.prediction.timeoutMs', 10000);
  }

  async predict(data: RegistroAgro01Dto): Promise<PredictionData> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(this.predictionUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.predictionApiKey,
        },
        body: JSON.stringify(this.toPredictionPayload(data)),
        signal: controller.signal,
      });

      const result = (await response.json()) as PredictionResponse<PredictionData>;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || `Prediction API respondió con HTTP ${response.status}`);
      }

      return result.data;
    } catch (error) {
      const message = error instanceof Error && error.name === 'AbortError'
        ? 'El servicio de predicción agotó el tiempo de espera'
        : 'No fue posible obtener la predicción del servicio externo';
      throw new BadGatewayException(message);
    } finally {
      clearTimeout(timeout);
    }
  }

  private toPredictionPayload(data: RegistroAgro01Dto): PredictionPayload {
    return {
      ACTIVIDAD: data.actividad,
      AREA_CLIENTE: data.areaCliente,
      CAEDEC_ACTIVIDAD: data.caedecActividad,
      COD_GRUPO_CAEDEC_ACT: data.codGrupoCaedecAct,
      COD_TIPO_GARANTIA: data.codTipoGarantia,
      DEPTO_CLIENTE: data.deptoCliente,
      EDAD_CLIENTE: data.edadCliente,
      ESTADO_CIVIL: data.estadoCivil,
      EXPERIENCIA_ACTIVIDAD: data.experienciaActividad,
      LOCALIDAD_CLIENTE: data.localidadCliente,
      MTO_OTORGADO: data.mtoOtorgado,
      MTO_PATRIMONIO: data.mtoPatrimonio,
      MTO_PATRIMONIO_TOTAL: data.mtoPatrimonioTotal,
      MTO_SOLICITADO_KI: data.mtoSolicitadoKi,
      MTO_SOLICITADO_KO: data.mtoSolicitadoKo,
      MUNICIPIO_CLIENTE: data.municipioCliente,
      NIVEL_EDUCACION: data.nivelEducacion,
      NUM_DEPENDIENTES: data.numDependientes,
      PLAZO: data.plazo,
      PROFESION: data.profesion,
      RUBRO: data.rubro,
      SECTOR: data.sector,
      TIPO_VIVIENDA: data.tipoVivienda,
    };
  }
}