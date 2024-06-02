/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/entities/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    name: string,
    password: string,
  ): Promise<IUser | undefined> {
    const user = await this.usersService.findOne(name);
    const isValid = await this.usersService.validate(name, password);

    if (user && isValid) {
      return { id: user.id, username: user.username, settings: user.settings };
    }

    return undefined;
  }

  async generateJwt(user: IUser, expiresIn?: number | string): Promise<string> {
    const payload = { username: user.username, sub: user.id };

    if (expiresIn !== undefined) {
      return Promise.resolve(this.jwtService.sign(payload, { expiresIn }));
    }

    return Promise.resolve(this.jwtService.sign(payload));
  }
}
