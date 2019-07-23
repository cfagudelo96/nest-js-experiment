import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserRolesModule } from './user-roles/user-roles.module';

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
    ConfigModule,
    UserRolesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
