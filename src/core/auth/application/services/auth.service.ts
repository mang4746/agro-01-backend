import { BadRequestException, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { LoginDto, RegisterDto, RefreshTokenDto } from '../dto';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';
import { AUTH_REPOSITORY_TOKENS } from '../../domain/repository-tokens';
import { BaseService } from '@/common/base';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    @Inject(AUTH_REPOSITORY_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    super();
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await this.passwordService.compare(loginDto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username, email: user.email, roles: user.roles };

    return {
      accessToken: this.tokenService.signAccessToken(payload),
      refreshToken: this.tokenService.signRefreshToken(payload),
      user: { ...user, passwordHash: undefined },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingByUsername = await this.userRepository.findByUsername(registerDto.username);
    if (existingByUsername) {
      throw new BadRequestException('Username is already taken');
    }

    const existingByEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingByEmail) {
      throw new BadRequestException('Email is already registered');
    }

    const passwordHash = await this.passwordService.hash(registerDto.password);
    const newUser = await this.userRepository.create({
      username: registerDto.username,
      email: registerDto.email,
      passwordHash,
      status: 'ACTIVO',
      roles: ['user'],
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
    } as any);

    const payload: JwtPayload = { sub: newUser.id, username: newUser.username, email: newUser.email, roles: newUser.roles };

    return {
      accessToken: this.tokenService.signAccessToken(payload),
      refreshToken: this.tokenService.signRefreshToken(payload),
      user: { ...newUser, passwordHash: undefined },
    };
  }

  async refreshToken(data: RefreshTokenDto) {
    const payload = this.tokenService.verifyRefreshToken(data.refreshToken);
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newPayload: JwtPayload = { sub: user.id, username: user.username, email: user.email, roles: user.roles };

    return {
      accessToken: this.tokenService.signAccessToken(newPayload),
      refreshToken: this.tokenService.signRefreshToken(newPayload),
    };
  }
}
