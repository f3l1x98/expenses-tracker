/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAlreadyExistsError } from './exceptions/user-already-exists-error';
import { UserNotFoundException } from './exceptions/user-not-found';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user === null) {
      throw new UserNotFoundException(id);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const user = new UserEntity();
    user.username = createUserDto.username;
    user.settings = createUserDto.settings;
    user.password = hash;
    user.salt = salt;

    let userEntity: UserEntity | null = null;
    try {
      userEntity = await this.usersRepository.save(user);
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes('unique constraint')
      ) {
        throw new UserAlreadyExistsError(
          `User ${createUserDto.username} already exists`,
        );
      }
      throw e;
    }

    return userEntity;
  }

  async updateSettings(
    userId: string,
    userSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (user === null) {
      throw new UserNotFoundException(userId);
    }

    if (userSettingsDto.currency !== undefined) {
      user.settings.currency = userSettingsDto.currency;
    }

    return this.usersRepository.save(user);
  }

  async validate(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      select: ['password'],
    });

    if (!user) {
      return false;
    }

    return await bcrypt.compare(password, user.password as string);
  }
}
