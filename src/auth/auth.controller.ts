import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() credentials: CredentialsDto): Promise<string> {
    return this.authService.signIn(credentials);
  }
}
