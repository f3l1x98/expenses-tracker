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
import { UserAlreadyExistsError } from './exceptions/user-already-exists-error';
import { IUser } from './entities/user';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description: 'User information',
  })
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
