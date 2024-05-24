import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProfile } from './users.profile';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [AutomapperModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersProfile],
  exports: [UsersService],
})
export class UsersModule {}
