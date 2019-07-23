import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '@nest-experiment/users/users.service';

import { UserRole } from './user-role.entity';
import { RoleEnum } from './roles.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly usersService: UsersService
  ) {}

  async findByUserId(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({ user: { id: userId } });
  }

  async save(role: RoleEnum, userId: number): Promise<UserRole> {
    const userRole = new UserRole();
    userRole.role = role;
    const user = await this.usersService.findById(userId);
    userRole.user = user;
    return this.userRoleRepository.save(userRole);
  }
}
