import {
  Controller,
  Body,
  Post,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '@nest-experiment/auth/roles.decorator';
import { RolesGuard } from '@nest-experiment/auth/roles.guard';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.save(createUserDto);
  }
}
