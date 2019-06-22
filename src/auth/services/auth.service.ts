import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@nest-experiment/users/services/users.service';
import { User } from '@nest-experiment/users/models/user.entity';

import { JwtPayload } from '../models/jwt-payload.interface';
import { CredentialsDto } from '../models/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(credentials: CredentialsDto): Promise<string> {
    const user = await this.usersService.findByCredentials(credentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    const userJwtPayload: JwtPayload = { email: user.email };
    return this.jwtService.sign(userJwtPayload);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.usersService.findByEmail(payload.email);
  }
}
