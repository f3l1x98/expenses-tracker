import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, JwtResponse } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Request } from 'express';
import { IUser } from './users/entities/user';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request): Promise<JwtResponse | undefined> {
    return this.authService.generateJwt(req.user as IUser);
  }
}
