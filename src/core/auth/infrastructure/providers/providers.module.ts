import { Module } from '@nestjs/common';
import { JwtProvider } from './jwt.provider';

@Module({
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class ProvidersModule {}
