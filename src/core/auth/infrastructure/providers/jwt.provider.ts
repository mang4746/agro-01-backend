import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const JwtProvider: Provider = {
  provide: 'JWT_PROVIDER_OPTIONS',
  useFactory: (configService: ConfigService) => ({
    accessTokenSecret: configService.get('JWT_ACCESS_SECRET', 'temporary_access_secret'),
    refreshTokenSecret: configService.get('JWT_REFRESH_SECRET', 'temporary_refresh_secret'),
    accessTokenExpiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN', '15m'),
    refreshTokenExpiresIn: configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN', '7d'),
  }),
  inject: [ConfigService],
};
