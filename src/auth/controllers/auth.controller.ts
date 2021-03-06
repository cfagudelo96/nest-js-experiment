import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../models/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() credentials: CredentialsDto): Promise<string> {
    return await this.authService.signIn(credentials);
  }
}
