import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@nest-experiment/users/users.module';

import { UserRole } from './user-role.entity';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule
  ],
  exports: [UserRolesService],
  providers: [UserRolesService],
  controllers: [UserRolesController]
})
export class UserRolesModule {}
