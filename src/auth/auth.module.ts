import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nest-experiment/config/config.module';
import { ConfigService } from '@nest-experiment/config/services/config.service';

import { UsersModule } from '@nest-experiment/users/users.module';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

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
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
