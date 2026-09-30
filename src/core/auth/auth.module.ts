import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthService, PasswordService, TokenService } from './application/services';
import { AuthController } from './presentation/controllers';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { BcryptService } from '../security/hashing/bcrypt.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    InfrastructureModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET', 'temporary_access_secret'),
        signOptions: { expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN', '15m') } as any,
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [
    BcryptService,
    AuthService,
    PasswordService,
    TokenService,
    LocalStrategy,
  ],
  exports: [AuthService, TokenService, BcryptService],
})
export class AuthModule {}
