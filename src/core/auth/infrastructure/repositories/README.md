# Auth Repositories

Módulo centralizado de configuración DI para repositorios de autenticación.

## Estructura

```
repositories/
├── index.ts                          # Exports del módulo
├── repository.module.ts              # Módulo que define todos los providers
├── prisma-user.repository.ts         # Implementación Prisma del usuario
├── in-memory-user.repository.ts      # Implementación en memoria (testing)
└── README.md                         # Este archivo
```

## Cómo agregar un nuevo repositorio

### 1. Crear la interfaz en `/domain/interfaces/`
```typescript
// src/core/auth/domain/interfaces/session-repository.interface.ts
export interface ISessionRepository {
  create(data: any): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  delete(id: string): Promise<void>;
}
```

### 2. Crear la implementación en `/infrastructure/repositories/`
```typescript
// prisma-session.repository.ts
import { Injectable } from '@nestjs/common';
import { ISessionRepository } from '../../domain/interfaces/session-repository.interface';

@Injectable()
export class PrismaSessionRepository implements ISessionRepository {
  // implementación...
}
```

### 3. Agregar el token en `/domain/repository-tokens.ts`
```typescript
export const AUTH_REPOSITORY_TOKENS = {
  USER_REPOSITORY: 'IUserRepository',
  SESSION_REPOSITORY: 'ISessionRepository',  // ← Agregar aquí
} as const;
```

### 4. Registrar el provider en `repository.module.ts`
```typescript
@Module({
  providers: [
    {
      provide: AUTH_REPOSITORY_TOKENS.USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY,  // ← Agregar aquí
      useClass: PrismaSessionRepository,
    },
  ],
  exports: [
    AUTH_REPOSITORY_TOKENS.USER_REPOSITORY,
    AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY,  // ← Agregar aquí
  ],
})
export class RepositoryModule {}
```

### 5. Usar en el servicio
```typescript
import { AUTH_REPOSITORY_TOKENS } from '../../domain/repository-tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}
}
```

## Testing

Para mockear repositorios en tests:

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let mockSessionRepository: MockSessionRepository;

  beforeEach(async () => {
    mockSessionRepository = { create: jest.fn(), ... };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AUTH_REPOSITORY_TOKENS.SESSION_REPOSITORY,
          useValue: mockSessionRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // Tests...
});
```

## Ventajas

- ✅ **Centralizadado**: Un solo lugar para agregar repos
- ✅ **Type-safe**: Tokens constantes evitan strings "mágicos"
- ✅ **Escalable**: Fácil de agregar nuevos repositorios
- ✅ **Testeable**: Fácil mockear repositorios
- ✅ **Mantenible**: Cambios de implementación en un lugar
