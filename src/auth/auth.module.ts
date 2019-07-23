import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nest-experiment/config/config.module';
import { ConfigService } from '@nest-experiment/config/config.service';

import { UsersModule } from '@nest-experiment/users/users.module';
import { UserRolesModule } from '@nest-experiment/user-roles/user-roles.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './roles.guard';
import { UserRolesService } from '@nest-experiment/user-roles/user-roles.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getSecretKey(),
          signOptions: {
            expiresIn: +configService.get('TOKEN_EXPIRATION')
          }
        };
      }
    }),
    ConfigModule,
    UsersModule,
    UserRolesModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [PassportModule, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
