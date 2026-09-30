import { Module } from '@nestjs/common';
import { Agro01Controller } from './controllers';
import { Agro01Repository } from './repositories';
import { Agro01Service, PredictionService } from './services';

@Module({
  controllers: [Agro01Controller],
  providers: [Agro01Repository, Agro01Service, PredictionService],
})
export class Agro01Module {}