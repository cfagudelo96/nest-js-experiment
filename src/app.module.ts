import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/services/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.getDatabaseConfiguration(),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
