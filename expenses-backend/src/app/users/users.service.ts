/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAlreadyExistsError } from './exceptions/user-already-exists-error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async create(username: string, password: string): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new UserEntity();
    user.username = username;
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
        throw new UserAlreadyExistsError(`User ${username} already exists`);
      }
      throw e;
    }

    return userEntity;
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
