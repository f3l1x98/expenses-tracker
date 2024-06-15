import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiBody, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUserDto } from './users/dto/login-user.dto';
import { IUser } from 'expenses-shared';

interface LoginResponse {
  message: string;
  user: IUser;
  token: string;
}

@Controller({
  version: '1',
})
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @ApiBody({ type: LoginUserDto, description: 'Login information' })
  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse()
  @Post('auth/login')
  async login(@Req() req: Request): Promise<LoginResponse> {
    const jwt = await this.authService.generateJwt(req.user as IUser);
    return {
      message: 'Success',
      user: req.user as IUser,
      token: jwt,
    };
  }
}
