import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ExpensesProfile } from './expenses.profile';
import { UsersModule } from '../users/users.module';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    AutomapperModule,
    UsersModule,
    TypeOrmModule.forFeature([ExpenseEntity]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpensesProfile],
})
export class ExpensesModule {}
