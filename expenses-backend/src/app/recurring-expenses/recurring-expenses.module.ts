import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringExpenseEntity } from './entities/recurring-expense.entity';
import { RecurringExpensesController } from './recurring-expenses.controller';
import { RecurringExpensesService } from './recurring-expenses.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ExpensesModule } from '../expenses/expenses.module';
import { RecurringExpensesProfile } from './recurring-expenses.profile';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    AutomapperModule,
    ExpensesModule,
    TypeOrmModule.forFeature([RecurringExpenseEntity]),
  ],
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService, RecurringExpensesProfile],
})
export class RecurringExpensesModule {}
