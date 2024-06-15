import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
