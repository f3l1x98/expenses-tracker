/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  NotFoundException,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsError } from './exceptions/user-already-exists-error';
import { IUser } from './entities/user';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserSettingsDto } from './dto/user-settings.dto';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { Request } from 'express';
import { UserNotFoundException } from './exceptions/user-not-found';

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
      return { id: user.id, username: user.username, settings: user.settings };
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }

  @ApiOperation({ summary: 'Updates a users settings' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({
    type: UserSettingsDto,
    required: true,
    description: 'User settings',
  })
  @Put('settings')
  async updateSettings(
    @Req() req: Request,
    @Body() userSettingsDto: UpdateUserSettingsDto,
  ): Promise<IUser> {
    try {
      const user = await this.usersService.updateSettings(
        (req.user as IUser).id,
        userSettingsDto,
      );
      return { id: user.id, username: user.username, settings: user.settings };
    } catch (e) {
      if (e instanceof UserNotFoundException) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }
}
