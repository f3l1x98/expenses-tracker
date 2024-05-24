/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsError } from '../exceptions/user-already-exists-error';
import { IUser } from './entities/user';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const user = await this.usersService.create(
        createUserDto.username,
        createUserDto.password,
      );
      return { id: user.id, username: user.username };
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }
}
