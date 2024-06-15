import { ExecutionContext, ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AuthModule } from '../../src/app/auth/auth.module';
import { ConfigServiceMock } from './config.mock';
import { JwtAuthGuard } from '../../src/app/auth/jwt-auth.guard';
import { IUser } from 'expenses-shared';

export function createTestingModuleWithDefaultMocks(
  metadata: ModuleMetadata,
  appConfig?: Record<string, unknown>,
  authedUser?: IUser,
): TestingModuleBuilder {
  return Test.createTestingModule({
    ...metadata,
    imports: [
      ...(metadata.imports ?? []),
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
    ],
    providers: [...(metadata.providers ?? [])],
  })
    .overrideProvider(ConfigService)
    .useValue(new ConfigServiceMock(appConfig))

    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = authedUser;
        return true;
      },
    });
}
