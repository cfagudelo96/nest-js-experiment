import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user.entity';
import { CreateUserDto } from '../models/create-user.dto';
import { CredentialsDto } from '@nest-experiment/auth/models/credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findByCredentials(credentials: CredentialsDto): Promise<User> {
    const user = await this.userRepository.findOne({
      email: credentials.email
    });
    if (!!user && (await user.isSamePassword(credentials.password))) {
      return user;
    }
    return null;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = User.fromCreateDto(createUserDto);
    return await this.userRepository.save(user);
  }
}
