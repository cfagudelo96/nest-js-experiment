import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRolesService } from './user-roles.service';
import { UserRole } from './user-role.entity';
import { RoleEnum } from './roles.entity';

@Controller('users/:userId/user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Param('userId') userId: number): Promise<UserRole[]> {
    return this.userRolesService.findByUserId(userId);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Param('userId') userId: number,
    @Body() createUserRoleDto: { role: RoleEnum }
  ) {
    return this.userRolesService.save(createUserRoleDto.role, userId);
  }
}
