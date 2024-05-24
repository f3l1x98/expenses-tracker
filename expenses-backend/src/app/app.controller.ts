import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, JwtResponse } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Request } from 'express';
import { IUser } from './users/entities/user';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './users/dto/login-user.dto';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @ApiBody({ type: LoginUserDto, description: 'Login information' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request): Promise<JwtResponse | undefined> {
    return this.authService.generateJwt(req.user as IUser);
  }
}
