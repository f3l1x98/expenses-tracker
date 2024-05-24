import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '10h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
